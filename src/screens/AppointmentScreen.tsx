 
import { useNavigation } from "@react-navigation/native";
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
} from "native-base";
// import { Box, Button, Center, HStack, Text } from 'native-base';
import * as React from "react";
import { useState } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

 
const FirstRoute  = () => {

  const navigation = useNavigation();
  
  return (
  <View style={{ flex: 1 }}>
    <Center pb={2}>
      <Box
        width="90%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
          <Pressable onPress={() => navigation.navigate('AppointmentDetails')}>

       
        <HStack>
          <Center w="30%">
            <Image
              rounded={50}
              size={"lg"}
              source={require("../assets/Doctor2.png")}
              alt="image"
            />
          </Center>

          <Center w="70%">
            <VStack w="100%">
              <Text
                fontWeight={"extrabold"}
                fontSize="16"
                ml="-1"
                paddingLeft={5}
              >
                Dr Tarafdar Runa Laila
              </Text>
              <Text fontWeight={"bold"} fontSize="12" ml="-1" paddingLeft={5}>
               24 Years
              </Text>
            </VStack>
          </Center>
        </HStack>

        </Pressable>
        
        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "row",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button size="sm">Confirm</Button>
          <Button size="sm" colorScheme="secondary">
            Reschedule
          </Button>
          <Button size="sm">
            Cancel
          </Button>
        </Stack>


      </Box>
      <Box
        width="90%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <HStack>
          <Center w="30%">
            <Image
              rounded={50}
              size={"lg"}
              source={require("../assets/Doctor1.png")}
              alt="image"
            />
          </Center>

          <Center w="70%">
            <VStack w="100%">
              <Text
                fontWeight={"extrabold"}
                fontSize="16"
                ml="-1"
                paddingLeft={5}
              >
                Dr Tarafdar Runa Laila
              </Text>
              <Text fontWeight={"bold"} fontSize="12" ml="-1" paddingLeft={5}>
              24 Years
              </Text>
            </VStack>
          </Center>
        </HStack>

        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "row",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button size="sm">Confirm</Button>
          <Button size="sm" colorScheme="secondary">
            Reschedule
          </Button>
          <Button size="sm">
            Cancel
          </Button>
        </Stack>


      </Box>


     
     
    </Center>
  </View>
);
};

const SecondRoute = () => (
  <View style={{ flex: 1 }}>
    <Center pb={2}>
      <Box
        width="90%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <HStack>
          <Center w="30%">
            <Image
              rounded={50}
              size={"lg"}
              source={require("../assets/Doctor2.png")}
              alt="image"
            />
          </Center>

          <Center w="70%">
            <VStack w="100%">
              <Text
                fontWeight={"extrabold"}
                fontSize="16"
                ml="-1"
                paddingLeft={5}
              >
                Dr Tarafdar Runa Laila
              </Text>
              <Text fontWeight={"bold"} fontSize="12" ml="-1" paddingLeft={5}>
               24 Years
              </Text>
            </VStack>
          </Center>
        </HStack>

        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "row",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button size="sm">Confirm</Button>
          <Button size="sm" colorScheme="secondary">
            Reschedule
          </Button>
          <Button size="sm">
            Cancel
          </Button>
        </Stack>


      </Box>
     
     
     
    </Center>
  </View>
);

const ThirdRoute = ({navigation}: {navigation: any}) => (
  <View style={{ flex: 1 }}>
    <Center pb={2}>
    
      <Box
        width="90%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <HStack>
          <Center w="30%">
            <Image
              rounded={50}
              size={"lg"}
              source={require("../assets/Doctor1.png")}
              alt="image"
            />
          </Center>

          <Center w="70%">
            <VStack w="100%">
              <Text
                fontWeight={"extrabold"}
                fontSize="16"
                ml="-1"
                paddingLeft={5}
              >
                Dr Tarafdar Runa Laila
              </Text>
              <Text fontWeight={"bold"} fontSize="12" ml="-1" paddingLeft={5}>
              24 Years
              </Text>
            </VStack>
          </Center>
        </HStack>

        <Stack
          mb="2.5"
          mt="1.5"
          direction={{
            base: "row",
            md: "row",
          }}
          space={2}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button size="sm">Confirm</Button>
          <Button size="sm" colorScheme="secondary">
            Reschedule
          </Button>
          <Button size="sm">
            Cancel
          </Button>
        </Stack>


      </Box>


     
     
    </Center>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute
});

export default function AppointmentScreen({navigation}: {navigation: any}) {
  const layout = useWindowDimensions();

  // const navigation = useNavigation();


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Upcoming" },
    { key: "second", title: "Completed" },
    { key: "third", title: "Cancelled" },
  ]);

  return (
    <TabView
      
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

// import * as React from 'react';
// import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import { NativeBaseProvider, Box, Text, Center, useColorModeValue } from 'native-base';

// const FirstRoute = () => <Center flex={1} my="4">
//     This is Tab 1
//   </Center>;

// const SecondRoute = () => <Center flex={1} my="4">
//     This is Tab 2
//   </Center>;

// const ThirdRoute = () => <Center flex={1} my="4">
//     This is Tab 3
//   </Center>;

// const FourthRoute = () => <Center flex={1} my="4">
//     This is Tab 4{' '}
//   </Center>;

// const initialLayout = {
//   width: Dimensions.get('window').width
// };
// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
//   third: ThirdRoute,
//   fourth: FourthRoute
// });

// function AppointmentScreen() {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([{
//     key: 'first',
//     title: 'Tab 1'
//   }, {
//     key: 'second',
//     title: 'Tab 2'
//   }, {
//     key: 'third',
//     title: 'Tab 3'
//   }, {
//     key: 'fourth',
//     title: 'Tab 4'
//   }]);

//   const renderTabBar = (props: { navigationState: { routes: any[]; }; position: { interpolate: (arg0: { inputRange: any; outputRange: any; }) => any; }; }) => {
//     const inputRange = props.navigationState.routes.map((x, i) => i);
//     return <Box flexDirection="row">

// <Animated.Text
//             >adssd </Animated.Text>
//         {props.navigationState.routes.map((route, i) => {
//         const opacity = props.position.interpolate({
//           inputRange,
//           outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
//         });
//         const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
//         const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
//         return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
//               <Pressable onPress={() => {
//             console.log(i);
//             setIndex(i);
//           }}>
//                 <Animated.Text style={{
//               color
//             }}>{route.title}</Animated.Text>
//               </Pressable>
//             </Box>;
//       })}
//       </Box>;
//   };

//   return <TabView navigationState={{
//     index,
//     routes
//   }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
//     marginTop: StatusBar.currentHeight
//   }} />;
// }

//     export default () => {
//         return (
//           <NativeBaseProvider>
//             <Center flex={1} px="3">
//                 <AppointmentScreen />
//             </Center>
//           </NativeBaseProvider>
//         );
//     };
