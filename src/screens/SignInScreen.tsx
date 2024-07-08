import React, { useState, useEffect } from 'react';

import {Alert, ScrollView,  View} from 'react-native';
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

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

function SignInScreen ({ navigation } : {navigation : any}) {

  const [formData, setData] = React.useState({});

  const onSubmit = async () => {

    const formData1 = new FormData();

    formData1.append("Email", formData.Email);
    formData1.append("Password", formData.Password);
    
debugger;

      axios.post('https://apimaternitycare.rezaulk.com/api/Login/login',{
        Email : formData.Email,
        Password : formData.Password,

      })
      .then(async function (response) {
        debugger;

        await AsyncStorage.setItem(
          '@UserId',JSON.stringify(response.data.data.id));

          
        navigation.navigate('Profile');
        console.log(response);
      })
      .catch(function (error) {
        debugger;

        console.log(error);
      });



    //const response = await axios.get(`https://apimaternitycare.rezaulk.com/api/Login/login`);


    
    debugger;
    
  };



  useEffect(() => {
    // Update the document title using the browser API
    // axios
    // .get("https://apimaternitycare.rezaulk.com/api/Login/login")
    // .then(function (response) {
    //   console.log(response);
    // });

  });
  
  console.log("HI")

  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
      
        <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Maternity Care
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in your account
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
                  onChangeText={value =>
                    setData({...formData, Email: value})
                  }
                />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
                  onChangeText={value =>
                    setData({...formData, Password: value})
                  }
                />

            <Checkbox value="one" my={2}>
        Remember me
      </Checkbox>
         
          </FormControl>
          <Button onPress={onSubmit}  mt="2" colorScheme="indigo">
            Sign in
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              or Sign in with.{" "}
            </Text>
           
          </HStack>

          <Button mt="2" colorScheme="indigo">
            Sign in with Google
          </Button>
          <Button mt="2" colorScheme="indigo">
            Sign in with Apple
          </Button> 
           <Button mt="2" colorScheme="indigo">
            Sign in with Google
          </Button>  
          <Button mt="2" colorScheme="indigo">
            Sign in with Facebook
          </Button>

          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>

          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              Don't have an account?.{" "}
            </Text>
            
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} onPress={() => navigation.navigate('SignUpScreen')}>
              Create Account
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
      </ScrollView>
    </View>
  );
}

export default SignInScreen;
