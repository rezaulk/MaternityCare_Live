import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Papa from "papaparse";
import {
  Avatar,
  Box,
  Button,
  Center,
  CheckIcon,
  FlatList,
  HStack,
  Heading,
  Icon,
  Input,
  NativeBaseProvider,
  Select,
  Spacer,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ShoppingCart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSearching, setDataSearching] = React.useState(false);

  const [medicinelist, setmedicinelist] = React.useState<Medicine[]>([]);
  const [mainmedicinelist, setmainmedicinelist] = React.useState<Medicine[]>([]);

  const [text, setText] = React.useState('');

  const fetchCSVData = async () => {
    setLoading(true);
     
    
  
  let medicine_list = await getData();
  if(medicine_list == null){

    
  }
  else{
    debugger;
    let _medicine: Medicine[] = JSON.parse(medicine_list);
    
    // setmedicinelist(_medicine);
    setmedicinelist(medicinelist => [...medicinelist, _medicine]);

   let ddd = medicinelist;

    const trimmedData1 = _medicine.map((row) => {
        
      let price12 = extractNumbers(row.package_container)?.price;
     debugger;
     return {...row
       //, 'Price': row.package_container
        , 'price' : extractNumbers(row.package_container)?.price
        , 'unit' : extractNumbers(row.package_container)?.unit
        , 'volume' : extractNumbers(row.package_container)?.volume
        ,'select_quantity': "1"

     };
   });

   setmedicinelist(trimmedData1);
  //  setmedicinelist({...trimmedData1});


  }



    setLoading(false);
    console.log(medicinelist);
  };

  useEffect(() => {
    fetchCSVData();
  }, []);


  useEffect(() => {
   
    

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

  function extractNumbers(input: string) {
    // Regular expression to match numbers in the format specified
    
  //const text = "Unit Price: ৳ 5.00,(15's pack: ৳ 75.00)";
  const unitPricePattern = "Unit Price: ৳ (\\d+\\.\\d{2})";
  const packPricePattern = "\\((\\d+'s pack): ৳ (\\d+\\.\\d{2})\\)";
  // const regex = /Unit Price: ৳ (\d+\.\d+).*\((\d+\'s (\w+)): ৳ (\d+\.\d+)/;
  // const regex = /Unit Price: ৳ (\d+\.\d+).*\((\d+\'s pack): ৳ (\d+\.\d+)/;

  const _medicine_list: Prices ={};
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
  else if(input.includes("ml") || input.includes("mg")){
   
    debugger;
     // Regular expressions to match volume, unit, price, and currency
     const volumeRegex = /(\d+)\s*(ml|l|g|kg|mg)/i;
     const priceRegex = /([\u09F3]?\s?\d+(\.\d{1,2})?)/;

    const matcheee = input.match(volumeRegex);
    const matcheee_pr = input.match(priceRegex);


    //  const text = "100 ml bottle: ৳ 40.12";
    const regex = /(\d+\s?ml)\s?(bottle|vial|):\s?৳\s?(\d+\.\d{1,2})/;
    const match = input.match(regex);

    const regex1545 = /(\d+)\s*(mg|ml?|liters?|gallons?|oz)\s*bottle:\s*৳\s*(\d+\.\d{2})/gi;
    let match555;
    
    while ((match555 = regex1545.exec(input)) !== null) {
        const volumeValuedd = match555[1];
        const volumeUnitdd = match555[2];
        const pricedd = match555[3];
        
        debugger;
        console.log(`Volume: ${volumeValuedd} ${volumeUnitdd}`);
        console.log(`Price: ৳${pricedd}`);
    }







    const regex12 = /(\d+\s?ml)\s?bottle:\s?৳\s?(\d+\.\d{1,2})/;

    const vialregex12 = /(\d+\s?ml)\s?vial:\s?৳\s?(\d+\.\d{1,2})/;


    const match_ = input.match(regex12);
    const  vialmatch_ = input.match(vialregex12);


if (match_) {
  const unitVolume: string = match_[1];
  const price_: string = match_[2];
  console.log("Extracted unit volume:", unitVolume); // Output: "Extracted unit volume: 100 ml"
  console.log("Extracted price:", price_); // Output: "Extracted price: 40.12"

  _medicine_list.volume = unitVolume;
  _medicine_list.price = price_;

} else {
  console.log("No match found");
}


    // // Extract volume and unit
    // const volumeMatch = input.match(volumeRegex);
    // if (!volumeMatch) throw new Error("Volume and unit not found");

    // const volume = parseFloat(volumeMatch[1]);
    // const unit = volumeMatch[2].toLowerCase();

    // // Extract price
    // const priceMatch = input.match(priceRegex);
    // if (!priceMatch) throw new Error("Price not found");

    // const price = parseFloat(priceMatch[0].replace(/[^\d.]/g, ''));
    // const currency = priceMatch[0].includes('৳') ? '৳' : 'unknown';


    // const priceString = priceMatch[0].trim();
    // const _price = parseFloat(priceString.replace(/[^\d.]/g, ''));
    // const currency_ = /[\u09F3]/.test(priceString) ? '৳' : 'unknown';

    // _medicine_list.unit = unit;
    // _medicine_list.volume = unitVolume;
    // _medicine_list.price = price_;
    // const _unitPrice1 = extractPrices(input, regex);

     

  }
  // const packPrice = extractPrices(input, packPricePattern);


  // _medicine_list.push(_medicine);


return _medicine_list;
    // return null; // Return null if the pattern does not match
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


const handleSelectQuantity = (itemId, quantity) => {


  setmedicinelist(prevData =>
    medicinelist.map(item =>
      item.brand_id === itemId ? { ...item, select_quantity: quantity } : item
    )
  );


  // let medicine_check = medicinelist.find(x=> x.brand_id == itemId);

  // debugger;
  // if(medicine_check != null){
  //   medicine_check.select_quantity = quantity;

  // }
 
  // setmedicinelist({...medicinelist})
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

  
          <Box alignItems="end">
      <Button onPress={() =>  ResetCart()}>Reset</Button>
    </Box>

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
                  {/* <Avatar
                    size="48px"
                    source={{
                      uri: item.brand_name,
                    }}
                  /> */}
                  <VStack width={'40%'}>
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
                    {/* <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                     Price {item.price}* {item.select_quantity} =  {item.price* item.select_quantity}
                    </Text> */}

                  </VStack>

                  <Spacer />
                 

               

                  <Box alignSelf="center"
      // borderWidth={1}
      // width={'100%'}
       // bg="primary.500"
    _text={{
      fontSize: "md",
      fontWeight: "medium",
      // color: "warmGray.50",
      letterSpacing: "lg"
    }} 
    // bg={["red.400", "blue.400"]}
    >

<Select selectedValue={item.select_quantity} minWidth="75" height="8" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "teal.300",
        
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => handleSelectQuantity(item.brand_id,itemValue)}>
          <Select.Item label="1" value="1" />
          <Select.Item label="2" value="2" />
          <Select.Item label="3" value="3" />
          <Select.Item label="4" value="4" />
          <Select.Item label="5" value="5" />
        </Select>
 
      </Box>



      <Box alignSelf="center"
      // borderWidth={1}
      // width={'50%'}
       // bg="primary.500"
    _text={{
      fontSize: "md",
      fontWeight: "medium",
      // color: "warmGray.50",
      letterSpacing: "lg"
    }} 
    // bg={["red.400", "blue.400"]}
    >

 

        <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                    X {item.price}   =  {item.price* parseInt(item.select_quantity) }
                    </Text>

                    {/* <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                   =  {item.price* parseInt(item.select_quantity) }
                    </Text>  */}
      </Box>
 


        {/* <View borderWidth={1} width={'100%'}>

       
        <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                    X {item.price}
                    </Text>

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                   =  {item.price* parseInt(item.select_quantity) }
                    </Text> 
                   
        
                  {/* <Box alignItems="end">
      <Button onPress={() =>  addToCart(item.brand_id)}>Add</Button>
    </Box> }
                 
                 

                 </View> */}
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
