import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  ActivityIndicator,
  Platform,
  Alert,
  BackHandler
} from 'react-native';

import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';


function Scan({ navigation }) {

  const [connecting, setConnecting] = useState(false)

  const isDarkMode = useColorScheme() === 'dark';

  const [deviceList, setDeviceList] = useState(Array<BluetoothDevice>)

  const canavar = useRef({} as BluetoothDevice)

  useEffect(() => {
    (async function checkIsBluetoothAvailable() {
      let available: boolean = false
      try {
        available = await RNBluetoothClassic.isBluetoothAvailable()
      } catch (err) {
        console.log(err)
      }
      if (!available) {
        Alert.alert('Bluetooth Required', 'This device does not has bluetooth capability!',
          [{
            text: 'Exit',
            onPress: () => {
              if (Platform.OS === 'android') BackHandler.exitApp()
              else throw new Error('For exit')
            }
          }]
        )
      }
    })();

    (async function checkIsBluetoothEnabled() {
      let enabled: boolean = false
      try {
        enabled = await RNBluetoothClassic.isBluetoothEnabled()
      } catch (err) {
        console.log(err)
      }
      if (!enabled) {
        Platform.OS === 'android'
          ? Alert.alert('Bluetooth is off', 'Bluetooth must be turned on!', [{
            text: 'Turn On',
            onPress: () => {
              try {
                RNBluetoothClassic.requestBluetoothEnabled()
              } catch (err) {
                console.log(err)
              }
            }
          }])
          : Alert.alert('Bluetooth is off', 'Bluetooth must be turned on!', [{ text: 'Exit', onPress: () => { throw new Error('For exit') } }])
      }
    })();

    scan()
  }, [])

  async function scan() {
    let paired
    try {
      paired = await RNBluetoothClassic.getBondedDevices();
    } catch (err) {
      console.log(err)
    }

    if (paired) {
      setDeviceList(paired)
    }
  }

  async function connect(selectedName: string) {
    let canavar1 = deviceList.find(device => device.name === selectedName)

    if (!canavar1) {
      return
    }

    if (connecting) {
      return
    }

    setConnecting(true)
    canavar.current = canavar1

    let isConnected: boolean = false

    try {
      isConnected = await canavar1.connect()
    } catch (err) {
      console.log(err)
    }

    setConnecting(false)

    if (!isConnected) {
      Alert.alert('Connection Failed')
      return
    }
    navigation.navigate('Controller', { deviceName: canavar1.name })

  }


  return (
    <SafeAreaView style={styles.mainPage}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <View>
        {deviceList.length > 0
          ? deviceList.map((d, index) => <Pressable key={index} onPress={() => connect(d.name)} style={styles.deviceCard}>
            <Text style={styles.deviceName}>{d.name}</Text>
            <Text style={styles.deviceAddress}>{d.address}</Text>
          </Pressable>)
          : <Text style={styles.noDeviceText}>No paired device found.</Text>}
      </View>
      <View style={styles.indicatorContainer}>
        {connecting && <ActivityIndicator size={Platform.OS === 'android' ? 70 : 'large'} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    alignItems: 'center'
  },
  deviceCard: {
    paddingVertical: 8,
  },
  deviceName: {
    fontSize: 24,
    fontWeight: '600',
  },
  deviceAddress: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  noDeviceText: {
    fontSize: 26,
    fontWeight: '800',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Scan;
