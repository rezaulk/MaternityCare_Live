import React, {useState, useEffect} from 'react';

import {Alert, ScrollView, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  Icon,
  Heading,
  Image,
  Center,
  Flex,
  VStack,
  AspectRatio,
  Box,
  HStack,
  Stack,
  Button,
  FormControl,
  Input,
  Link,
  Checkbox,
} from 'native-base';

import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


function LoginScreen({navigation}: {navigation: any}) {
  const [formData, setData] = React.useState({});
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [PhoneNo, setPhoneNo] = useState('');
  const [user, setUser] = useState();
  const [confirmedCheck, setConfirmedCheck] = useState(false);



  const getData = async () => {
    try {
      debugger;
      const value = await AsyncStorage.getItem('@Phone');
      if (value !== null) {
        setPhoneNo(value);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  // async function confirmCode() {
  //   try {
  //    const res=   await confirm.confirm("123456");
  //    console.log(res);

  //    navigation.navigate('Home');
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // }

  // async function onSubmit() {

  
  
  //     try {
  //       try {
  
  
  //         var _phone =  '+88'+ formData.Phone;
  
  //         signInWithPhoneNumber(_phone);
         
  //         debugger;
  //       } catch (ex) {
  //         console.log(ex);
  //         debugger;
  //       }
  //       debugger;
  //     } catch (ex) {
  //       console.log(ex);
  //       debugger;
  //     }
  //   };

    
  // async function signInWithPhoneNumber(phoneNumber) {
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
  // }



  async function onSubmit() {

  // const onSubmit = async () => {
    // Alert("asda");
    debugger;

    try {
      try {


        var _phone =  '+88'+ formData.Phone;

        signInWithPhoneNumber(_phone);
        // const confirmation = await auth().signInWithPhoneNumber(
        //   _phone
        // );
     

        //  setConfirm(confirmation);


        //  setCode('123456');
        // const res=   await confirm.confirm(code);

        // // storeData('+88'+ formData.Phone);

       

        // navigation.navigate('Home');


        // try {
        //   debugger;
        //   await confirmation.confirm(code);

        //   storeData('+88'+ formData.Phone);

        //   createUserDatabase();

        //   navigation.navigate('Home');
        // } catch (error) {
        //   console.log(error);

        //   console.log('Invalid code.');
        // }

        // confirmCode();
        debugger;
      } catch (ex) {
        console.log(ex);
        debugger;
      }
      debugger;
    } catch (ex) {
      console.log(ex);
      debugger;
    }
  };



    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);

      setConfirmedCheck(true);
      // confirmCode();
    }
  
    async function confirmCode() {
      try {
       const res=   await confirm.confirm(code);
       console.log(res);

       navigation.navigate('Home');
      } catch (error) {
        console.log('Invalid code.');
      }
    }



  const createUserDatabase = () => {
    firestore()
    .collection('Users')
    .add({
      name: 'Ada Lovelace',
      id: 30,
    })
    .then(async () => {
      console.log('User added!');

      debugger;
      const usersCollection = await firestore().collection('Users').get().then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
    
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });

      console.log(usersCollection);

    });
}



  useEffect(() => {

    const subscriber = auth().onAuthStateChanged((user) => {
      
      if(user != null){
        navigation.navigate('Home');

        setUser(user._user);
        console.log("user", JSON.stringify(user));
        console.log("user", user._user);
      }
     

      // setUser(user);
    });


    // getData();
    // if (PhoneNo != '') {

    //   // createUserDatabase();


    //   navigation.navigate('Home');
    // }
  });


  const [value, setValue] = React.useState("");

  const handleChange = text => setCode(text);

  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}>
              Maternity Care
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs">
              Sign in your account
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
{/* <Input value={value} w="100%" onChangeText={handleChange} placeholder="Value Controlled Input" /> */}


                {/* <FormControl.Label>Put your mobile number</FormControl.Label> */}
             
              </FormControl>

              {/* {
          if(isLoggedIn){
            return <button>Logout</button>
          } else{
            return <button>Login</button>
          }
        }

   {
 if(!confirmedCheck){
  return  (  <Button onPress={onSubmit} mt="2" colorScheme="indigo">
  Continue
 </Button>);

 

  } 
        
   } */}
     
            </VStack>

            {/* <Button onPress={confirmCode} mt="2" colorScheme="indigo">
               Confirm Code
              </Button> */}

{confirmedCheck ?
     <View> 

<FormControl.Label>Enter your OTP</FormControl.Label>

<Input value={code} w="100%" onChangeText={handleChange} placeholder="Value Controlled Input" />

       {/* <Input
                  onChangeText={value => setData({...formData, Phone: value})}
                /> */}
     <Button onPress={confirmCode} mt="2" colorScheme="indigo">
      Confirm Code
     </Button> 
     </View> :
    <View>  
     <FormControl.Label>Put your mobile number</FormControl.Label>
{/* <Input value={value} w="100%" onChangeText={handleChange} placeholder="Value Controlled Input" /> */}
<Input
                  onChangeText={value => setData({...formData, Phone: value})}
                />

      <Button onPress={onSubmit} mt="2" colorScheme="indigo">
  Continue
 </Button> 
 
  </View>
}
          {/* {if(confirmedCheck) {
              
                  <Button onPress={confirmCode} mt="2" colorScheme="indigo">
               Confirm Code
              </Button>
              //  <Input value={code} onChangeText={text => setCode(text)} />
              //  <Button onPress={confirmCode} mt="2" colorScheme="indigo">
              //  Confirm Code
              // </Button>

             
            }  } */}
         


          </Box>
        </Center>
      </ScrollView>
    </View>
  );
}

export default LoginScreen;
