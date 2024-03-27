// import React from 'react';

// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import Home from './components/Home';
// import Meeting from './components/Meeting';

// const RootStack = createStackNavigator();

// const App = () => (
//     <NavigationContainer>
//       <RootStack.Navigator initialRouteName="Home">
//         <RootStack.Screen
//           component={Home}
//           name="Home"
//           options={{
//             headerShown: false,
//           }}
//         />
//         <RootStack.Screen
//           component={Meeting}
//           name="Meeting"
//           options={{
//             headerShown: false,
//           }}
//         />
//       </RootStack.Navigator>
//     </NavigationContainer>
// );

// export default App;




import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {HStack, Text, Icon, NativeBaseProvider, Image} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';
import DoctorListScreen from './src/DoctorListScreen';
import SignInScreen from './src/SignInScreen';
import SignUpScreen from './src/SignUpScreen';
import ProfileScreen from './src/ProfileScreen';
import CalendarScreen from './src/CalendarScreen';
import PatientDetailsScreen from './src/PatientDetailsScreen';
import PaymentScreen from './src/PaymentScreen';
import BookingDeliveryScreen from './src/BookingDeliveryScreen';
import BookingScreen from './src/BookingScreen';
import BookingPatientDetailsScreen from './src/BookingPatientDetailsScreen';
import PrimaryCareScreen from './src/PrimaryCareScreen';
import BookingDeliveryCalendarScreen from './src/BookingDeliveryCalendarScreen';
import NutrionScreen from './src/NutrionScreen';
import ChatScreen from './src/ChatScreen';
import LoginScreen from './src/loginScreen';
import EmergencyCall from './src/EmergencyCall';
import NutrionScreenDetails from './src/NutrionScreenDetails';
import Meeting from './src/Jitsi/Meeting';

function Header() {
  return (
    <>
      <HStack
        px="3"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <HStack alignItems="center">
          <Image
            size={'30px'}
            source={require('./src/assets/logo.png')}
            alt="image"
          />
          <Text
            color="black"
            fontSize="20"
            fontWeight="bold"
            paddingLeft={'10px'}>
            MaternityCare
          </Text>
        </HStack>
        <HStack>
          <Icon as={Ionicons} name="notifications" size="lg" color="black" />
          <Icon as={Ionicons} name="cart" size="lg" color="black" />
        </HStack>
      </HStack>
    </>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home1"
        component={HomeScreen}
        options={{
          headerTitle: props => <Header />,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="home" size="sm" color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="History1"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="archive" size="sm" color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="EmergencyCall1"
        component={EmergencyCall}
        options={{
          tabBarLabel: 'Emergency Call',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="call" size="sm" color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Map1"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="map" size="sm" color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="person" size="sm" color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
        <Stack.Screen
            name="loginScreen"
            options={{
              title: 'Create account',
            }}
            component={LoginScreen}
          />

          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="DoctorList" component={DoctorListScreen} />
          <Stack.Screen
            options={{headerShown: false}}
            name="SignInScreen"
            component={SignInScreen}
          />
          {/* <Stack.Screen
            name="SignUpScreen"
            options={{
              title: 'Create account',
            }}
            component={SignUpScreen}
          /> */}
             
          <Stack.Screen
            name="AppointmentScreen"
            options={{
              title: 'Appointment',
            }}
            component={CalendarScreen}
          />

          <Stack.Screen
            name="BookingDeliveryCalendarScreen"
            options={{
              title: 'Appointment',
            }}
            component={BookingDeliveryCalendarScreen}
          />

          <Stack.Screen
            name="PatientDetailsScreen"
            options={{
              title: 'Patient Details',
            }}
            component={PatientDetailsScreen}
          />
          <Stack.Screen
            name="PaymentScreen"
            options={{
              title: 'Payments',
            }}
            component={PaymentScreen}
          />
          <Stack.Screen
            name="BookingDeliveryScreen"
            options={{
              title: 'Booking Delivery',
            }}
            component={BookingDeliveryScreen}
          />
          <Stack.Screen
            name="BookingScreen"
            options={{
              title: 'Booking',
            }}
            component={BookingScreen}
          />
          <Stack.Screen
            name="BookingPatientDetailsScreen"
            options={{
              title: 'Booking',
            }}
            component={BookingPatientDetailsScreen}
          />

          <Stack.Screen
            name="NutrionScreen"
            options={{
              title: 'Article',
            }}
            component={NutrionScreen}
          />

<Stack.Screen
            name="MeetingScreen"
            options={{
              title: 'MeetingScreen',
            }}
            component={Meeting}
          />

          <Stack.Screen
            name="ChatScreen"
            options={{
              title: 'Chat',
            }}
            component={ChatScreen}
          />

          <Stack.Screen
            name="PrimaryCare"
            options={{
              title: 'Primary Care',
            }}
            component={PrimaryCareScreen}
          />


<Stack.Screen
            name="NutrionScreenDetails"
            options={{
              title: 'Article Details',
            }}
            component={NutrionScreenDetails}
          />




        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
