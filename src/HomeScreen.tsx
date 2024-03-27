import * as React from 'react';
import {Pressable, ScrollView, View} from 'react-native';

import {Text, Heading, Image, Center, Box, HStack, Stack} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import auth from "@react-native-firebase/auth";


function HomeScreen({navigation}: {navigation: any}) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userName');
      if (value !== null) {
        setuserName(value);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  const [userName, setuserName] = React.useState('');

  useEffect(() => {
    getData();


    const subscriber = auth().onAuthStateChanged((user) => {
      console.log("user", JSON.stringify(user));
      // setUser(user);
    });


    // Update the document title using the browser API
    // axios
    // .get("https://apimaternitycare.rezaulk.com/api/Login/login")
    // .then(function (response) {
    //   console.log(response);
    // });
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        <Heading size="md" pt={2} paddingLeft={5} paddingBottom={5}>
          Pregnant Mother Care {userName}
        </Heading>

        <Center>
          <HStack space={5} justifyContent="center">
            <Center w="45%" rounded="md" borderColor={'blueGray.900'}>
              <Box w="100%" alignItems="center">
                <Box
                  rounded="lg"
                  overflow="hidden"
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
                  <Pressable onPress={() => navigation.navigate('PrimaryCare')}>
                    <HStack h={12} backgroundColor="#FD9999">
                      <Center w="30%">
                        <Image
                          height={9}
                          w={9}
                          source={require('./assets/PrimaryCare.jpg')}
                          alt="image"
                        />
                      </Center>

                      <Center w="70%">
                        <Text
                          fontSize="14"
                          ml="-1"
                          paddingLeft={3}
                          paddingRight={5}>
                          Primary Care
                        </Text>
                      </Center>
                    </HStack>
                    <Stack h={12} space={2} alignItems="center">
                      <Text fontSize="14" ml="-1">
                        Talk to Nurse {'\n'}online 24 hours
                      </Text>
                    </Stack>
                  </Pressable>
                </Box>
              </Box>
            </Center>

            <Center w="45%" rounded="md" borderColor={'blueGray.900'}>
              <Box w="100%" alignItems="center">
                <Box
                  rounded="lg"
                  overflow="hidden"
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
                  <Pressable onPress={() => navigation.navigate('DoctorList')}>

                  <HStack h={12} backgroundColor="#FD9999">
                    <Center w="30%">
                      <Image
                        height={9}
                        w={9}
                        source={require('./assets/Gyconologist.png')}
                        alt="image"
                      />
                    </Center>

                    <Center w="70%">
                      <Text
                        fontSize="14"
                        ml="-1"
                        paddingLeft={3}
                        paddingRight={5}>
                        Consult with a Specialist
                      </Text>
                    </Center>
                  </HStack>
                  <Stack space={2} alignItems="center">
                    <Text fontSize="14" ml="-1">
                      Consult with {'\n'} best Gynecologist
                    </Text>
                  </Stack>
                  </Pressable>
                </Box>
              </Box>
            </Center>
            {/* <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} /> */}
          </HStack>

          <HStack space={5} justifyContent="center">
            <Center w="45%" rounded="md" borderColor={'blueGray.900'}>
              <Box w="100%" alignItems="center">
                <Box
                  rounded="lg"
                  overflow="hidden"
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
                  <Pressable onPress={() => navigation.navigate('NutrionScreen')}>
                    <HStack h={12} backgroundColor="#FD9999">
                      <Center w="30%">
                        <Image
                          height={9}
                          w={9}
                          source={require('./assets/Nutrition.jpg')}
                          alt="image"
                        />
                      </Center>

                      <Center w="70%">
                        <Text
                          fontSize="14"
                          ml="-1"
                          paddingLeft={3}
                          paddingRight={5}>
                          Nutrion & Fitness
                        </Text>
                      </Center>
                    </HStack>
                    <Stack h={12} space={2} alignItems="center">
                      <Text fontSize="14" ml="-1">
                        Pregnency time food,diet
                      </Text>
                    </Stack>
                  </Pressable>
                </Box>
              </Box>
            </Center>

            <Center w="45%" rounded="md" borderColor={'blueGray.900'}>
              <Box w="100%" alignItems="center">
                <Box
                  rounded="lg"
                  overflow="hidden"
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
                  <Pressable onPress={() => navigation.navigate('BookingDeliveryScreen')}>

                  <HStack h={12} backgroundColor="#FD9999">
                    <Center w="30%">
                      <Image
                        height={9}
                        w={9}
                        source={require('./assets/Clinic.jpg')}
                        alt="image"
                      />
                    </Center>

                    <Center w="70%">
                      <Text
                        fontSize="14"
                        ml="-1"
                        paddingLeft={3}
                        paddingRight={5}>
                        Clinic Appontments
                      </Text>
                    </Center>
                  </HStack>
                  <Stack h={12} space={2} alignItems="center">
                    <Text fontSize="14" ml="-1">
                      Booking click for delivery
                    </Text>
                  </Stack>
                  </Pressable>
                </Box>
              </Box>
            </Center>
            {/* <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} /> */}
          </HStack>

          {/* <HStack
            space={5}
            w="100%"
            px="5"
            alignItems="center"
            justifyContent="center">
            <HStack alignItems="center">
              <Box alignItems="center">
                <Box
                  // maxW="70"
                  width="40"
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
                  <Pressable onPress={() => navigation.navigate('PrimaryCare')}>
                    <Box>
                      <HStack>
                        <Center>
                          <Image
                            size={'sm'}
                            source={require('./assets/PrimaryCare.jpg')}
                            alt="image"
                          />
                        </Center>

                        <Center>
                          <Text
                            fontSize="14"
                            ml="-1"
                            paddingLeft={3}
                            paddingRight={5}>
                            Primary Care
                          </Text>
                        </Center>
                      </HStack>
                    </Box>
                  </Pressable>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Text fontSize="14" ml="-1">
                        Talk to Nurse online 24 hours
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </HStack>

            <HStack alignItems="center">
              <Box alignItems="center">
                <Box
                  maxW="40"
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
                    <HStack>
                      <Center>
                        <Image
                          size={'sm'}
                          source={require('./assets/Gyconologist.png')}
                          alt="image"
                        />
                      </Center>

                      <Center>
                        <Text fontSize="14" ml="-1" paddingLeft={5}>
                          Consult with a Specialist
                        </Text>
                      </Center>
                    </HStack>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Text fontSize="14" ml="-1">
                        Consult with best Gynecologist
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </HStack>
          </HStack>

          <HStack
            space={5}
            w="100%"
            px="5"
            alignItems="center"
            justifyContent="center">
            <HStack alignItems="center">
              <Box alignItems="center">
                <Box
                  maxW="40"
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
                    <HStack>
                      <Center>
                        <Image
                          size={'sm'}
                          source={require('./assets/Nutrition.jpg')}
                          alt="image"
                        />
                      </Center>

                      <Center>
                        <Text fontSize="14" ml="-1" paddingLeft={3}>
                          Nutrion & Fitness
                        </Text>
                      </Center>
                    </HStack>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Text fontSize="14" ml="-1">
                        pregnency time food,diet
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </HStack>

            <HStack alignItems="center">
              <Box alignItems="center">
                <Box
                  maxW="40"
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
                  <Pressable
                    onPress={() =>
                      navigation.navigate('BookingDeliveryScreen')
                    }>
                    <Box>
                      <HStack>
                        <Center>
                          <Image
                            size={'sm'}
                            source={require('./assets/Clinic.jpg')}
                            alt="image"
                          />
                        </Center>

                        <Center>
                          <Text fontSize="14" ml="-1" paddingLeft={5}>
                            Clinic Appontments
                          </Text>
                        </Center>
                      </HStack>
                    </Box>
                  </Pressable>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Text fontSize="14" ml="-1">
                        Booking click for delivery
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </HStack>
          </HStack> */}
        </Center>

        <Heading size="md" pt={2} paddingLeft={5} paddingBottom={0}>
          Specialist Doctor
        </Heading>

        <Center>
          <HStack space={5} w="100%" px="3" alignItems="center">
            <ScrollView horizontal={true} persistentScrollbar={true}>
              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Pressable onPress={() => navigation.navigate('DoctorList')}>
                    <Box
                      // maxW="40"
                      h={140}
                      w={95}
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
                   
                        <Center>
                          <HStack>
                            <Image
                              size={'sm'}
                              source={require('./assets/Pediatriction.jpg')}
                              alt="image"
                            />
                          </HStack>
                        </Center>
                     
                      <Stack p="4" space={3}>
                        <Stack space={2}>
                          <Text fontSize="12" ml="-1">
                            Pediatrician
                          </Text>
                        </Stack>
                      </Stack>
                    </Box>
                  </Pressable>
                </Box>
              </HStack>

              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    maxW="40"
                    h={140}
                    w={90}
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
                        <HStack>
                          <Image
                            size={'sm'}
                            source={require('./assets/Medicine.png')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Medicine
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                 //   maxW="40"
                    h={140}
                    w={95}
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
                        <HStack>
                          <Image
                            size={'sm'}
                            source={require('./assets/Heart.png')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Pediatric heart disease
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                   // maxW="40"
                    h={140}
                    w={95}
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
                        <HStack>
                          <Image
                            size={'sm'}
                            source={require('./assets/Gyconologist.png')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Gynecology
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </HStack>

             
            </ScrollView>
          </HStack>
        </Center>

        <Heading size="md" pt={2} paddingLeft={5} paddingBottom={5}>
          Other Services
        </Heading>

        <Center>
          <HStack space={5} w="100%" px="5" alignItems="center" >
            <ScrollView horizontal={true} persistentScrollbar={true}>
              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={140}
                    w={95}
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
                        <HStack>
                          <Image
                            size={'sm'}
                            source={require('./assets/shop.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Shop
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={140}
                    w={95}
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
                        <HStack>
                          <Image
                            size={'sm'}
                            source={require('./assets/blood.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Blood
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center">
                <Box alignItems="center">
                  <Box
                    h={140}
                    w={95}
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
                        <HStack>
                          <Image
                            size={'sm'}
                            source={require('./assets/LaboratoryTest.png')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Laboraotry Test
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={140}
                    w={95}
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
                        <HStack>
                          <Image
                            size={'sm'}
                            source={require('./assets/article.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Health concern Article & video
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </HStack>
            </ScrollView>
          </HStack>
        </Center>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
