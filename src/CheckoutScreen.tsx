import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Modal,
  NativeBaseProvider,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = () => {
  const [loading, setLoading] = useState(true);

  const [subtotal, setsubtotal] = React.useState(0);
  const [discountApply, setdiscountApply] = React.useState(0);
  const [roundingoff, setroundingoff] = React.useState(0);
  const [amountPayable, setamountPayable] = React.useState(0);

  const [formData, setFormData] = React.useState(null);
  const [address, setAddress] = React.useState<Address>();

  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);



  const [text, setText] = React.useState("");
 
  useEffect(() => {
    fetchCSVData();

  }, []);

  const fetchCSVData = async () => {
    setLoading(false);

    
    let shippingAddress = await getData("@shippingAddress");
    if (shippingAddress == null) {
    } else {
      debugger;
      let _address: Address = JSON.parse(shippingAddress);

      // setmedicinelist(_medicine);
      setAddress(_address);

      
    }
  }

  useEffect(() => {}, []);

 
  const storeData = async (storageName: string, value: string) => {
    try {
      await AsyncStorage.setItem(storageName, value);
    } catch (e) {
      // saving error
    }
  };

  const ResetCart = async (storageName:string) => {
    try {
      await AsyncStorage.removeItem(storageName);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (storageName:string) => {
    try {
      const value = await AsyncStorage.getItem(storageName);
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
 
  const onSubmit = () => {

    console.log(formData.name);
    setModalVisible(false);
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
          

        

         <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Shipping Address</Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <FormControl.Label>Full Name</FormControl.Label>
              <Input   onChangeText={value => setFormData({ ...formData,
        name: value
      })} />
            </FormControl>
            <FormControl mt="3" isRequired>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input onChangeText={value => setFormData({ ...formData,
        phoneNumber: value
      })} />
            </FormControl>
            <FormControl mt="3" isRequired>
              <FormControl.Label>Address</FormControl.Label>
              <Input onChangeText={value => setFormData({ ...formData,
        address: value
      })}/>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false);
            }}>
                Cancel
              </Button>
              <Button onPress={onSubmit}>
                Save Address
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      

          <Box alignItems="center" p={1}>
            <Box
              borderBottomWidth="2"
              width={"95%"}
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 2,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
              // borderColor="muted.800"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              pl={["0", "4"]}
              pr={["0", "5"]}
              py="2"
              paddingLeft={5}
              paddingRight={5}
              //  p={12}
            >
              <HStack space={[2, 3]} justifyContent="space-between">
               
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                   Address Shipping
                  </Text>
                </VStack>
                <Spacer />
                
                {
  address != null ?
                <Button 
                onPress={() => {
         setModalVisible(!modalVisible);
      }}
      >
          Edit
        </Button>

: null
}

              </HStack>

{
  address== null ?
  <HStack space={[2, 3]} justifyContent="space-between">
              
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                   You haven't set address
                </Text>
              </VStack>
              <Spacer />
             
            </HStack> : null
}
            
{
  address == null ?
              <HStack space={[2, 3]} justifyContent="space-between">
                
                <VStack justifyContent="center" alignItems="center">
               
                <HStack space="4" justifyContent="center" alignItems="center">
        <Button onPress={() => {
        setModalVisible(!modalVisible);
      }}>
          Open Modal
        </Button>
          
      </HStack>  


                </VStack>
                <Spacer />
                
              </HStack>
:   <HStack space={[2, 3]} justifyContent="space-between">
              
<VStack>
  <Text
    _dark={{
      color: "warmGray.50",
    }}
    color="coolGray.800"
    bold
  >
     {address && address.Username}
  </Text>
  <Text
    _dark={{
      color: "warmGray.50",
    }}
    color="coolGray.800"
    bold
  >
     {address && address.Phonenumber}
  </Text>
  <Text
    _dark={{
      color: "warmGray.50",
    }}
    color="coolGray.800"
    bold
  >
     {address && address.Address}
  </Text>
</VStack>
<Spacer />

</HStack>
}
            

            
            </Box>
 
          </Box>

          <Box alignItems="center" p={1}>
            <Box
              borderBottomWidth="2"
              width={"95%"}
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 2,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
              // borderColor="muted.800"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              pl={["0", "4"]}
              pr={["0", "5"]}
              py="2"
              paddingLeft={5}
              paddingRight={5}
              //  p={12}
            >
             

              <HStack space={[2, 3]} justifyContent="space-between">
                
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    Amount to be paid
                  </Text>
                </VStack>
                <Spacer />
                <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {amountPayable}
                </Text>
              </HStack>
            </Box>
 
          </Box>


        

          <Box alignItems="center" p={1}>
            <Box
              borderBottomWidth="2"
              width={"95%"}
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 2,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
              // borderColor="muted.800"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              pl={["0", "4"]}
              pr={["0", "5"]}
              py="2"
              paddingLeft={5}
              paddingRight={5}
              //  p={12}
            >
              <HStack space={[2, 3]} justifyContent="space-between">
               
                <VStack>
                <Avatar
                    size="12px"
                    source={require("../src/assets/capsules.png")}
                    // source={{
                    //   uri: item.brand_name,
                    // }}
                  />

                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                   Items
                  </Text>
                </VStack>
                <Spacer />

                <Button onPress={() => {
        // setModalVisible(!modalVisible);
      }}
      >
          Place Order
        </Button>

                {/* <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                   Proceed to checkout
                </Text> */}
              </HStack>

             
            </Box>
 
          </Box>
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default CheckoutScreen;

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
