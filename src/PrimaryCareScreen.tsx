import * as React from 'react';
import {ScrollView, View} from 'react-native';

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

import Ionicons from 'react-native-vector-icons/Ionicons';

function PrimaryCareScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        <Center p={2} pt={4}>
          <Box
            width="90%"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
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
            <HStack height={20}>
              <Center  width="30%">
                <Text fontSize="20" ml="-1" paddingLeft={5}>
                  Call
                </Text>
              </Center>
              <Center  width="30%">
                <VStack>
                <Icon size="xl" as={Ionicons} name="call-outline" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} />
                </VStack>
              </Center>
              <Center  width="40%">
                <VStack>
{/* <ion-icon name="chatbubble-outline"></ion-icon> */}
<Icon onPress={() => {
  console.log("calling1");
  navigation.navigate('MeetingScreen');
}} size="xl" as={Ionicons} name="videocam-outline" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} />
      
                 
                </VStack>
              </Center>
            </HStack>
          </Box>
          </Center>
        <Center  p={2}>

          <Box
            width="90%"
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
            <HStack height={20}>
              <Center  width="40%">
                <Text fontSize="20" ml="-1" paddingLeft={5}>
                  Messsage
                </Text>
              </Center>

              <Center  width="60%"  >
           
              {/* <ion-icon name="call-outline"></ion-icon> */}
              <Icon  onPress={() => navigation.navigate('ChatScreen')} size="xl" as={Ionicons} name="chatbubble-outline" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} />


 

                {/* <Image
                  rounded={50}
                  size={'lg'}
                  source={require('./assets/Doctor1.png')}
                  alt="image"
                /> */}
              </Center>
            </HStack>
          </Box>
        </Center>
      </ScrollView>
    </View>
  );
}

export default PrimaryCareScreen;
