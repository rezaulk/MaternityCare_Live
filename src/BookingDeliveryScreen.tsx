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

function BookingDeliveryScreen({navigation}: {navigation: any}) {
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
              <Center width="30%">
                <Text fontSize="20" ml="-1" paddingLeft={5}>
                  At Clinic
                </Text>
              </Center>
            
              <Center width="70%">
                <VStack>
                  {/* <ion-icon name="chatbubble-outline"></ion-icon> */}
                  <Button 
                 onPress={() => navigation.navigate('BookingDeliveryCalendarScreen')}
                  >Booking</Button>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </Center>
        <Center p={2}>
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
              <Center width="30%">
                <Text fontSize="20" ml="-1" paddingLeft={5}>
                  Home
                </Text>
              </Center>

              <Center width="70%">
                {/* <ion-icon name="call-outline"></ion-icon> */}
                <Button
                 onPress={() => navigation.navigate('BookingDeliveryCalendarScreen')}
                  >Booking</Button>

              

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

export default BookingDeliveryScreen;
