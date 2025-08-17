import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Linking,
  Modal,
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');
const MODAL_HEIGHT = Math.min(height * 0.78, 680);

type Availability = 'Available' | 'Busy' | 'Unavailable' | 'On Trip';

interface LocationItem {
  id: string;
  name: string;
  category: 'Blood Donor' | 'Ambulance';
  latitude: number;
  longitude: number;
  phone?: string;
  availability: Availability;
}

const availabilityColors: Record<Availability, string> = {
  Available: '#00C853',
  Busy: '#FF9800',
  'On Trip': '#FF9800',
  Unavailable: '#9E9E9E',
};

const CATEGORIES = ['All', 'Blood Donor', 'Ambulance'] as const;

const initialData: LocationItem[] = [
  {
    id: '1',
    name: 'Donor: Rafiq Islam',
    category: 'Blood Donor',
    latitude: 23.8103,
    longitude: 90.4125,
    phone: '+8801712345678',
    availability: 'Available',
  },
  {
    id: '2',
    name: 'Donor: Amina Khatun',
    category: 'Blood Donor',
    latitude: 23.8121,
    longitude: 90.4142,
    phone: '+8801911223344',
    availability: 'Busy',
  },
  {
    id: '3',
    name: 'Ambulance #1',
    category: 'Ambulance',
    latitude: 23.8143,
    longitude: 90.4175,
    phone: '+8801811445566',
    availability: 'On Trip',
  },
  {
    id: '4',
    name: 'Ambulance #2',
    category: 'Ambulance',
    latitude: 23.8165,
    longitude: 90.41,
    phone: '+8801711223344',
    availability: 'Available',
  },
];

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const [data] = useState<LocationItem[]>(initialData);
  const [filtered, setFiltered] = useState<LocationItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [availableOnly, setAvailableOnly] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const backdrop = useRef(new Animated.Value(0)).current; // 0..1
  const slideY = useRef(new Animated.Value(MODAL_HEIGHT)).current; // translateY

  // Filter logic
  useEffect(() => {
    let list = [...data];

    if (category !== 'All') {
      list = list.filter(item => item.category === category);
    }
    if (availableOnly) {
      list = list.filter(item => item.availability === 'Available');
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [data, category, availableOnly, search]);

  // Modal animate in/out
  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 0,
          duration: 180,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue: MODAL_HEIGHT,
          duration: 220,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible, backdrop, slideY]);

  const callNumber = (phone?: string) => {
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  const centerOn = (item: LocationItem) => {
    setModalVisible(false);
    // small delay to let modal close before animating map
    setTimeout(() => {
      mapRef.current?.animateToRegion(
        {
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        },
        600
      );
    }, 220);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 23.812,
          longitude: 90.415,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {filtered.map(item => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.name}
            description={`${item.category} • ${item.availability}`}
            pinColor={
              item.category === 'Blood Donor'
                ? availabilityColors[item.availability]
                : item.availability === 'Available'
                ? '#2962FF'
                : availabilityColors[item.availability]
            }
          />
        ))}
      </MapView>

      {/* Floating controls (FAB) */}
      <View style={styles.fabWrap}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="list" size={22} color="#fff" />
          <Text style={styles.fabText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        transparent
        statusBarTranslucent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="none" // we handle custom animations
      >
        {/* Backdrop */}
        <Pressable onPress={() => setModalVisible(false)} style={StyleSheet.absoluteFill}>
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.5)', opacity: backdrop },
            ]}
          />
        </Pressable>

        {/* Card modal */}
        <Animated.View
          style={[
            styles.modalCard,
            { transform: [{ translateY: slideY }] },
          ]}
        >
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header actions */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>Donors & Ambulances</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Ionicons name="close" size={22} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <TextInput
            placeholder="Search by name or type..."
            value={search}
            onChangeText={setSearch}
            style={styles.search}
          />

          {/* Filters */}
          <View style={styles.chipsRow}>
            {CATEGORIES.map(c => (
              <TouchableOpacity
                key={c}
                onPress={() => setCategory(c)}
                style={[
                  styles.chip,
                  category === c && styles.chipActive,
                ]}
              >
                <Text style={[styles.chipText, category === c && styles.chipTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setAvailableOnly(prev => !prev)}
              style={[styles.chip, availableOnly && styles.availableChipActive]}
            >
              <Ionicons
                name="flash"
                size={14}
                color={availableOnly ? '#fff' : '#00C853'}
              />
              <Text
                style={[
                  styles.chipText,
                  { marginLeft: 6 },
                  availableOnly && styles.chipTextActive,
                ]}
              >
                Available Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={i => i.id}
            contentContainerStyle={{ paddingBottom: 18 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.card}
                onPress={() => centerOn(item)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: availabilityColors[item.availability] },
                      ]}
                    >
                      <Text style={styles.statusText}>{item.availability}</Text>
                    </View>
                  </View>
                </View>

                {item.phone && (
                  <TouchableOpacity
                    onPress={() => callNumber(item.phone)}
                    style={styles.callBtn}
                  >
                    <Ionicons name="call" size={18} color="#fff" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={{ padding: 18 }}>
                <Text style={{ textAlign: 'center', color: '#777' }}>
                  No results match your filters.
                </Text>
              </View>
            }
          />
        </Animated.View>
      </Modal>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { flex: 1 },

  // FAB
  fabWrap: {
    position: 'absolute',
    bottom: 22,
    right: 18,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00aa6c',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 28,
    elevation: 6,
  },
  fabText: { color: '#fff', fontWeight: '600' },

  // Modal card
  modalCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: MODAL_HEIGHT,
    backgroundColor: '#ffffffee', // slight translucency
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 8,
    elevation: 16,
  },
  handle: {
    height: 5,
    width: 48,
    backgroundColor: '#ddd',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: '700', flex: 1 },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },

  search: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#f4f4f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eef1f4',
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: '#0f8760',
  },
  availableChipActive: {
    backgroundColor: '#00C853',
  },
  chipText: { color: '#344054', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  categoryText: { color: '#6b7280', fontSize: 12, marginRight: 4 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  callBtn: {
    marginLeft: 12,
    backgroundColor: '#00aa6c',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
});
