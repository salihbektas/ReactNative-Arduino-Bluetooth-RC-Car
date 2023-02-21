import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  ActivityIndicator,
  Platform
} from 'react-native';

import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';


function Scan({ navigation }) {

  const [connecting, setConnecting] = useState(false)

  const isDarkMode = useColorScheme() === 'dark';

  const [deviceList, setDeviceList] = useState(Array<BluetoothDevice>)

  const canavar = useRef({} as BluetoothDevice) 

  useEffect(() => {
    scan()
  }, [])


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

  async function scan(){
    let paired
    try {
      paired = await RNBluetoothClassic.getBondedDevices();
    } catch (err) {
        console.log(err)
    }

    if(paired){
      setDeviceList(paired)
      /*
      canavar = paired.find(device => device.name === 'HC-06')
      if(canavar){
        console.log('ccc', canavar)
        device.current = canavar
        console.log('aaa', device.current)
        let isConnected = await canavar.connect()
        if(isConnected){
          await canavar.write(Buffer.from('B', 'ascii'))
          await canavar.write(Buffer.from('Raa', 'ascii'))
          //await canavar.disconnect()
          console.log('bitti')
        }
      }*/
    }
  }

  async function connect(selectedName: string){
    let canavar1 = deviceList.find(device => device.name === selectedName)

    if(!canavar1){
      alert('Fail')
      return
    }

    setConnecting(true)
    canavar.current = canavar1

    let isConnected: boolean = false

    try{
      isConnected = await canavar1.connect()
    } catch(err) {
      console.log(err)
    }
    
    setConnecting(false)

    if(!isConnected){
      alert('Fail')
      return
    }
    navigation.navigate('Controller', {deviceName: canavar1.name})

  }

  async function disconnect(){
    canavar.current.name &&  await canavar.current.isConnected() === true && canavar.current.disconnect()
    canavar.current = {} as BluetoothDevice
    alert('disconnect')
  }
  

  return (
    <SafeAreaView style={styles.mainPage}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <View>
        {deviceList.length > 0 ? deviceList.map((d, index) => <Pressable key={index} onPress={() => connect(d.name)} style={styles.deviceCard}>
          <Text style={styles.deviceName}>{d.name}</Text>
          <Text style={styles.deviceAddress}>{d.address}</Text>
        </Pressable>) 
        : <Text style={styles.noDeviceText}>No paired device found.</Text>}
      </View>
      <View style={styles.indicatorContainer}>
        {//<Button title='disconnect' onPress={disconnect} />
        }
        {connecting && <ActivityIndicator size={Platform.OS === 'android' ? 70 : 'large'} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainPage:{
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
