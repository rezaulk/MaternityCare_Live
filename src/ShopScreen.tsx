import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Papa from "papaparse";
import {
  Avatar,
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Heading,
  Icon,
  Input,
  NativeBaseProvider,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShopScreen = ({navigation}: {navigation: any}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSearching, setDataSearching] = React.useState(false);

  const [medicinelist, setmedicinelist] = React.useState<Medicine[]>([]);
  const [mainmedicinelist, setmainmedicinelist] = React.useState<Medicine[]>([]);

  const [text, setText] = React.useState('');

  const fetchCSVData = async () => {
    setLoading(true);
    setError(null);

    const response = await fetch(
      "https://raw.githubusercontent.com/rezaulk/Barrons333/main/medicine.csv"
    );
    const csvData = await response.text();

    const parsedData = Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        debugger;
        const data = results.data;
        const meta = results.meta;
        const trimmedKeys = meta.fields.map((field) =>
          field.replace(/\s/g, "_")
        );

        const trimmedData = data.map((row) => {
          const trimmedRow = {};
          trimmedKeys.forEach((key, index) => {
            trimmedRow[key] = row[meta.fields[index]];
          });
          return trimmedRow;
        });

        debugger;
        const trimmedData1 = trimmedData.map((row) => {
        
          // let price = extractNumbers(row.package_container);
          // debugger;
          return {...row, 'Price': row.package_container
            // , 'Price' : extractNumbers(row.package_container)?.price
          };
        });

        setmedicinelist(trimmedData1);
        setmainmedicinelist(trimmedData1);


      },
    });

    setLoading(false);
    console.log(medicinelist);
  };

  useEffect(() => {
    fetchCSVData();
  }, []);


  const extractPrices = (text, pattern) => {
    const regex = new RegExp(pattern, 'g');
    const matches = [...text.matchAll(regex)];
    const prices = {};
    // debugger;

    // Array to store extracted values
const _matches = [];
let match;
while ((match = regex.exec(text)) !== null) {

  if(text.includes("Unit Price")){
    _matches.push({
      unitPrice: parseFloat(match[1]),
     
    });
  }
  else{
    _matches.push({
      // unitPrice: parseFloat(match[1]),
      packSize: match[1],
      packPrice: parseFloat(match[3])
    });
  }
 
}


    // matches.forEach(match => {
    //   prices[match[0]] = match[1];
    // });
    return _matches;
  };

  function extractNumbers(input: string): { _medicine_list: Prices } | null {
    // Regular expression to match numbers in the format specified
    
  //const text = "Unit Price: ৳ 5.00,(15's pack: ৳ 75.00)";
  const unitPricePattern = "Unit Price: ৳ (\\d+\\.\\d{2})";
  const packPricePattern = "\\((\\d+'s pack): ৳ (\\d+\\.\\d{2})\\)";
  // const regex = /Unit Price: ৳ (\d+\.\d+).*\((\d+\'s (\w+)): ৳ (\d+\.\d+)/;
  // const regex = /Unit Price: ৳ (\d+\.\d+).*\((\d+\'s pack): ৳ (\d+\.\d+)/;

  const _medicine_list: Prices = [];
  const _medicine: Prices = {};


  if(input.includes("Unit Price")){
    const unitPrice = extractPrices(input, unitPricePattern);
    
    const _unitPrice = extractPrices(input, packPricePattern);
    // const _unitPrice1 = extractPrices(input, regex);

    debugger;
    
    _medicine.price = unitPrice;
    _medicine.volume = 1;

    debugger;

  }
  // const packPrice = extractPrices(input, packPricePattern);


  _medicine_list.push(_medicine);



    return null; // Return null if the pattern does not match
}





//   function extractNumbers(input: string): { unitPrice: number, quantity: number, totalPrice: number } | null {
//     // Regular expression to match numbers in the format specified
//     const regex = /Unit Price: [^\d]*([\d,]+\.\d{2}),\s*\((\d+)'s pack: [^\d]*([\d,]+\.\d{2})\)/;
//     const match = input.match(regex);

//     const volumeregex = /(\d+)\s*ml\s*drop:\s*[^\d]*([\d,]+\.\d{2})/;
//     const matchvolume = input.match(volumeregex);

//     const pattern = "(\\d+ ml) bottle: ৳ (\\d+\\.\\d{2})";

//     if (match) {
//         const unitPrice = parseFloat(match[1].replace(/,/g, ''));
//         const quantity = parseInt(match[2], 10);
//         const totalPrice = parseFloat(match[3].replace(/,/g, ''));
//         return { unitPrice, quantity, totalPrice };
//     }
//     else if (matchvolume) {
//       const quantity = parseInt(matchvolume[1], 10);
//       const unitPrice = parseFloat(matchvolume[2].replace(/,/g, ''));
//       const totalPrice = parseFloat(matchvolume[2].replace(/,/g, ''));

//       return { unitPrice, quantity, totalPrice };

//   }
  
//  // const text = "100 ml bottle: ৳ 50.00,225 ml bottle: ৳ 90.00,450 ml bottle: ৳ 140.00";
//  const prices = extractPrices(text, pattern);

//     debugger;
//     console.log(input);
//     return null; // Return null if the pattern does not match
// }


const addToCart = async (id: number) => {
  
  console.log(id);

  let medicine: Medicine = mainmedicinelist.find(x=> x.brand_id == id);
  debugger;
  
  
  let medicine_list = await getData();
  if(medicine_list == null){

    let medicine1: Medicine []= []; 
    medicine1.push(medicine);

   await storeData(JSON.stringify(medicine1));
  }
  else{
    debugger;
    let _medicine: Medicine[] = JSON.parse(medicine_list);
    
    let medicine_check = _medicine.find(x=> x.brand_id == id);
    if(medicine_check == null){
          _medicine.push(medicine);

          await storeData(JSON.stringify(_medicine));
    }
  }
   debugger;

};

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@shoppingcart', value);
  } catch (e) {
    // saving error
  }
};

const ResetCart = async () => {
  try {
    await AsyncStorage.removeItem('@shoppingcart');
  } catch (e) {
    // saving error
  }
};



const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@shoppingcart');
    // debugger;
    if (value !== null) {
      // value previously stored
       return value;
    }
    else{
      return null;
    }
  } catch (e) {
    // error reading value
  }
};



  const SearchFilterFunction = async (text: string) => {
    // SearchFilterFunction(text) {

    debugger;
    //passing the inserted text in textinput
    const newData = mainmedicinelist.filter(function (item: Medicine) {
      //applying filter for the inserted text in search bar
      const itemData = item.generic ? item.brand_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setmedicinelist(newData);
    setText(text);
    setDataSearching(true);
  };

  const searchDataCleaned = () => {
    setText('');
    setDataSearching(false);
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

<VStack w="100%" space={5} alignSelf="center" padding={5}>
            <Input
              placeholder="Search"
              onChangeText={text => SearchFilterFunction(text)}
              variant="filled"
              width="100%"
              borderRadius="10"
              py="1"
              px="2"
              InputLeftElement={
                <Icon
                  ml="2"
                  size="4"
                  color="gray.400"
                  as={<Ionicons name="ios-search" />}
                />
              }
              InputRightElement={
                dataSearching == true ? (
                  <Icon
                    onPress={() => searchDataCleaned()}
                    ml="2"
                    size="4"
                    color="gray.400"
                    as={<Ionicons name="trash" />}
                  />
                ) : undefined
              }

            // datafetched == true ? InputRightElement={ datafetched == true ? <Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />  : null }
            />
          </VStack>
          
          <Box alignItems="end">
      <Button onPress={() =>  ResetCart()}>Reset</Button>
    </Box>
    <Box alignItems="end">
      <Button onPress={() =>  navigation.navigate('ShoppingCart')}>Shopping Cart</Button>
    </Box>

          <FlatList
            data={medicinelist}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
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
                    source={{
                      uri: item.brand_name,
                    }}
                  /> */}
                  <VStack>
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
                      {item.generic}
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
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.package_container}
                    </Text>
                  </VStack>

                  <Spacer />
                 
                    
                  <Box alignItems="end">
      <Button onPress={() =>  addToCart(item.brand_id)}>Add</Button>
    </Box>
                 


                  <Spacer />
                  
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.brand_id}
          />
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default ShopScreen;

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
