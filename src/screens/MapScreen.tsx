import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const categories = ['All', 'Blood Donor', 'Ambulance'];

interface LocationItem {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
}

const allLocations: LocationItem[] = [
  {
    id: '1',
    name: 'Donor: Rafiq Islam',
    category: 'Blood Donor',
    latitude: 23.8103,
    longitude: 90.4125,
  },
  {
    id: '2',
    name: 'Donor: Amina Khatun',
    category: 'Blood Donor',
    latitude: 23.8121,
    longitude: 90.4142,
  },
  {
    id: '3',
    name: 'Ambulance #1',
    category: 'Ambulance',
    latitude: 23.8143,
    longitude: 90.4175,
  },
  {
    id: '4',
    name: 'Ambulance #2',
    category: 'Ambulance',
    latitude: 23.8165,
    longitude: 90.4100,
  },
];

const MapScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredLocations, setFilteredLocations] = useState<LocationItem[]>([]);

  useEffect(() => {
    const data =
      selectedCategory === 'All'
        ? allLocations
        : allLocations.filter((item) => item.category === selectedCategory);

    setFilteredLocations(data);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.812,
          longitude: 90.415,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {filteredLocations.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.name}
            description={item.category}
            pinColor={item.category === 'Blood Donor' ? 'red' : 'blue'}
          />
        ))}
      </MapView>

      <View style={styles.filterBar}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedCategory === item && styles.selectedButton,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === item && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  filterBar: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
    elevation: 5,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginHorizontal: 4,
  },
  selectedButton: {
    backgroundColor: '#00aa6c',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
});
