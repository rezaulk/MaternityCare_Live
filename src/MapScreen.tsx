import * as React from 'react';
import {View} from 'react-native';

import {
  Text,
  Icon,
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
 

function MapScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
     <MapView
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>
    </View>
  );
}

 

export default MapScreen;
