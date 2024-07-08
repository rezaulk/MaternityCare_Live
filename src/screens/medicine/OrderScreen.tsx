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
  View,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Header component
const TableHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Order Id</Text>
      <Text style={styles.headerText}>Amount</Text>
      <Text style={styles.headerText}>Date</Text>
      <Text style={styles.headerText}>Status</Text>
      <Text style={styles.headerText}>Customer</Text>

    </View>
  );
};

const OrderScreen = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(true);
  const [valueUpdating, setvalueUpdating] = useState(false);
  const [subtotal, setsubtotal] = React.useState(0);
  const [discountApply, setdiscountApply] = React.useState(0);
  const [roundingoff, setroundingoff] = React.useState(0);
  const [amountPayable, setamountPayable] = React.useState(0);
  const [address, setAddress] = React.useState<Address>();
  const [medicinelist, setmedicinelist] = React.useState<Orders[]>([]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const fetchCSVData = async () => {
    setLoading(true);
     
    let medicine_list = await getData("@TotalOrder");
    debugger;
    if (medicine_list == null) {
    } else {
      let _medicine: Orders[] = JSON.parse(medicine_list);
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
            // ItemSeparatorComponent={() => (
            //   <View style={{ backgroundColor: "green", height: 2 }} />
            // )}
 

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
                  {/* <Avatar
                    size="48px"
                    source={require("../../assets/capsules.png")}
                  /> */}
                  {/* <VStack>  */}
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.orderId}
                    </Text>

                   
                     

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.amountPayable}
                    </Text>

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.createdAt}
                    </Text>
                   
                  

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.status}
                    </Text>

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.customerName}
                    </Text>
                  {/* </VStack> */}



                  <Spacer />

                 

                  <Spacer />
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.brand_id}
            ListHeaderComponent={TableHeader}
          />

         

          
       
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default OrderScreen;

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
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  itemText: {
    flex: 1,
  },

});
