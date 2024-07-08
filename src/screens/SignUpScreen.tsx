import * as React from 'react';
import {Alert, ScrollView, View} from 'react-native';

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
  Link,
  FormControl,
  Input,
  Checkbox,
  Select,
  CheckIcon,
} from 'native-base';
import {API_URL} from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@userName', value)
  } catch (e) {
    // saving error
  }
}


function SignUpScreen({navigation}: {navigation: any}) {
  const [service, setService] = React.useState('');

  const [formData, setData] = React.useState({});

  const onSubmit = async () => {

    setData({...formData, Gender: service})

    console.log(API_URL);
    debugger;
    console.log(formData);

    const params = JSON.stringify({

      Gender: service,
      Mobile: formData.Mobile,
      Passowrd: formData.Passowrd,
      NickName: formData.NickName,
      
      });

    //  const response = await axios.post(`https://apimaternitycare.rezaulk.com/api/Login/Registration`,params,{
    //   "headers": {
    //   "content-type": "application/json",
    //   }});

    const formData1 = new FormData();

    formData1.append("Gender", service);
    formData1.append("Mobile", formData.Mobile);
    formData1.append("Passowrd", formData.Passowrd);
    formData1.append("NickName", formData.NickName);
    formData1.append("DateOfBirth", formData.DateOfBirth);
    formData1.append("FullName", formData.FullName);
    formData1.append("Email", formData.Email);


      axios.post('https://apimaternitycare.rezaulk.com/api/Login/Registration',formData1)
      .then(async function (response) {
        debugger;

        storeData(response.data.data.fullName);
        navigation.navigate('SignInScreen');
        console.log(response);
      })
      .catch(function (error) {
        debugger;

        console.log(error);
      });



    //const response = await axios.get(`https://apimaternitycare.rezaulk.com/api/Login/login`);


    
    debugger;
    
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <VStack space={3} mt="2">
              <FormControl>
                <FormControl.Label>Full Name</FormControl.Label>
                <Input
                  onChangeText={value => setData({...formData, FullName: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Nick name</FormControl.Label>
                <Input
                  onChangeText={value =>
                    setData({...formData, NickName: value})
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Gender</FormControl.Label>
                <Select
                  selectedValue={service}
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Choose Service"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={itemValue => setService(itemValue)}>
                  <Select.Item label="Male" value="1" />
                  <Select.Item label="Female" value="2" />
                </Select>
              </FormControl>
              <FormControl>
                <FormControl.Label>Date of Birth</FormControl.Label>
                <Input
                  onChangeText={value => setData({...formData, DateOfBirth: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Mobile</FormControl.Label>
                <Input
                  onChangeText={value => setData({...formData, Mobile: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  onChangeText={value => setData({...formData, Email: value})}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Passowrd</FormControl.Label>
                <Input
                  type="password"
                  onChangeText={value =>
                    setData({...formData, Passowrd: value})
                  }
                />
              </FormControl>
              <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                Submit
              </Button>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </View>
  );
}

export default SignUpScreen;
