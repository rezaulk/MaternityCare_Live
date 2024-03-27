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
  Radio,
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';

function PaymentScreen({navigation}: {navigation: any}) {

  const [service, setService] = React.useState("");

  const [formData, setData] = React.useState({});
  
  const onSubmit = () => {
     console.log(formData);
  };

  const [value, setValue] = React.useState("one");

  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false} persistentScrollbar={false}>
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <VStack space={3} mt="2">
              
            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
    setValue(nextValue);
  }}>
      <Radio value="one" my={1}>
      <Image
                  size={'lg'}
                  resizeMode="contain"
                  source={require('./assets/bkash.png')}
                  alt="image"
                />
      </Radio>
      <Radio value="two" my={1}>
      <Image
                  size={'lg'}
                  resizeMode="contain"

                  source={require('./assets/nagad.png')}
                  alt="image"
                />
      </Radio>
      <Radio value="two" my={1}>
      <Image
                  size={'lg'}
                  resizeMode="contain"
                  source={require('./assets/rocket.png')}
                  alt="image"
                />
      </Radio>
      <Radio value="two" my={1}>
      <Image
                  size={'lg'}
                  resizeMode="contain"
                  source={require('./assets/creditcard.png')}
                  alt="image"
                />
      </Radio>
    </Radio.Group>
    
              <Button onPress={() => navigation.navigate("Home")} mt="2" colorScheme="indigo">
                Submit
              </Button>
             
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </View>
  );
}

export default PaymentScreen;
