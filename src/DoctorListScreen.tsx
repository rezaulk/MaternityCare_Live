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

function DoctorListScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        {/* <Heading size="md" paddingLeft={5} paddingBottom={5}>
          Pregnant Mother Care
        </Heading> */}

        <VStack w="100%" space={5} p={2} alignSelf="center">
          <Input
            placeholder="Search"
            borderWidth={1}
            borderRadius={25}
            variant="filled"
            width="100%"
            borderRadius="10"
            py="1"
            px="2"
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color="gray.400"
                as={<Ionicons name="ios-search" />}
              />
            }
          />
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
                  <Text fontSize="12" p={2}>
                    8 Years of experience
                  </Text>
                </Center>

                <Center w="70%">
                  <VStack w="100%">
                    <Text fontSize="16" ml="-1" paddingLeft={5}>
                      Assistant. Prof. Dr. Farhana
                    </Text>
                    <Text fontSize="12" ml="-1" paddingLeft={5}>
                      MBBS,FCPS
                    </Text>
                    <Text fontSize="12" ml="-1" paddingLeft={5}>
                      Training: Trained in TATA Memorial Hospital, Mumbai,
                      India.
                    </Text>
                    <Text fontSize="12" ml="-1" paddingLeft={5}>
                      Specialities: Specialist in Gynaecology & Obstetrics and
                      Gynaecological Oncology.
                    </Text>
                    <Text fontSize="12" ml="-1" paddingLeft={5}>
                      Designation: Assistant Professor,
                    </Text>
                    <Text
                      numberOfLines={2}
                      w="100%"
                      fontSize="12"
                      ml="-1"
                      paddingLeft={5}
                      style={{flexDirection: 'row'}}>
                      Organization: National Institute of Cancer Research and
                      Hospital, Mohakhali, Dhaka
                    </Text>
                  </VStack>

                  <HStack w="100%" space={5} textAlign={'right'}>
                    <Text
                      fontSize="12"
                      color={'blue.400'}
                      ml="-1"
                      paddingLeft={5}>
                      Available Today
                    </Text>
                  </HStack>

                  <HStack w="100%" space={5}>
                    <Button
                      size={'sm'}
                      onPress={() => navigation.navigate('AppointmentScreen')}>
                      Appointment
                    </Button>
                    {/* <Button size={'sm'}>Appointment</Button> */}
                  </HStack>
                </Center>
              </HStack>
            </Box>
          </Box>
        </Center>

        <Center pb={2}>
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
                  source={require('./assets/Doctor2.png')}
                  alt="image"
                />
                <Text fontSize="12" p={2}>
                  8 Years of experience
                </Text>
              </Center>

              <Center w="70%">
                <VStack w="100%">
                  <Text fontSize="16" ml="-1" paddingLeft={5}>
                    Dr Tarafdar Runa Laila
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    MBBS,FCPS
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Training: Trained in TATA Memorial Hospital, Mumbai, India.
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Specialities: Specialist in Gynaecology & Obstetrics and
                    Gynaecological Oncology.
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Designation: Assistant Professor,
                  </Text>
                  <Text
                    numberOfLines={2}
                    w="100%"
                    fontSize="12"
                    ml="-1"
                    paddingLeft={5}
                    style={{flexDirection: 'row'}}>
                    Organization: National Institute of Cancer Research and
                    Hospital, Mohakhali, Dhaka
                  </Text>
                </VStack>

                <HStack w="100%" space={5} textAlign={'right'}>
                  <Text
                    fontSize="12"
                    color={'blue.400'}
                    ml="-1"
                    paddingLeft={5}>
                    Available Today
                  </Text>
                </HStack>

                <HStack w="100%" space={5}>
                  <Button
                    size={'sm'}
                    onPress={() => navigation.navigate('AppointmentScreen')}>
                    Appointment
                  </Button>
                  {/* <Button size={'sm'}>Appointment</Button> */}
                </HStack>
              </Center>
            </HStack>
          </Box>
        </Center>

        <Center pb={2}>
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
                <Text fontSize="12" p={2}>
                  8 Years of experience
                </Text>
              </Center>

              <Center w="70%">
                <VStack w="100%">
                  <Text fontSize="16" ml="-1" paddingLeft={5}>
                    Assistant. Prof. Dr. Farhana
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    MBBS,FCPS
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Training: Trained in TATA Memorial Hospital, Mumbai, India.
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Specialities: Specialist in Gynaecology & Obstetrics and
                    Gynaecological Oncology.
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Designation: Assistant Professor,
                  </Text>
                  <Text
                    numberOfLines={2}
                    w="100%"
                    fontSize="12"
                    ml="-1"
                    paddingLeft={5}
                    style={{flexDirection: 'row'}}>
                    Organization: National Institute of Cancer Research and
                    Hospital, Mohakhali, Dhaka
                  </Text>
                </VStack>

                <HStack w="100%" space={5} textAlign={'right'}>
                  <Text
                    fontSize="12"
                    color={'blue.400'}
                    ml="-1"
                    paddingLeft={5}>
                    Available Today
                  </Text>
                </HStack>

                <HStack w="100%" space={5}>
                  <Button
                    size={'sm'}
                    onPress={() => navigation.navigate('AppointmentScreen')}>
                    Appointment
                  </Button>
                  {/* <Button size={'sm'}>Appointment</Button> */}
                </HStack>
              </Center>
            </HStack>
          </Box>
        </Center>

        <Center pb={2}>
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
                <Text fontSize="12" p={2}>
                  8 Years of experience
                </Text>
              </Center>

              <Center w="70%">
                <VStack w="100%">
                  <Text fontSize="16" ml="-1" paddingLeft={5}>
                    Assistant. Prof. Dr. Farhana
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    MBBS,FCPS
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Training: Trained in TATA Memorial Hospital, Mumbai, India.
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Specialities: Specialist in Gynaecology & Obstetrics and
                    Gynaecological Oncology.
                  </Text>
                  <Text fontSize="12" ml="-1" paddingLeft={5}>
                    Designation: Assistant Professor,
                  </Text>
                  <Text
                    numberOfLines={2}
                    w="100%"
                    fontSize="12"
                    ml="-1"
                    paddingLeft={5}
                    style={{flexDirection: 'row'}}>
                    Organization: National Institute of Cancer Research and
                    Hospital, Mohakhali, Dhaka
                  </Text>
                </VStack>

                <HStack w="100%" space={5} textAlign={'right'}>
                  <Text
                    fontSize="12"
                    color={'blue.400'}
                    ml="-1"
                    paddingLeft={5}>
                    Available Today
                  </Text>
                </HStack>

                <HStack w="100%" space={5}>
                  <Button
                    size={'sm'}
                    onPress={() => navigation.navigate('AppointmentScreen')}>
                    Appointment
                  </Button>
                  {/* <Button size={'sm'}>Appointment</Button> */}
                </HStack>
              </Center>
            </HStack>
          </Box>
        </Center>
      </ScrollView>
    </View>
  );
}

export default DoctorListScreen;
