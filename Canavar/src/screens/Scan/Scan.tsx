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
  Pressable
} from 'react-native';

import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';


const Scan = () => {

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

    canavar.current = canavar1
    let isConnected = await canavar1.connect()
    
    if(!isConnected){
      alert('Fail')
      return
    }

    alert('Success')

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
        {deviceList.map((d, index) => <Pressable key={index} onPress={() => connect(d.name)} style={styles.deviceCard}>
          <Text style={styles.deviceName}>{d.name}</Text>
          <Text style={styles.deviceAddress}>{d.address}</Text>
        </Pressable>)}
      </View>
      <Button title='disconnect' onPress={disconnect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainPage:{
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
  }
});

export default Scan;
