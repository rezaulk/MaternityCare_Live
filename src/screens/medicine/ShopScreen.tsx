import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import {
  Avatar,
  Box,
  Center,
  FlatList,
  HStack,
  Heading,
  Icon,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
  Pressable,
  Spinner,
  Actionsheet,
  useDisclose,
  Select,
  CheckIcon,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

export type Medicine = {
  id: number;
  brand_name: string;
  generic: string;
  manufacturer: string;
  strength: string;
  price: string;
  unit: string;
  descriptor: string;
  _brand_lc?: string;
  _generic_lc?: string;
  _manu_lc?: string;
};

const CSV_URL =
  "https://raw.githubusercontent.com/rezaulk/Barrons333/refs/heads/main/MedicineListOfBangladesh.csv";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20;

const ShopScreen = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Medicine[]>([]);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState("default");

  const { isOpen, onOpen, onClose } = useDisclose();
  const fullRef = useRef<Medicine[]>([]);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchAndParseCSV();
  }, []);

  const fetchAndParseCSV = async () => {
    try {
      setLoading(true);
      const res = await fetch(CSV_URL);
      const text = await res.text();

      const rows = text
        .split("\n")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);
      const headers = rows[0].split(",").map((h) => h.trim());

      const medicines: Medicine[] = rows.slice(1).map((row, idx) => {
        const cols = row.split(",");
        const obj: any = {};
        headers.forEach((h, i) => {
          obj[h] = (cols[i] || "").trim();
        });
        return {
          id: idx + 1,
          brand_name: obj["brand_name"] || "",
          generic: obj["generic"] || "",
          manufacturer: obj["manufacturer"] || "",
          strength: obj["strength"] || "",
          price: obj["price"] || "0",
          unit: obj["unit"] || "",
          descriptor: obj["descriptor"] || "",
          _brand_lc: (obj["brand_name"] || "").toLowerCase(),
          _generic_lc: (obj["generic"] || "").toLowerCase(),
          _manu_lc: (obj["manufacturer"] || "").toLowerCase(),
        };
      });

      fullRef.current = medicines;
      setList(medicines.slice(0, 60));
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  const applySort = (data: Medicine[]) => {
    switch (sortOption) {
      case "price_low":
        return [...data].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "price_high":
        return [...data].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      case "az":
        return [...data].sort((a, b) =>
          a.brand_name.localeCompare(b.brand_name)
        );
      case "za":
        return [...data].sort((a, b) =>
          b.brand_name.localeCompare(a.brand_name)
        );
      default:
        return data;
    }
  };

  const onSearchChange = (text: string) => {
    setQuery(text);
    if (searchTimer.current) clearTimeout(searchTimer.current);

    searchTimer.current = setTimeout(() => {
      const q = text.trim().toLowerCase();
      let filtered = fullRef.current;
      if (q) {
        filtered = fullRef.current.filter(
          (m) =>
            m._brand_lc?.includes(q) ||
            m._generic_lc?.includes(q) ||
            m._manu_lc?.includes(q)
        );
      }
      setList(applySort(filtered));
    }, 250);
  };

  const clearSearch = () => {
    setQuery("");
    setList(applySort(fullRef.current.slice(0, 60)));
  };

  const renderGridItem = ({ item }: { item: Medicine }) => (
    <Box
      borderWidth={1}
      borderColor="coolGray.200"
      borderRadius="10"
      m={2}
      p={3}
      w={CARD_WIDTH}
      bg="white"
      shadow={1}
    >
      <Center>
        <Avatar size="64px" source={require("../../assets/capsules.png")} />
        <Text bold mt={2} fontSize="sm" textAlign="center">
          {item.brand_name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {item.price} {item.unit}
        </Text>
      </Center>
    </Box>
  );

  const renderListItem = ({ item }: { item: Medicine }) => (
    <Box borderBottomWidth={1} borderColor="coolGray.100" p={3} bg="white">
      <HStack space={3} alignItems="center">
        <Avatar size="48px" source={require("../../assets/capsules.png")} />
        <VStack flex={1}>
          <Text bold>{item.brand_name}</Text>
          <Text fontSize="xs" color="gray.500">
            {item.generic}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {item.price} {item.unit}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );

  return (
    <NativeBaseProvider>
      {loading ? (
        <Center flex={1} px="3">
          <HStack space={2} alignItems="center">
            <Spinner />
            <Heading color="primary.500" fontSize="md">
              Loading…
            </Heading>
          </HStack>
        </Center>
      ) : (
        <VStack flex={1} padding={3} space={3} bg="gray.50">
          {/* 🔍 Search Bar */}
          <Input
            placeholder="Search medicine..."
            value={query}
            onChangeText={onSearchChange}
            variant="filled"
            borderRadius="12"
            py="1"
            px="2"
            bg="white"
            shadow={1}
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color="gray.400"
                as={<Ionicons name="search-outline" />}
              />
            }
            InputRightElement={
              query ? (
                <Icon
                  onPress={clearSearch}
                  ml="2"
                  size="4"
                  color="gray.400"
                  as={<Ionicons name="close-circle" />}
                />
              ) : undefined
            }
          />

          {/* ⚙️ Sort / Filter / View */}
          <HStack
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            p={2}
            borderRadius="12"
            shadow={1}
          >
            {/* Sort dropdown inline */}
            <Select
              selectedValue={sortOption}
              minWidth="120"
              placeholder="Sort"
              _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }}
              onValueChange={(v) => {
                setSortOption(v);
                setList(applySort(list));
              }}
            >
              <Select.Item label="Default" value="default" />
              <Select.Item label="Price: Low to High" value="price_low" />
              <Select.Item label="Price: High to Low" value="price_high" />
              <Select.Item label="A-Z" value="az" />
              <Select.Item label="Z-A" value="za" />
            </Select>

            {/* Filter button */}
            <Pressable onPress={onOpen}>
              <HStack alignItems="center" space={1}>
                <Icon as={Ionicons} name="options-outline" size="5" color="gray.600" />
                <Text fontSize="sm" color="gray.700">Filter</Text>
              </HStack>
            </Pressable>

            {/* View toggle */}
            <Pressable onPress={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
              <Icon
                as={Ionicons}
                name={viewMode === "grid" ? "list" : "grid"}
                size="6"
                color="gray.600"
              />
            </Pressable>
          </HStack>

          {/* Medicine List */}
          <FlatList
            data={list}
            renderItem={viewMode === "grid" ? renderGridItem : renderListItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={viewMode === "grid" ? 2 : 1}
            key={viewMode}
            showsVerticalScrollIndicator={false}
          />

          {/* Filter ActionSheet (can add category/price filters later) */}
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Text bold mb={2}>
                Filters coming soon…
              </Text>
            </Actionsheet.Content>
          </Actionsheet>
        </VStack>
      )}
    </NativeBaseProvider>
  );
};

export default ShopScreen;
