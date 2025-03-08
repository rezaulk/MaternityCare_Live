import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {HStack, Text, Icon, NativeBaseProvider, Image, Pressable, Avatar} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import DoctorListScreen from './src/screens/DoctorListScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import PatientDetailsScreen from './src/screens/PatientDetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import BookingDeliveryScreen from './src/screens/BookingDeliveryScreen';
import BookingScreen from './src/screens/BookingScreen';
import BookingPatientDetailsScreen from './src/screens/BookingPatientDetailsScreen';
import PrimaryCareScreen from './src/screens/PrimaryCareScreen';
import BookingDeliveryCalendarScreen from './src/screens/BookingDeliveryCalendarScreen';
import NutrionScreen from './src/screens/NutrionScreen';
import ChatScreen from './src/screens/ChatScreen';
import LoginScreen from './src/screens/loginScreen';
import EmergencyCall from './src/screens/EmergencyCall';
import NutrionScreenDetails from './src/screens/NutrionScreenDetails';
import InitalScreen from './src/screens/InitalScreen';

import Meeting from './src/Jitsi/Meeting';
import MapScreen from './src/screens/MapScreen';
import AppointmentDetailsScreen from './src/screens/AppointmentDetailsScreen';
import ShopScreen from './src/screens/medicine/ShopScreen';
import ShoppingCart from './src/screens/medicine/ShoppingCart';
import CheckoutScreen from './src/screens/medicine/CheckoutScreen';
import OrderScreen from './src/screens/medicine/OrderScreen';
import OrderDetails from './src/screens/medicine/OrderDetails';
import ShopCategoryScreen from './src/screens/medicine/ShopCategoryScreen';




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
            <Image
            // size={'100px'}
            width={180}
            height={80}
            source={require('./src/assets/maternity_logo.png')}
            alt="image"
            resizeMode="contain"
          />
          {/* <Text
            color="black"
            fontSize="20"
            fontWeight="bold"
            paddingLeft={'10px'}>
            MaternityCare
          </Text> */}
        </HStack>
        <HStack>
          <Icon as={Ionicons} name="notifications" size="lg" color="black" />
          <Icon as={Ionicons} name="cart" size="lg" color="black" />
        </HStack>
      </HStack>
    </>
  );
}

// const ShoppingCart = ({navigation}: {navigation: any}) => {
  function MedicineHeader({navigation}: {navigation: any}) {

// function MedicineHeader= ({navigation}: {navigation: any}) => {
  return (
    <>
      <HStack
        px="3"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <HStack alignItems="center">
          {/* <Image
            size={'30px'}
            source={require('./src/assets/logo.png')}
            alt="image"
          />
            <Image
            // size={'100px'}
            width={180}
            height={80}
            source={require('./src/assets/maternity_logo.png')}
            alt="image"
            resizeMode="contain"
          /> */}
          <Text
            color="black"
            fontSize="20"
            fontWeight="bold"
            paddingLeft={'10px'}>
            Medicine Care
          </Text>
        </HStack>
        <HStack>
        <Pressable onPress={() => navigation.navigate('OrderScreen')}>

        {/* <Avatar
                    size="40px"
                    source={require('./src/assets/checkout.png')}
                    // source={{
                    //   uri: item.brand_name,
                    // }}
                  /> */}
{/* <ion-icon name="checkbox-outline"></ion-icon> */}
{/* <ion-icon name="shield-checkmark-outline"></ion-icon> */}
{/* <ion-icon name="bag-check-outline"></ion-icon>1674086295 */}
<Icon as={Ionicons} name="bag-check-outline" size="lg" color="black" />
</Pressable>

          {/* <Icon as={Ionicons} name="notifications" size="lg" color="black" /> */}
          <Pressable onPress={() => navigation.navigate('ShoppingCart')}>

          {/* <Avatar
                    size="40px"
                    source={require('./src/assets/shopping-cart.png')}
                    // source={{
                    //   uri: item.brand_name,
                    // }}
                  /> */}
{/* <ion-icon name="bag-check-outline"></ion-icon> */}
               <Icon as={Ionicons} name="cart" size="lg" color="black" />
          </Pressable>
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
            <Icon as={Ionicons} name="home" 
            size={'lg'}
           //  h={34} w={34} 
               color="black" />
          ),
        }}
      />



      <Tab.Screen
        name="Appoinment"
        component={AppointmentScreen}
        options={{
          // headerShown: false,
          tabBarLabel: 'Appoinment',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="clipboard" 
            size={'lg'}
            
          //  h={34} w={34}
             color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="EmergencyCall1"
        component={EmergencyCall}
        options={{
          tabBarLabel: 'Emergency',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="call" size="lg" color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Map1"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="map" size="lg" color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon as={Ionicons} name="person" size="lg" color="black" />
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
         
            name="InitalScreen"
            options={{
              headerShown: false
            }}
            component={InitalScreen}
          />

<Stack.Screen
            name="loginScreen"
            options={{
              title: 'Create account',
              headerShown: false
              
            }}
             
            component={LoginScreen}
          />
<Stack.Screen
            name="MapScreen"
            options={{
              title: 'Create account',
            }}
            component={MapScreen}
          />


<Stack.Screen
            name="ShopScreen"
            options={({ navigation }) => ({
              title: 'Medicine',
              headerTitle: props => <MedicineHeader navigation={navigation}/>,
            })}
            component={ShopScreen}
          />


<Stack.Screen
            name="ShopCategoryScreen"
            options={({ navigation }) => ({
              title: 'Medicine',
              headerTitle: props => <MedicineHeader navigation={navigation}/>,
            })}
            component={ShopCategoryScreen}
          />


<Stack.Screen
            name="OrderDetails"
            options={({ navigation }) => ({
              title: 'OrderDetails',
              // headerTitle: props => <MedicineHeader navigation={navigation}/>,
            })}
            component={OrderDetails}
          />


<Stack.Screen
            name="OrderScreen"
            options={({ navigation }) => ({
              title: 'Orders',
              // headerTitle: props => <MedicineHeader navigation={navigation}/>,
            })}
            component={OrderScreen}
          />

<Stack.Screen
            name="ShoppingCart"
            options={{
              title: 'Shopping Cart',
            }}
            component={ShoppingCart}
          />

<Stack.Screen
            name="CheckoutScreen"
            options={{
              title: 'CheckOut',
            }}
            component={CheckoutScreen}
          />






          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{headerShown: false}}
            
            
          />
          <Stack.Screen
           options={{
            title: 'Specialist Doctor',
          }}
          

          name="DoctorList" component={DoctorListScreen} />
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

<Stack.Screen
            name="AppointmentDetails"
            options={{
              title: 'Consulting With Doctor',
            }}
            component={AppointmentDetailsScreen}
          />

{/* <Stack.Screen
            name="ShopScreen"
            options={{
              title: 'Medicine',
            }}
            component={ShopScreen}
          />
 */}



        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
