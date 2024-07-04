import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Box,
  Button,
  Center,
  CheckIcon,
  FlatList,
  FormControl,
  HStack,
  Heading,
  Input,
  Modal,
  NativeBaseProvider,
  Select,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ShoppingCart = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(true);
  const [valueUpdating, setvalueUpdating] = useState(false);
  const [subtotal, setsubtotal] = React.useState(0);
  const [discountApply, setdiscountApply] = React.useState(0);
  const [roundingoff, setroundingoff] = React.useState(0);
  const [amountPayable, setamountPayable] = React.useState(0);
  const [address, setAddress] = React.useState<Address>();
  const [medicinelist, setmedicinelist] = React.useState<Medicine[]>([]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const fetchCSVData = async () => {
    setLoading(true);
    let shippingAddress = await getData("@shippingAddress");
    if (shippingAddress == null) {
    } else {
      let _address: Address = JSON.parse(shippingAddress);
      setAddress(_address);
    }

    let medicine_list = await getData("@shoppingcart");
    if (medicine_list == null) {
    } else {
      let _medicine: Medicine[] = JSON.parse(medicine_list);
      setmedicinelist(_medicine);
      setvalueUpdating(!valueUpdating);
    }
    setLoading(false);
    console.log(medicinelist);
  };

  useEffect(() => {
    fetchCSVData();
  }, []);

  useEffect(() => {
    setsubtotal(0);
    var subtotalPrice = 0;
    medicinelist.forEach((element) => {
      subtotalPrice =
        subtotalPrice + Number(element.select_quantity) * element.price;
    });
    setsubtotal(Number(subtotalPrice.toFixed(2)));

    var _discountApply =  Number(subtotalPrice * 0.05).toFixed(2);
    setdiscountApply(_discountApply);

    var roundingoff =   Number(subtotalPrice - discountApply - Math.floor(subtotalPrice - discountApply)).toFixed(2);
    setroundingoff(roundingoff);

    setamountPayable((amountPayable: Number) =>
      Math.floor(subtotalPrice - discountApply)
    );

    
  }, [valueUpdating]);

  const handleSelectQuantity = async (itemId, quantity) => {
    setmedicinelist((prevData) =>
      medicinelist.map((item) =>
        item.id === itemId ? { ...item, select_quantity: quantity } : item
      )
    );

    await storeData("@shoppingcart", JSON.stringify(medicinelist));

    setvalueUpdating(!valueUpdating);
  };

  const storeData = async (storageName: string, value: string) => {
    try {
      await AsyncStorage.setItem(storageName, value);
    } catch (e) {
      // saving error
    }
  };

  const ResetCart = async (storageName: string) => {
    try {
      await AsyncStorage.removeItem(storageName);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (storageName: string) => {
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

  const onSubmit = async () => {
    const _address: Address = {
      id: "",
      Address: address.address,
      Username: address.name,
      Phonenumber: address.phoneNumber,
    };

    await storeData("@shippingAddress", JSON.stringify(_address));

    setModalVisible(false);
  };


  const ProceedToCheckout = async () => {
    const _address: Orders = {
      medicines: medicinelist,
      address: address?? null,
      amountPayable: amountPayable,
      createdAt: "",
      status: ""
    } ;

    await storeData("@CurrentOrder", JSON.stringify(_address));

    navigation.navigate("CheckoutScreen");
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
          <FlatList
            data={medicinelist}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                borderWidth={1}
                // width={'90%'}
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="2"
                paddingLeft={5}
                paddingRight={5}
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={require("../src/assets/capsules.png")}
                  />
                  <VStack width={"40%"}>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.brand_name}
                    </Text>

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.strength}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.manufacturer}
                    </Text>
                  </VStack>

                  <Spacer />

                  <VStack width={"40%"}>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {/* {item.brand_name} */}
                    </Text>

                    <Box
                      textAlign={"right"}
                      alignSelf="right"
                      // borderWidth={1}
                      // width={'100%'}
                      // bg="primary.500"
                      _text={{
                        fontSize: "md",
                        fontWeight: "medium",
                        // color: "warmGray.50",
                        letterSpacing: "lg",
                      }}
                      // bg={["red.400", "blue.400"]}
                    >
                      <Select
                        selectedValue={item.select_quantity}
                        minWidth="90px"
                        height="8"
                        accessibilityLabel="Choose Service"
                        placeholder="Choose Service"
                        _selectedItem={{
                          bg: "teal.300",

                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) =>
                          handleSelectQuantity(item.id, itemValue)
                        }
                      >
                        <Select.Item label="1 Qty" value="1" />
                        <Select.Item label="2 Qty" value="2" />
                        <Select.Item label="3 Qty" value="3" />
                        <Select.Item label="4 Qty" value="4" />
                        <Select.Item label="5 Qty" value="5" />
                      </Select>
                    </Box>

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      textAlign={"right"}
                    >
                      {/* X {item.price} ={" "} */}
                      {Number(
                        item.price * parseInt(item.select_quantity)
                      ).toFixed(2)}
                    </Text>
                  </VStack>

                  <Spacer />
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.brand_id}
          />

          <Modal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
          >
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Add Shipping Address</Modal.Header>
              <Modal.Body>
                <FormControl isRequired>
                  <FormControl.Label>Full Name</FormControl.Label>
                  <Input
                    value={address?.Username}
                    onChangeText={(value) =>
                      setAddress({ ...address, Username: value })
                    }
                  />
                </FormControl>
                <FormControl mt="3" isRequired>
                  <FormControl.Label>Phone Number</FormControl.Label>
                  <Input
                    value={address?.Phonenumber}
                    onChangeText={(value) =>
                      setAddress({ ...address, Phonenumber: value })
                    }
                  />
                </FormControl>
                <FormControl mt="3" isRequired>
                  <FormControl.Label>Address</FormControl.Label>
                  <Input
                    value={address?.Address}
                    onChangeText={(value) =>
                      setAddress({ ...address, Address: value })
                    }
                  />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onPress={onSubmit}>Save Address</Button>
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

                {address != null ? (
                  <Button
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    Edit
                  </Button>
                ) : null}
              </HStack>

              {address == null ? (
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
                </HStack>
              ) : null}

              {address == null ? (
                <HStack space={[2, 3]} justifyContent="space-between">
                  <VStack justifyContent="center" alignItems="center">
                    <HStack
                      space="4"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        Open Modal
                      </Button>
                    </HStack>
                  </VStack>
                  <Spacer />
                </HStack>
              ) : (
                <HStack space={[2, 3]} justifyContent="space-between">
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      //bold
                    >
                      {address && address.Username}
                    </Text>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      // bold
                    >
                      {address && address.Phonenumber}
                    </Text>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      //bold
                    >
                      {address && address.Address}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              )}
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
                    SubTotal (MRP)
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
                  {subtotal}
                </Text>
              </HStack>

              <HStack space={[2, 3]} justifyContent="space-between">
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    Discount Applied (5%)
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
                  {discountApply}
                </Text>
              </HStack>

              <HStack space={[2, 3]} justifyContent="space-between">
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    Rounding Off
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
                  {roundingoff}
                </Text>
              </HStack>

              <HStack space={[2, 3]} justifyContent="space-between">
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    Amount Payable
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
                <Avatar
                  size="20px"
                  source={require("../src/assets/shoppingCart.jpg")}
                  // source={{
                  //   uri: item.brand_name,
                  // }}
                />

                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {medicinelist.length} Items
                  </Text>

                  <Text>{amountPayable}</Text>
                </VStack>

                <Spacer />

                <Button onPress={() => ProceedToCheckout()  }>
                  Proceed to checkout
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

export default ShoppingCart;

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
