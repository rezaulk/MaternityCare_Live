import * as React from 'react';
import {View} from 'react-native';

import {
  Text,
  Icon,
} from 'native-base';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-open-street-map';

class MapScreen extends React.PureComponent {
  render() {
    const {
      width,
      height,
    } = Dimensions.get('window');
    const region = {
      latitude: 0,
      longitude: 0,
      latitudeDelta:  0.0922,
      longitudeDelta: 0.0922 * (width / height)
    };
    const latitudes = [-15.806553, -15.8202434];
    const longitudes = [-47.8891454, -47.9045093];
    
    return (
      <MapView
        ref="map"
        zoom={5}
        style={{
          flex: 1
        }}
        region={region}
        showsUserLocation
        router={{
          titleA: "The point A",
          titleB: "The point B",
          descriptionA: "Bank",
          descriptionB: "Scholl",
          coordinates: [
            {
              latitude: latitudes[0],
              longitude: longitudes[1],
            },
            {
              latitude: latitudes[1],
              longitude: longitudes[1],
            }
          ]
        }}
      />
    );
  }
}

// function MapScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//      <MapView
//   initialRegion={{
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }}
// />
//     </View>
//   );
// }

 

export default MapScreen;
