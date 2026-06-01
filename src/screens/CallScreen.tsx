// CallScreen.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  RTCView,
  mediaDevices,
  RTCPeerConnection,
  RTCSessionDescription
} from "react-native-webrtc";
import database from "@react-native-firebase/database";

const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

export default function CallScreen({ route, navigation }) {
//   const { appointmentId, userRole } = route.params; // passed from AppointmentList
    const appointmentId = "appt1";   // must exist in Firebase /appointments
  const userRole = "doctor";       // or "patient"
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const pc = useRef(new RTCPeerConnection(servers));

  useEffect(() => {
    // 🔹 Get camera + mic
    mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setLocalStream(stream);
      stream.getTracks().forEach(track => pc.current.addTrack(track, stream));
    });

    // 🔹 Remote stream
    pc.current.ontrack = event => {
      setRemoteStream(event.streams[0]);
    };

    // 🔹 ICE candidates → push to Firebase
    pc.current.onicecandidate = event => {
      if (event.candidate) {
        database()
          .ref(`/appointments/${appointmentId}/room/candidates`)
          .push(event.candidate.toJSON());
      }
    };

    // 🔹 Listen for ICE candidates
    database()
      .ref(`/appointments/${appointmentId}/room/candidates`)
      .on("child_added", async snapshot => {
        const candidate = snapshot.val();
        if (candidate) await pc.current.addIceCandidate(candidate);
      });

    // 🔹 Listen for Answer (for Doctor only)
    if (userRole === "doctor") {
      database()
        .ref(`/appointments/${appointmentId}/room/answer`)
        .on("value", async snapshot => {
          const answer = snapshot.val();
          if (answer && !pc.current.currentRemoteDescription) {
            await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
          }
        });
    }

    return () => endCall(); // cleanup when leaving
  }, []);

  // Doctor starts call
  const startCall = async () => {
    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    await database().ref(`/appointments/${appointmentId}/room`).update({ offer });
  };

  // Patient joins call
  const joinCall = async () => {
    const callData = (
      await database().ref(`/appointments/${appointmentId}/room`).once("value")
    ).val();

    if (callData?.offer) {
      await pc.current.setRemoteDescription(
        new RTCSessionDescription(callData.offer)
      );
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);
      await database()
        .ref(`/appointments/${appointmentId}/room`)
        .update({ answer });
    }
  };

  // End call (stop streams + clear room in Firebase)
  const endCall = async () => {
    localStream?.getTracks().forEach(track => track.stop());
    remoteStream?.getTracks().forEach(track => track.stop());

    pc.current.close();

    // Clear room for fresh start next time
    await database().ref(`/appointments/${appointmentId}/room`).remove();

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Remote Video */}
      {remoteStream && (
        <RTCView
          streamURL={remoteStream.toURL()}
          style={{ flex: 1 }}
          objectFit="cover"
        />
      )}

      {/* Local Preview */}
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={{
            width: 120,
            height: 160,
            position: "absolute",
            top: 20,
            right: 20,
            borderRadius: 10
          }}
          objectFit="cover"
        />
      )}

      {/* Controls */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 20,
          position: "absolute",
          bottom: 20,
          width: "100%"
        }}
      >
        {userRole === "doctor" && (
          <TouchableOpacity
            onPress={startCall}
            style={{ backgroundColor: "green", padding: 15, borderRadius: 50 }}
          >
            <Text style={{ color: "#fff" }}>Start Call</Text>
          </TouchableOpacity>
        )}

        {userRole === "patient" && (
          <TouchableOpacity
            onPress={joinCall}
            style={{ backgroundColor: "blue", padding: 15, borderRadius: 50 }}
          >
            <Text style={{ color: "#fff" }}>Join Call</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={endCall}
          style={{ backgroundColor: "red", padding: 15, borderRadius: 50 }}
        >
          <Text style={{ color: "#fff" }}>End</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
