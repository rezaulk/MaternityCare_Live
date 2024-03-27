import * as React from 'react';
import {View} from 'react-native';

import {
  Text,
  Icon,
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';

 

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <Icon as={Ionicons} name="home" size="sm" color="black" />
    </View>
  );
}

 

export default SettingsScreen;
