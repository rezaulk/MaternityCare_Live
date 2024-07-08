import React, {useCallback, useState, useLayoutEffect, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from "@react-native-firebase/auth";
import { Text } from 'native-base';
import firestore from '@react-native-firebase/firestore';

function ChatScreen({navigation}: {navigation: any}) {

  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();

  const onHandleLogin = () => {
    // alert("onHandleLogin name  " + name);

    // setShowModal(false);
    // if (true) {
    //   signInWithEmailAndPassword(auth, name + '@gmail.com', 'password')
    //     .then(
    //       () => {
    //         storeData(name + '@gmail.com');
    //         const q = query(
    //           collection(db, 'chats'),
    //           orderBy('createdAt', 'desc'),
    //         );

    //         // const unsubscribe = onSnapshot(q, snapshot =>
    //         //   // setMessages(
    //         //   //   // snapshot.docs.map(doc => ({
    //         //   //   //   _id: doc.data()._id,
    //         //   //   //   createdAt: doc.data().createdAt.toDate(),
    //         //   //   //   text: doc.data().text,
    //         //   //   //   user: doc.data().user,
    //         //   //   // })),
    //         //   // ),
    //         // );

    //         // return () => {
    //         //   unsubscribe();
    //         // };
    //       },

    //       // alert("Login success")
    //     )
    //     // console.log('Login success'))
    //     .catch(err => {
    //       console.log(`Login err: ${err}`);

    //       // alert("Login Fails")
    //       setShowModal(true);
    //     });
    // }
  };

  const checklogin = async () => {
    // await AsyncStorage.removeItem('@UseName');
    var Ename = await AsyncStorage.getItem('@UseName');

    // alert("++++   Ename   "+Ename);
    console.log('++++   Ename   ' + Ename);

    if (Ename == null) {
      setShowModal(true);
    } else {
      setName(Ename);
      onHandleLogin();
    }
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@UseName', value);
    } catch (e) {
      // saving error
    }
  };

//   const register = () => {
//     // alert("register");

//     console.log('register');

//     // setShowModal(false);

//     createUserWithEmailAndPassword(auth, name + '@gmail.com', 'password')
//       .then((userCredential: {user: any}) => {
//         // Registered
//         // alert("Registered");

//         setShowModal(false);
//         storeData(name + '@gmail.com');

//         const user = userCredential.user;
//         //   updateProfile(user, {
//         //       displayName: name,
//         //       photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
//         //   })
//         //   .then(() => {

//         //       alert('Registered, please login.');
//         //       console.log('Registered, please login.');

//         //   })
//         //   .catch((error) => {
//         // alert("Registered error");

//         //       alert(error.message);
//         //       console.log("++++"+error.message);

//         //   })
//       })
//       .catch((error: {code: any; message: any}) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         //   alert(errorMessage);
//         console.log('++++' + errorMessage);
//       });
//   };

//   const signOutNow = () => {
//     signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//         navigation.replace('Login');
//       })
//       .catch((error: any) => {
//         // An error happened.
//       });
//   };
  // useLayoutEffect(() => {
    // navigation.setOptions({
    //   headerLeft: () => (
    //     <View style={{marginLeft: 20}}>
    //       <Avatar
    //         rounded
    //         source={{
    //           uri: auth?.currentUser?.photoURL,
    //         }}
    //       />
    //     </View>
    //   ),
    //   headerRight: () => (
    //     <TouchableOpacity
    //       style={{
    //         marginRight: 10,
    //       }}
    //       onPress={signOutNow}>
    //       <Text>logout</Text>
    //     </TouchableOpacity>
    //   ),
    // });
debugger;

// setMessages([
//   {
//     _id: 1,
//     text: 'Hello developer',
//     createdAt: new Date(),
//     user: {
//       _id: 2,
//       name: 'React Native',
//       avatar: 'https://placeimg.com/140/140/any',
//     },
//   },
// ]);



// const subscriber1 = auth().onAuthStateChanged((user) => {
//   debugger;
//   if(user != null){
//     navigation.navigate('Home');
//     setUser(user._user);

//     console.log("user", JSON.stringify(user));
//     console.log("user", user._user);
//   }
// });


//     // const subscriber = auth().onAuthStateChanged((user) => {
//     //   console.log("user", JSON.stringify(user));
//     //   // setUser(user);
//     // });

//     // onHandleLogin();

//     // register();
//     // checklogin();
//   }, [navigation]);

  // const onSend = useCallback((messages = []) => {
  //   // alert("dsafdsf");
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  //   const {_id, createdAt, text, user} = messages[0];

  //   // addDoc(collection(db, 'chats'), {_id, createdAt, text, user});
  // }, []);

   useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);


    firestore()
  .collection('chats')
  // Filter results
  .orderBy('createdAt', 'desc')
  .get()
  .then(querySnapshot => {
    
    debugger;
        setMessages(
          querySnapshot.docs.map(doc => ({
                  _id: doc.data()._id,
                  createdAt: doc.data().createdAt.toDate(),
                  text: doc.data().text,
                  user: doc.data().user,
                })),
              )

  });


  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

      const {_id, createdAt, text, user} = messages[0];

     // addDoc(collection(db, 'chats'), {_id, createdAt, text, user});

      firestore()
  .collection('chats')
  .add({_id, createdAt, text, user})
  .then(() => {
    console.log('User added!');
  });


  }, [])


  return (
   
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
  />

  //   <View style={{flex: 1}}>
  //     <GiftedChat
  //       messages={messages}
  //       showAvatarForEveryMessage={true}
  //       onSend={messages => onSend(messages)}
  //       user={{
  //         _id: user?.uid,
  //         name: user?.phoneNumber,
  //         // avatar: user?.photoURL,
  //       }}
  //     />

  //     <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  //       <Modal.Content maxWidth="400px">
  //         <Modal.CloseButton />
  //         <Modal.Header>Create Account</Modal.Header>
  //         <Modal.Body>
  //           <FormControl>
  //             <FormControl.Label>Name</FormControl.Label>
  //             <Input onChangeText={text => setName(text)} />
  //           </FormControl>
  //           {/* <FormControl mt="3">
  //             <FormControl.Label>Email</FormControl.Label>
  //             <Input />
  //           </FormControl> */}
  //         </Modal.Body>
  //         {/* <Modal.Footer>
  //           <Button.Group space={2}>
  //             <Button
  //               variant="ghost"
  //               colorScheme="blueGray"
  //               onPress={() => setShowModal(false)}>
  //               Cancel
  //             </Button>
  //             <Button
  //               onPress={() => {
  //                 register();
  //               }}>
  //               Save
  //             </Button>
  //           </Button.Group>
  //         </Modal.Footer> */}
  //       </Modal.Content>
  //     </Modal>
  //  </View>
  );
}

export default ChatScreen;
 

