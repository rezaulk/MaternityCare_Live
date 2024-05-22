import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Center,
  VStack,
  Box,
  HStack,
  NativeBaseProvider,
  Divider,
} from "native-base";
import { StyleSheet } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import AnimatedLoader from "react-native-animated-loader";
// import { auth } from '../firebase';

function InitalScreen({ navigation }: { navigation: any }) {
  const [user, setUser] = useState();

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);

      const subscriber = auth().onAuthStateChanged((user) => {
        if (user != null) {
          navigation.navigate("Home");

          setUser(user._user);
          console.log("user", JSON.stringify(user));
          console.log("user", user._user);
        } else {
          navigation.navigate("loginScreen");
        }

        // setUser(user);
      });
    }, 5000);
    // }, [])

    // setInterval(() => {
    //   setVisible(!visible);

    //   const subscriber = auth().onAuthStateChanged((user) => {

    //     if(user != null){
    //       navigation.navigate('Home');

    //       setUser(user._user);
    //       console.log("user", JSON.stringify(user));
    //       console.log("user", user._user);
    //     }

    //     // setUser(user);
    //   });

    // }, 200000);
  }, []);

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.400"
            borderWidth="0"
            // _dark={{
            //   borderColor: 'coolGray.600',
            //   backgroundColor: 'gray.700',
            // }}
            // _web={{
            //   shadow: 0,
            //   borderWidth: 0,
            // }}
            // _light={{
            //   backgroundColor: 'gray.50',
            // }}
          >
            <VStack space={2} divider={<Divider />} w="90%">
              <HStack justifyContent="space-between" w="90%">
                <Image
                  style={{ height: 150, width: 150, resizeMode: "contain" }}
                  source={require("./assets/logo.png")}
                  alt="image"
                />

                <Image
                  style={{ height: 150, width: 150, resizeMode: "contain" }}
                  source={require("./assets/maternity_Care_logo.png")}
                  alt="image"
                />
                {/* <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                fontFamily: 'AlegreyaSans-Regular',
                alignSelf: 'center'
              }}>
             MaternityCare
            </Text> */}
              </HStack>
            </VStack>

            <AnimatedLoader
              visible={visible}
              overlayColor="rgba(255,255,255,0)"
              animationStyle={styles.lottie}
              source={require("./assets/loader/Animation1.json")}
              speed={0.5}
            >
              <Text marginTop={-150}>Loading ...</Text>
            </AnimatedLoader>
          </Box>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default InitalScreen;

const styles = StyleSheet.create({
  lottie: {
    width: 400,
    height: 400,
    marginTop: 300,
  },
});
