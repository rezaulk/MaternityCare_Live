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
  Input,
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';

function AppointmentDetailsScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1 , backgroundColor: 'white'}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        {/* <Heading size="md" paddingLeft={5} paddingBottom={5}>
          Pregnant Mother Care
        </Heading> */}

        <VStack w="100%" space={5} p={2} alignSelf="center">
        
        
        </VStack>

        <Center pb={2}>
          <Box alignItems="center">
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
              <HStack>
                <Center w="30%">
                  <Image
                    rounded={50}
                    size={'lg'}
                    source={require('./assets/Doctor1.png')}
                    alt="image"
                  />
                 
                </Center>

                <Center w="70%">
                  <VStack w="100%">
                    <Text fontWeight={'extrabold'} fontSize="16" ml="-1" paddingLeft={5}>
                      Assistant. Prof. Dr. Farhana
                    </Text>
                    <Text  fontWeight={'bold'} fontSize="12" ml="-1" paddingLeft={5}>
                    28 Years
                    </Text>
                    <Text fontSize="12" ml="-1" paddingLeft={5}>
                     Female
                    </Text>
                   
                 
                  </VStack>

               

                    {/* <Button size={'sm'}>Appointment</Button> */}
                 
                </Center>
              </HStack>
            </Box>
          </Box>


       

          <Box alignItems="center" style={{paddingTop: 100}}>
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
              <HStack>
            

                <Center w="100%">
                  <VStack w="100%">
                    <Text fontWeight={'extrabold'} fontSize="16" ml="-1" paddingLeft={5}>
                      New patient
                    </Text>
                    <Text  fontWeight={'bold'} fontSize="12" ml="-1" paddingLeft={5}>
                   
                    </Text>
                    <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Problem: বুক জ্বালাপোড়া, পায়ে পানি /পা ফোলা
                    </Text>
                   
                 
                  </VStack>

                 

                    {/* <Button size={'sm'}>Appointment</Button> */}
                 
                </Center>
              </HStack>
            </Box>
          </Box>


        </Center>

       
      </ScrollView>
    </View>
  );
}

export default AppointmentDetailsScreen;


 