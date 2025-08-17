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


  const ServiceCard = ({ title, subtitle, image, onPress }) => (
  <Pressable onPress={onPress}>
    <Box
      rounded="lg"
      overflow="hidden"
      borderWidth={1}
      borderColor="coolGray.200"
      _dark={{ borderColor: 'coolGray.600', backgroundColor: 'gray.700' }}
      _web={{ shadow: 2, borderWidth: 0 }}
      _light={{ backgroundColor: 'gray.50' }}
      w="100%"
      alignItems="center"
    >
      <HStack h={12} backgroundColor="#FD9999">
        <Center w="30%">
          <Image
            height={36}
            width={40}
            resizeMode="contain"
            source={image}
            alt="image"
          />
        </Center>
        <Center w="70%">
          <Text fontSize="14" textAlign="center">
            {title}
          </Text>
        </Center>
      </HStack>
      <Stack space={2} alignItems="center" p="2">
        <Text fontSize="14" textAlign="center">
          {subtitle}
        </Text>
      </Stack>
    </Box>
  </Pressable>
);


const services = [
  {
    title: 'Pediatrician',
    image: require('../assets/Pediatriction.jpg'),
    navigateTo: 'DoctorList',
  },
  {
    title: 'Medicine',
    image: require('../assets/Medicine.png'),
    navigateTo: 'ShopCategoryScreen',

  },
  {
    title: 'Pediatric heart disease',
    image: require('../assets/Heart.png'),
  },
  {
    title: 'Gynecology',
    image: require('../assets/Gyconologist.png'),
  },
];

const otherservices = [
  {
    title: 'Shop',
    image: require('../assets/shop.jpg'),
    navigateTo: 'ShopScreen',

  },
  {
    title: 'Blood',
    image: require('../assets/blood.jpg'),
  },
  {
    title: 'Laboratory Test',
    image: require('../assets/LaboratoryTest.png'),
  },
  {
    title: 'Health concern Article & video',
    image: require('../assets/article.jpg'),
  },
];


const ServiceCardDoctor = ({ title, image, onPress }) => (
  <Pressable onPress={onPress}>
    <Box
      h={130}
      w={110}
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
      }}
      mx={1} // spacing between cards
    >
      <Center>
        <HStack p={2}>
          <Image
            source={image}
            style={{ width: 60, height: 60, resizeMode: 'contain' }}
            alt="service"
          />
        </HStack>
      </Center>
      <Center>
        <Stack p="2" space={3}>
          <Stack space={2}>
            <Text fontSize="12" ml="-1" textAlign="center">
              {title}
            </Text>
          </Stack>
        </Stack>
      </Center>
    </Box>
  </Pressable>
);




  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        <Heading size="md" pt={2} paddingLeft={5} paddingBottom={2}>
          Pregnant Mother Care {userName}
        </Heading>

       <Center flex={1}>
    <HStack space={5} justifyContent="center" mb="5">
      <Center w="45%">
        <ServiceCard
          title="Primary Care"
          subtitle="Talk to Nurse online 24 hours"
          image={require('../assets/PrimaryCare.jpg')}
          onPress={() => navigation.navigate('PrimaryCare')}
        />
      </Center>
      <Center w="45%">
        <ServiceCard
          title="Consult with a Specialist"
          subtitle="Consult with best Gynecologist"
          image={require('../assets/Gyconologist.png')}
          onPress={() => navigation.navigate('DoctorList')}
        />
      </Center>
    </HStack>

    <HStack space={5} justifyContent="center">
      <Center w="45%">
        <ServiceCard
          title="Nutrition & Fitness"
          subtitle="Pregnancy time food, diet"
          image={require('../assets/Nutrition.jpg')}
          onPress={() => navigation.navigate('NutrionScreen')}
        />
      </Center>
      <Center w="45%">
        <ServiceCard
          title="Clinic Appointments"
          subtitle="Booking clinic for delivery"
          image={require('../assets/Clinic.jpg')}
          onPress={() => navigation.navigate('BookingDeliveryScreen')}
        />
      </Center>
    </HStack>
  </Center>

        <Heading size="md" pt={2} paddingLeft={5} paddingBottom={0}>
          Specialist Doctor
        </Heading>

      <Center>
      <HStack w="100%" px="3" alignItems="center">
        <ScrollView horizontal persistentScrollbar showsHorizontalScrollIndicator={false}>
          <HStack alignItems="center" py={1}>
            {services.map((service, index) => (
              <ServiceCardDoctor
                key={index}
                title={service.title}
                image={service.image}
                onPress={
                  service.navigateTo
                    ? () => navigation.navigate(service.navigateTo)
                    : undefined
                }
              />
            ))}
          </HStack>
        </ScrollView>
      </HStack>
    </Center>
        <Heading size="md" pt={2} paddingLeft={5} paddingBottom={0}>
          Other Services
        </Heading>

    <Center>
      <HStack w="100%" px="3" alignItems="center">
        <ScrollView horizontal persistentScrollbar showsHorizontalScrollIndicator={false}>
          <HStack alignItems="center" py={1}>
            {otherservices.map((service, index) => (
              <ServiceCardDoctor
                key={index}
                title={service.title}
                image={service.image}
                onPress={
                  service.navigateTo
                    ? () => navigation.navigate(service.navigateTo)
                    : undefined
                }
              />
            ))}
          </HStack>
        </ScrollView>
      </HStack>
    </Center>


      </ScrollView>
    </View>
  );
}

export default HomeScreen;
