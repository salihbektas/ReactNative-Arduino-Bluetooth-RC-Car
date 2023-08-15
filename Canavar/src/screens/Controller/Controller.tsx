import React, {useEffect, useRef, useState} from 'react'
import {View, StyleSheet, Pressable, Image, BackHandler, Text} from 'react-native'
import {GestureDetector, GestureHandlerRootView, Gesture} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import RNBluetoothClassic, {BluetoothDevice} from 'react-native-bluetooth-classic'
import {useFocusEffect} from '@react-navigation/native'
import colors from '../../colors'
import {ControllerProps} from '../../types'

function Controller({route, navigation}: ControllerProps) {
  const canavar = useRef({} as BluetoothDevice)

  const connected = useRef(false)

  const [message, setMessage] = useState(24)

  const steeringMileStones = []

  for (let i = 0; i < 7; ++i)
    steeringMileStones.push(<View style={styles.steeringMilestone} key={i} />)

  const throttleMileStones = []

  for (let i = 0; i < 7; ++i)
    throttleMileStones.push(<View style={styles.throttleMilestone} key={i} />)

  useEffect(() => {
    ;(async () => {
      let device = (await RNBluetoothClassic.getBondedDevices()).find(
        d => d.name === route.params.deviceName
      )
      if (device) {
        canavar.current = device
        connected.current = true
      }
    })()
  }, [])

  const throttleOffset = useSharedValue({x: 0, y: 0})

  const throttleAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: throttleOffset.value.x}, {translateY: throttleOffset.value.y}]
    }
  })

  const throttleGesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY < 100 && e.translationY > -100)
        throttleOffset.value = {
          x: 0,
          y: e.translationY
        }
    })
    .onFinalize(() => {
      throttleOffset.value = {
        x: 0,
        y: 0
      }
    })

  const steeringOffset = useSharedValue({x: 0, y: 0})

  const steeringAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: steeringOffset.value.x}, {translateY: steeringOffset.value.y}]
    }
  })

  const steeringGesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationX < 100 && e.translationX > -100)
        steeringOffset.value = {
          x: e.translationX,
          y: 0
        }
    })
    .onFinalize(() => {
      steeringOffset.value = {
        x: 0,
        y: 0
      }
    })

  function wrapper(param: number) {
    setMessage(param)
  }

  useAnimatedReaction(
    () => {
      let mes
      if (throttleOffset.value.y > 88) {
        mes = 0
      } else if (throttleOffset.value.y > 50) {
        mes = 1
      } else if (throttleOffset.value.y > 17) {
        mes = 2
      } else if (throttleOffset.value.y > -17) {
        mes = 3
      } else if (throttleOffset.value.y > -50) {
        mes = 4
      } else if (throttleOffset.value.y > -88) {
        mes = 5
      } else {
        mes = 6
      }

      if (steeringOffset.value.x > 88) {
        mes += 7 * 6
      } else if (steeringOffset.value.x > 50) {
        mes += 7 * 5
      } else if (steeringOffset.value.x > 17) {
        mes += 7 * 4
      } else if (steeringOffset.value.x > -17) {
        mes += 7 * 3
      } else if (steeringOffset.value.x > -50) {
        mes += 7 * 2
      } else if (steeringOffset.value.x > -88) {
        mes += 7
      }

      return mes
    },
    (result, previous) => {
      if (result !== previous) {
        runOnJS(wrapper)(result)
      }
    },
    []
  )

  useEffect(() => {
    if (connected.current)
      canavar.current
        .write(String.fromCharCode(message + 44))
        .catch(message => console.log(message))
  }, [message])

  function back() {
    canavar.current.disconnect()
    navigation.goBack()
  }

  useFocusEffect(() => {
    function backAction() {
      back()
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  })

  return (
    <GestureHandlerRootView style={styles.main}>
      <View style={styles.topSide}>
        <Pressable onPress={back} style={styles.backContainer}>
          <Image source={require('../../../assets/arrow.png')} style={styles.back} />
        </Pressable>

        <Text style={styles.feedBackText}>Connected: {route.params.deviceName}</Text>
      </View>
      <View style={styles.controllerSide}>
        <View style={{...styles.steeringContainer}}>
          <View style={styles.steeringMilestoneContanier}>{steeringMileStones}</View>
          <View style={styles.steeringPath} />
          <View style={styles.steeringMilestoneContanier}>{steeringMileStones}</View>
          <GestureDetector gesture={steeringGesture}>
            <Animated.View style={[styles.controlCircle, steeringAnimatedStyles]} />
          </GestureDetector>
        </View>

        <View style={styles.throttleContainer}>
          <View style={styles.throttleMilestoneContanier}>{throttleMileStones}</View>
          <View style={styles.throttlePath} />
          <View style={styles.throttleMilestoneContanier}>{throttleMileStones}</View>
          <GestureDetector gesture={throttleGesture}>
            <Animated.View style={[styles.controlCircle, throttleAnimatedStyles]} />
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white
  },

  topSide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  backContainer: {
    position: 'absolute',
    left: 16,
    top: 16
  },

  back: {
    height: 30,
    width: 30
  },

  feedBackText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.dark
  },

  controllerSide: {
    flex: 6,
    flexDirection: 'row'
  },

  throttleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  steeringContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  throttlePath: {
    backgroundColor: colors.water,
    width: 20,
    height: 200
  },

  throttleMilestoneContanier: {
    width: 45,
    height: 200,
    justifyContent: 'space-between'
  },

  throttleMilestone: {
    width: '100%',
    height: 5,
    backgroundColor: colors.sun
  },

  steeringPath: {
    backgroundColor: colors.water,
    width: 200,
    height: 20
  },

  steeringMilestoneContanier: {
    flexDirection: 'row',
    width: 200,
    height: 45,
    justifyContent: 'space-between'
  },

  steeringMilestone: {
    width: 5,
    height: '100%',
    backgroundColor: colors.sun
  },

  controlCircle: {
    height: 80,
    aspectRatio: 1,
    backgroundColor: colors.sun,
    borderRadius: 40,
    position: 'absolute'
  }
})

export default Controller
