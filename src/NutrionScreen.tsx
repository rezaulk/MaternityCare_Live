import * as React from 'react';
import {ScrollView, View,Pressable} from 'react-native';

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

function NutrionScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        

        <Center p={4}>
        <Pressable onPress={() => navigation.navigate('NutrionScreenDetails')}>

          <Box alignItems="center">
            <Box
              // width="90%"
              // maxW="80"
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
              <Stack p="4" space={3}>
                <Stack space={2}>
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
                    Pregnant? Hangry?
                  </Text>

                  <Heading size="md" ml="-1">
                    13 super nutritious foods to eat when you're pregnant
                  </Heading>
                </Stack>
              </Stack>

              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  {/* nutrion1.jpg */}
                  <Image
                    height={'100%'}
                    resizeMode="cover"
                    source={require('./assets/nutrion1.jpg')}
                    alt="image"
                  />

                  {/* <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" /> */}
                </AspectRatio>
               
              </Box>
              <Stack p="4" space={3}>
                <Text fontWeight="400">
                  Bengaluru (also called Bangalore) is the center of India's
                  high-tech industry. The city is also known for its parks and
                  nightlife.
                </Text>
              </Stack>
            </Box>
          </Box>

          </Pressable>
        </Center>

        <Center p={4}>
          <Box alignItems="center">
            <Box
              // width="90%"
              // maxW="80"
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
              <Stack p="4" space={3}>
                <Stack space={2}>
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
                   Pregnant Mother exercising!
                  </Text>

                  <Heading size="md" ml="-1">
                  6 Tips For Exercising While
   Pregnant
                  </Heading>
                </Stack>
              </Stack>

              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  {/* nutrion1.jpg */}
                  <Image
                    height={'100%'}
                    resizeMode="cover"
                    source={require('./assets/nutrion2.jpeg')}
                    alt="image"
                  />

                  {/* <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" /> */}
                </AspectRatio>
               
              </Box>
              <Stack p="4" space={3}>
                <Text fontWeight="400">
                  Bengaluru (also called Bangalore) is the center of India's
                  high-tech industry. The city is also known for its parks and
                  nightlife.
                </Text>
              </Stack>
            </Box>
          </Box>
        </Center>

        
      </ScrollView>
    </View>
  );
}

export default NutrionScreen;
