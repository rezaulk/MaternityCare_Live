import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Papa from "papaparse";
import {
  Avatar,
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  NativeBaseProvider,
  Pressable,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/database";
import RNFS from 'react-native-fs';


const ShopCategoryScreen = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(false);
  const [dataSearching, setDataSearching] = React.useState(false);

  const [medicinelist, setmedicinelist] = React.useState<Medicine[]>([]);
  const [mainmedicinelist, setmainmedicinelist] = React.useState<Medicine[]>(
    []
  );

  const [text, setText] = React.useState("");

  

  


  useEffect(() => {
    //fetchCSVData();
  }, []);

 

  
   

 

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("@shoppingcart", value);
    } catch (e) {
      // saving error
    }
  };

  const ResetCart = async () => {
    try {
      await AsyncStorage.removeItem("@shoppingcart");
      await AsyncStorage.removeItem("@CurrentOrder");
      await AsyncStorage.removeItem("@TotalOrder");


      // await AsyncStorage.removeItem("@shippingAddress");
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@shoppingcart");
      // debugger;
      if (value !== null) {
        // value previously stored
        return value;
      } else {
        return null;
      }
    } catch (e) {
      // error reading value
    }
  };

  const SearchFilterFunction = async (text: string) => {
    // SearchFilterFunction(text) {

    debugger;
    //passing the inserted text in textinput
    const newData = mainmedicinelist.filter(function (item: Medicine) {
      //applying filter for the inserted text in search bar
      const itemData = item.generic
        ? item.brand_name.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setmedicinelist(newData);
    setText(text);
    setDataSearching(true);
  };

  const searchDataCleaned = () => {
    setText("");
    setDataSearching(false);
  };

  return (
    <NativeBaseProvider>
      {loading ? (
        <Center flex={1} px="3">
          {" "}
          <HStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading
            </Heading>
          </HStack>{" "}
        </Center>
      ) : (
        <ScrollView>
          <VStack w="100%" space={5} alignSelf="center" padding={5}>
            <Input
              placeholder="Search"
              onChangeText={(text) => SearchFilterFunction(text)}
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
                  as={<Ionicons name="search-outline" />}
                />
              }
              InputRightElement={
                dataSearching == true ? (
                  <Icon
                    onPress={() => searchDataCleaned()}
                    ml="2"
                    size="4"
                    color="gray.400"
                    as={<Ionicons name="trash" />}
                  />
                ) : undefined
              }

              // datafetched == true ? InputRightElement={ datafetched == true ? <Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />  : null }
            />
          </VStack>

          <Heading size="md" pt={2} paddingLeft={5} paddingBottom={0}>
          Categories
        </Heading>

        <Center>
          <HStack space={5} w="100%" px="3" alignItems="center" >
            <ScrollView horizontal={true} persistentScrollbar={true}>
              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                    <Pressable onPress={() => navigation.navigate('ShopScreen')}>
              
                      <Center>
                        <HStack p={2}>
                          <Image
                           // size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/medicinepic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                      </Pressable>
                    </Box>

                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Medicine
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                        <HStack p={2}>
                          <Image
                            //size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/healthcarepic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          HealthCare
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center">
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                        <HStack p={2}>
                          <Image
                            //size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/beautypic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Beauty
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

             
            </ScrollView>
          </HStack>
        </Center>

        <Center>
          <HStack space={5} w="100%" px="3" alignItems="center" >
            <ScrollView horizontal={true} persistentScrollbar={true}>
              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                    <Pressable onPress={() => navigation.navigate('ShopScreen')}>
              
                      <Center>
                        <HStack p={2}>
                          <Image
                           // size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/babycarepic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                      </Pressable>
                    </Box>

                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Baby & Mom Care
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                        <HStack p={2}>
                          <Image
                            //size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/Herbalpic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Herbal
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center">
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                        <HStack p={2}>
                          <Image
                            //size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/HomeCarepic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Home Care
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

             
            </ScrollView>
          </HStack>
        </Center>

        <Center>
          <HStack space={5} w="100%" px="3" alignItems="center" >
            <ScrollView horizontal={true} persistentScrollbar={true}>
              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                    <Pressable onPress={() => navigation.navigate('ShopScreen')}>
              
                      <Center>
                        <HStack p={2}>
                          <Image
                           // size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/foodpic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                      </Pressable>
                    </Box>

                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Food and Nutrition
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center" p={1}>
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                        <HStack p={2}>
                          <Image
                            //size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/petcarepic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Pet Care
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

              <HStack alignItems="center">
                <Box alignItems="center">
                  <Box
                    h={130}
                    w={120}
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
                        <HStack p={2}>
                          <Image
                            //size={'sm'}
                            h={60}
                            w={60}
                            resizeMode="contain"
                            source={require('../../assets/labtestpic.jpg')}
                            alt="image"
                          />
                        </HStack>
                      </Center>
                    </Box>
                    <Box>
                      <Center>
                    <Stack p="2" space={3}>
                      <Stack space={2}>
                        <Text fontSize="12" ml="-1">
                          Lab Test
                        </Text>
                      </Stack>
                    </Stack>
                    </Center>
                    </Box>
                  </Box>
                </Box>
              </HStack>

             
            </ScrollView>
          </HStack>
        </Center>


        
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default ShopCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    margin: 3,
  },
});
