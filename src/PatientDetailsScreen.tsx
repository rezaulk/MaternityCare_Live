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
  Link,
  FormControl,
  Input,
  Checkbox,
  Select,
  CheckIcon,
  TextArea,
} from 'native-base';


function PatientDetailsScreen({navigation}: {navigation: any}) {

  const [service, setService] = React.useState("");

  const [formData, setData] = React.useState({});
  
  const onSubmit = () => {
     console.log(formData);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <VStack space={3} mt="2">
              <FormControl>
                <FormControl.Label>Full Name</FormControl.Label>
                <Input onChangeText={value => setData({ ...formData,
        name: value
      })}/>
              </FormControl>
               
              <FormControl>
                <FormControl.Label>Gender</FormControl.Label>
                <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="Male" value="1" />
          <Select.Item label="Female" value="2" />
        </Select>
              </FormControl>
              <FormControl>
                <FormControl.Label>Age</FormControl.Label>
                <Input  />
              </FormControl>
              <FormControl>
                <FormControl.Label>Write Your Problem</FormControl.Label>
                <TextArea h={20}  w="100%" maxW="300" />
              </FormControl>
             
              <Button onPress={() => navigation.navigate("PaymentScreen")}  mt="2" colorScheme="indigo">
                Next
              </Button>
             
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </View>
  );
}

export default PatientDetailsScreen;
