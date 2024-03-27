import React, {useState, useEffect} from 'react';

import {Alert, Pressable, ScrollView, View} from 'react-native';

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
} from 'native-base';

import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ProfileScreen({navigation}: {navigation: any}) {
  const [service, setService] = React.useState('');
  const [user, setUser] = React.useState();


  useEffect(() => {

    const subscriber = auth().onAuthStateChanged((user) => {
      debugger;
      if(user != null){
        // navigation.navigate('Home');

        setUser(user._user);
        console.log("user", JSON.stringify(user));
        console.log("user", user._user);
      }
      else{
        navigation.navigate('loginScreen');

      }
     

      // setUser(user);
    });

    getData();
  });
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Phone');
      debugger;
      if (value !== null) {
        // value previously stored
        setService(value);

        const sss = service;
      }
    } catch (e) {
      // error reading value
    }
  };


  const logOut = async () => {

    debugger;
    try {
      auth()
      .signOut()
      .then(() => {

        console.log('User signed out!');

        navigation.navigate('loginScreen');
      } );
      }
    catch (e) {
      console.log('User signed out!');

      // error reading value
    }
  };


  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        <Heading size="md" paddingLeft={5} paddingBottom={5}>
          Pregnant Mother Care
        </Heading>
        <HStack>
          {/* <Heading>{service}</Heading> */}

          <Center pb={2}>
            <Box alignItems="center">
              <Box
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: 'gray.50',
                }}>
                <Box>
                  <Center>
                    <Image
                      rounded={50}
                      size={'lg'}
                      source={require('./assets/profile.png')}
                      alt="image"
                    />
                  </Center>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {service}
                    </Heading>
                    <Text
                      fontSize="xs"
                      _light={{
                        color: 'violet.500',
                      }}
                      _dark={{
                        color: 'violet.400',
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1">
                      The Silicon Valley of India.
                    </Text>
                  </Stack>
                  <Text fontWeight="400">
                    Bengaluru (also called Bangalore) is the center of India's
                    high-tech industry. The city is also known for its parks and
                    nightlife.
                  </Text>
                </Stack>
              </Box>
            </Box>
          </Center>
        </HStack>

        <HStack>

          <Pressable>
            <Button onPress={() => navigation.navigate('SignInScreen')}>
              SignIn
            </Button>
          </Pressable>
          <Pressable>
            <Button onPress={() => navigation.navigate('SignUpScreen')}>
              SignUp
            </Button>
          </Pressable>
          <Pressable>
            <Button onPress={() => navigation.navigate('ChatScreen')}>
              Chat
            </Button>
          </Pressable>

          <Pressable>
            <Button onPress={() => logOut()}>
              LoutOut
            </Button>
          </Pressable>
        </HStack>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
