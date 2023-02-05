import React, { useRef } from 'react';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  ViewStyle,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';


const Scan = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const device = useRef({} as BluetoothDevice) 

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  };


  async function sallam() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonNeutral: 'Ask Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  }

  async function scanAndConnect() {

    sallam()
    let paired
    let canavar
    try {
      paired = await RNBluetoothClassic.getBondedDevices();
    } catch (err) {
        console.log(err)
    }

    if(paired){
      canavar = paired.find(device => device.name === 'HC-06')
      if(canavar){
        device.current = canavar
        let isConnected = await canavar.connect()
        if(isConnected){
          await canavar.write(Buffer.from('B', 'ascii'))
          await canavar.write(Buffer.from('Raa', 'ascii'))
          console.log('bitti')
        }
      }
    }
}

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>Salih</Text>
      <Button title='scan' onPress={scanAndConnect} />
      <Button title='disconnect' onPress={device.current.disconnect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Scan;
