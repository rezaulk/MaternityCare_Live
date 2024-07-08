import React, {useState, useEffect, useRef} from 'react';

import {Alert, ScrollView, StyleSheet, TextInput, View} from 'react-native';
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
import PhoneInput from "react-native-phone-number-input";
import OTPTextInput  from "react-native-otp-textinput";
import OTPTextView from 'react-native-otp-textinput';

function LoginScreen({navigation}: {navigation: any}) {
  const [formData, setData] = React.useState({});
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [PhoneNo, setPhoneNo] = useState('');
  const [user, setUser] = useState();
  const [confirmedCheck, setConfirmedCheck] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [formattedValue, setFormattedValue] = useState("");


  const [otpInput, setOtpInput] = useState<string>('');

  const input = useRef<OTPTextView>(null);

  const clear = () => input.current?.clear();

  const updateOtpText = () => input.current?.setValue(otpInput);

  const showTextAlert = () => otpInput && Alert.alert(otpInput);

  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

   

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


        debugger;
        
        if(formData.Phone != undefined)
   {
    var _phone =  formData.Phone;

    signInWithPhoneNumber(_phone);
   }
       

        

       // setConfirmedCheck(true);






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

        /*
          const res=   await confirm.confirm(code);
          console.log(res);
         */
     

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
   
    <Center flex={1} px="3">
    <Box alignItems="center"  >
          <Box  safeArea p="2" py="8" w="100%" maxW="290" alignItems="center">
            {/* <Heading
              size="lg"
              textAlign={'center'}
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}>

<Image
                  style={{ height: 200, width: 200, resizeMode: "contain" }}
                  source={require("../assets/maternity_Care_logo.png")}
                  alt="image"
                />

             
            </Heading> */}

          
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

<Heading
              mt="1"
              textAlign={'center'}
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontSize="xl"
              // paddingBottom={10}
              // size="xs"
              >
            Enter 4 digit Mobile Verification Code Code is send to 016-------26 Number
            </Heading>


{/* <FormControl.Label   textAlign={'center'}>Enter 4 digit Mobile Verification Code Code is send to 016-------26 Number</FormControl.Label> */}

{/* <Input value={code} w="100%" onChangeText={handleChange} placeholder="Value Controlled Input" /> */}

{/* <OTPTextView
          ref={input}
          containerStyle={styles.textInputContainer}
          handleTextChange={setOtpInput}
          handleCellTextChange={handleCellTextChange}
          inputCount={4}
          keyboardType="numeric"
        /> */}

<Text>Demo OTP: 258686</Text>

<OTPTextView
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          defaultValue=""
          inputCount={6}
          handleTextChange={setCode}
        />
        {/* <OTPTextView
          containerStyle={styles.textInputContainer}
          tintColor="#000"  //258686
        />
        <TextInput />
        <OTPTextView
          containerStyle={styles.textInputContainer}
          tintColor={['#FF0000', '#FFFF00', '#00FF00', '#0000FF']}
        />
        <OTPTextView
          containerStyle={styles.textInputContainer}
          tintColor="#000"
          offTintColor={['#FF0000', '#FFFF00', '#00FF00', '#0000FF']}
        /> */}

        


{/* <OTPTextInput ref={e => (this.otpInput = e)} >


</OTPTextInput> */}
       {/* <Input
                  onChangeText={value => setData({...formData, Phone: value})}
                /> */}
     <Button onPress={confirmCode} mt="2" colorScheme="indigo">
      Confirm
     </Button> 
     </View> :
    <View>  
     {/* <FormControl.Label>Put your mobile number</FormControl.Label> */}
{/* <Input value={value} w="100%" onChangeText={handleChange} placeholder="Value Controlled Input" /> */}
{/* <Input
                  onChangeText={value => setData({...formData, Phone: value})}
                /> */}

<Center>

<Image
                  style={{ borderWidth:1, height: 30, width: 200, resizeMode: "contain" }}
                  source={require("../assets/maternity_Care_logo.png")}
                  alt="image"
                />
            <Heading
              mt="1"
              textAlign={'center'}
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontSize="xl"
              paddingBottom={10}
              // size="xs"
              >
              Sign in to your account
            </Heading>



<PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="BD"
            layout="first"
            placeholder='Mobile Number'
            onChangeText={(text) => {
              setData({...formData, Phone: text})
            }}
            onChangeFormattedText={(text) => {
              // setFormattedValue(text);
              setData({...formData, Phone: text})
            }}
            
            withDarkTheme
            withShadow
            autoFocus
            
          />


<Text>Demo Number: 01674086295</Text>
      <Button width={250} marginTop={10} onPress={onSubmit} mt="2" colorScheme="indigo">
  Sign In
 </Button> 
</Center>

 
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
       </Box>

       </Center>
    
  );
}

export default LoginScreen;


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '60%',
    gap: 20,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

