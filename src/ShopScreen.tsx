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
  Image,
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

        // debugger;
        // const trimmedData1 = trimmedData.map((row) => {
        
        //   let price;
        //   if(row.package_container != undefined){
        //     price = extractNumbers(row.package_container);

        //     if(price.length > 1){
        //       console.log("Pricess ok");
        //     }



        //   }
        //   return {...row, 'Price': row.package_container, 'Prices': price
        //     // , 'Price' : extractNumbers(row.package_container)?.price
        //   };
        // });

        // setmedicinelist(trimmedData1);
        // setmainmedicinelist(trimmedData1);

        const _medicine_list: Medicine[] = [];
        let number =1;
        trimmedData.forEach(element => {

          if(element.package_container != undefined){

            let price = extractNumbers(element.package_container);

            if(element.brand_name == 'Amlacid'){
              debugger;
            }
            

            price.forEach(elementprice => {
                
              // debugger;
          const _medicine: Medicine = {
            id:number+1,
            brand_id: 0,
            brand_name: element.brand_name,
            generic: element.generic,
            manufacturer: element.manufacturer,
            Package_Size: element.Package_Size,
            dosage_form: element.dosage_form,
            package_container: element.package_container,
            slug: element.slug,
            strength: element.strength,
            type: "",
            prices: [],
            volume: elementprice.quantity,
            price: elementprice.price,
            unit: elementprice.unit,
            select_quantity: "",
            descriptor: elementprice.descriptor
          };
             
  
          _medicine_list.push(_medicine);
          number++;
            });
          }
        
          
        });

        setmedicinelist(_medicine_list);
        setmainmedicinelist(_medicine_list);

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


  function extractNumbers(input: string) {
    // Regular expression to match numbers in the format specified

    const _medicine_list: Prices[] = [];

    if (input.includes("Unit Price")) {
      //const text = "Unit Price: ৳ 5.00,(15's pack: ৳ 75.00)";

      const unitPriceRegex = /Unit Price: ৳ (\d+,\d+\.\d+|\d+\.\d+)/;
      const match = input.match(unitPriceRegex);
      if (match) {
        const _medicine: Prices = {
          quantity: 1,
          price: parseFloat(match[1]),
          unit: "Unit",
          descriptor: "",
          PriceVolume: [],
        };
        _medicine_list.push(_medicine);
      } else {
        console.log("No match found: " + input);
      }
    } else if (input.includes("bottle")) {
      // Regular expressions to match volume, unit, price, and currency

      // "100 ml bottle: ৳ 40.12" //10 ml bottle: ৳ 20.00
      const regex =
        /(\d+)\s*(mg|ml?|liters?|gallons?|oz)\s*bottle:\s*৳\s*(\d+\.\d{2})/gi;
      let match;

      while ((match = regex.exec(input)) !== null) {
        const _medicine: Prices = {
          quantity: parseFloat(match[1]),
          price: parseFloat(match[3]),
          unit: match[2],
          descriptor: "bottle",
          PriceVolume: [],
        };
        _medicine_list.push(_medicine);
      }
    } else if (
      input.includes("vial") ||
      input.includes("container") ||
      input.includes("drop") ||
      input.includes("tube") ||
      input.includes("sprays")
    ) {
      // const text = "30 mg vial: ৳ 1,700.00,100 mg vial: ৳ 4,900.00,300 mg vial: ৳ 11,500.00";
      const regex =
        /(\d+)\s*(mg|gm|ml|metered)\s*(vial|container|drop|tube|sprays):\s*৳\s*([\d,]+\.\d+)/g;
      // Use the regex pattern to find all matches in the text
      let match;
      while ((match = regex.exec(input)) !== null) {
        const _medicine: Prices = {
          quantity: parseFloat(match[1]),
          price: parseFloat(match[4]),
          unit: match[2],
          descriptor: match[2],
          PriceVolume: [],
        };

        _medicine_list.push(_medicine);
      }
    } else if (input.includes("pre-filled syringe")) {
      const pattern =
        /(([\d.]+) (mg|ml) pre-filled syringe): ৳ ([\d,]+\.\d+)(?:,\((\d+'s pack): ৳ ([\d,]+\.\d+)\))?/g;

      let match: RegExpExecArray | null;

      while ((match = pattern.exec(input)) !== null) {
        const _medicine: Prices = {
          quantity: parseFloat(match[4]),
          price: parseFloat(match[4]),
          unit: match[4],
          descriptor: match[4],
          PriceVolume: [],
        };

        _medicine_list.push(_medicine);
      }
    } else if (
      input.includes("pre-filled pen") ||
      input.includes("Pre-filled Pen")
    ) {
      const pattern = /(\d+) (\w+) (\w+ \w+): ৳ ([\d,.]+)/;

      let match: RegExpExecArray | null;

      while ((match = pattern.exec(input)) !== null) {
        const _medicine: Prices = {
          quantity: parseInt(match[4], 10),
          price: parseInt(match[4], 10),
          unit: match[2],
          descriptor: match[2],
          PriceVolume: [],
        };

        _medicine_list.push(_medicine);
      }
    } else if (
      input.includes("tablet") ||
      input.includes("bag") ||
      input.includes("ampoule") ||
      input.includes("solution") ||
      input.includes("sachet") ||
      input.includes("cartridge") ||
      input.includes("pack") ||
      input.includes("pot") ||
      input.includes("jar") ||
      input.includes("Jar") ||
      input.includes("PenSet") ||
      input.includes("syrup") ||
      input.includes("KwikPen") ||
      input.includes("pen") ||
      input.includes("Pen") ||
      input.includes("bar")
    ) {
      const pattern = /(\d+) (\w+) (\w+): ৳ ([\d,.]+)/g;

      let match1: RegExpExecArray | null;
      const units = [];

      while ((match1 = pattern.exec(input)) !== null) {
        const _medicine: Prices = {
          quantity: parseInt(match1[1]),
          price: parseInt(match1[4], 10),
          unit: match1[2],
          descriptor: "",
          PriceVolume: [],
        };

        _medicine_list.push(_medicine);
      }
    } else if (
      input.includes("strip") ||
      input.includes("blister") ||
      input.includes("can") ||
      input.includes("puffs")
    ) {
      const pattern1 = /(\d+)'?s (\w+): ৳ ([\d.]+)/g;

      let match1: RegExpExecArray | null;
      const units = [];

      while ((match1 = pattern1.exec(input)) !== null) {
        const _medicine: Prices = {
          quantity: 0,
          price: 0,
          unit: "",
          descriptor: "",
          PriceVolume: [],
        };

        // debugger;

        // (_medicine.price = parseInt(match1[4])), // Extract and parse quantity as integer
        //   (_medicine.unit = match1[2]), // Extract unit type
        //   (_medicine.quantity = match1[1]), // Extract descriptor (strip, pot, etc.)
        //   //  _medicine.price= parseFloat(match1[4]) // Extract and parse price as float

        _medicine_list.push(_medicine);
      }
    } else if (input.includes("mg:")) {
      const pattern1 = /(\d+) (\w+): ৳ ([\d.]+)/;

      let match1: RegExpExecArray | null;
      const units = [];

      const match5 = input.match(pattern1);

      if (match5) {
        const unitPrice = parseFloat(match5[1]);

        const _medicine: Prices = {
          quantity: parseFloat(match5[1]),
          price: parseFloat(match5[3]),
          unit: match5[2],
          descriptor: "",
          PriceVolume: [],
        };

        _medicine_list.push(_medicine);
      }
    } else if (input.includes("dose") || input.includes("spray")) {
      const pattern = /(\d+) (\w+(?: \w+)*) ?(?:\((\w+)\))? ?: ৳ ([\d.]+)/g;

      let match;
      const units = [];

      while ((match = pattern.exec(input)) !== null) {
        const _medicine: Prices = {
          quantity: 0,
          price: 0,
          unit: "",
          descriptor: "",
          PriceVolume: [],
        };

        // debugger;

        // (_medicine.price = parseInt(match[4])), // Extract and parse quantity as integer
        //   (_medicine.unit = match[2]), // Extract unit type
        //   (_medicine.quantity = parseInt(match[1])), // Extract descriptor (strip, pot, etc.)
        //   //  _medicine.price= parseFloat(match1[4]) // Extract and parse price as float

        _medicine_list.push(_medicine);
      }
    } else {
      // setCount((count) => count + 1);
      console.log("input: " + input);
    }

    return _medicine_list; // Return null if the pattern does not match
  }


  function extractNumbers1(input: string): { _medicine_list: Prices } | null {
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
    await AsyncStorage.removeItem('@shippingAddress');


    
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
                  as={<Ionicons name="search-outline" />}
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
                 
                {/* <Image
            size={'30px'}
            source={require('../src/assets/capsules.png')}

            alt="image"
          /> */}

                  <Avatar
                    size="48px"
                    source={require('../src/assets/capsules.png')}
                    // source={{
                    //   uri: item.brand_name,
                    // }}
                  />
                  <VStack w={'70%'}>
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
                      {item.strength} - {item.descriptor}
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
                      {item.generic}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.package_container}
                    </Text>
                    {
                      item.descriptor == 'bottle' ? 
                      <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                     1 X {item.volume} {item.unit} {item.descriptor} 
                    </Text> : null
                    }
                  
                  </VStack>

                  <Spacer />
                 
                    
                  <Box alignItems="end">
      <Button onPress={() =>  addToCart(item.brand_id)}>Add</Button>
    </Box>
                 


                  <Spacer />
                  
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
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
