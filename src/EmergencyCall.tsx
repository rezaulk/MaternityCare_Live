import React, {useState, useEffect} from 'react';

import {Alert, Pressable, ScrollView, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';


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
  FlatList,
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../Fire';

function EmergencyCall({navigation}: {navigation: any}) {
  const [service, setService] = React.useState('');


  const [userlist, setuserlist] = React.useState<User[]>([]);

  useEffect(() => {

   
    getUsers();

    // getData();
  });


  const getUsers = async () => {
    try {
      // debugger;
      // const confirmation = await auth().getUsers();

      let user: User[] = [];
      const usersCollection = await firestore().collection('Users').get().then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
    

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          user.push(documentSnapshot.data());
        });

        setuserlist(user);
      });


    } catch (e) {
      // error reading value
    }
  };


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Phone');
      // debugger;
      if (value !== null) {
        // value previously stored
        setService(value);

        const sss = service;
      }
    } catch (e) {
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

         
      
      <FlatList   scrollEnabled={true}
      data={userlist} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "muted.50"
    }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              {/* <Avatar size="48px" source={{
          uri: item.avatarUrl
        }} /> */}
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.id}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item.name}
                </Text>
              </VStack>
              {/* <Spacer /> */}
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
               123
              </Text>

              <Button
                 onPress={() => navigation.navigate('ChatScreen')}
                  >Chat</Button>

            </HStack>
          </Box>} keyExtractor={item => item.id} />
   
        </HStack>

        
      </ScrollView>
    </View>
  );
}

export default EmergencyCall;
