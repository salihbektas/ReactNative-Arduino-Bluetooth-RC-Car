import React, { useRef } from "react";
import { Animated, PanResponder, View, StatusBar, StyleSheet, useColorScheme, ViewStyle, Text, Modal } from "react-native";


function App(){

  const steeringPan = useRef(new Animated.ValueXY()).current;

  const steeringPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: steeringPan.y,
      },
    ],{useNativeDriver: false}),
    onPanResponderRelease: () => {
      Animated.spring(
        steeringPan, // Auto-multiplexed
        {toValue: {x: 0, y: 0}, useNativeDriver: true}, // Back to zero
      ).start();
    },
  });


  const throttlePan = useRef(new Animated.ValueXY()).current;

  const throttlePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: throttlePan.x,
      },
    ],{useNativeDriver: false}),
    onPanResponderRelease: () => {
      Animated.spring(
        throttlePan, // Auto-multiplexed
        {toValue: {x: 0, y: 0}, useNativeDriver: true}, // Back to zero
      ).start();
    },
  });

  return (
    <View style={{flex:1}}>
      <View style={styles.topContainer}>
        <View style={styles.topMilestoneContanier}>
          <View style={styles.topMilestone} />
          <View style={styles.topMilestone} />
          <View style={styles.topMilestone} />
          <View style={styles.topMilestone} />
          <View style={styles.topMilestone} />
        </View>
        <View style={styles.topPath} />
        <View style={styles.topMilestoneContanier}>
          <View style={styles.topMilestone} />
          <View style={styles.topMilestone} />
          <View style={styles.topMilestone} />
          <View style={styles.topMilestone} />
          <View style={styles.topMilestone} />
        </View>
        <Animated.View
          style={{
            position: "absolute",
            transform: [ {translateY: steeringPan.y}],
          }}
          {...steeringPanResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
      </View>

      
      <View style={{...styles.bottomContainer}}>
        <View style={styles.bottomMilestoneContanier}>
          <View style={styles.bottomMilestone} />
          <View style={styles.bottomMilestone} />
          <View style={styles.bottomMilestone} />
          <View style={styles.bottomMilestone} />
          <View style={styles.bottomMilestone} />
        </View>
        <View style={styles.bottomPath} />
        <View style={styles.bottomMilestoneContanier}>
          <View style={styles.bottomMilestone} />
          <View style={styles.bottomMilestone} />
          <View style={styles.bottomMilestone} />
          <View style={styles.bottomMilestone} />
          <View style={styles.bottomMilestone} />
        </View>
        <Animated.View
          style={{
            position: "absolute",
            transform: [ {translateX: throttlePan.x}],
          }}
          {...throttlePanResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    flexDirection: 'row'
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2
  },
  topPath: {
    backgroundColor: 'cadetblue',
    width: 20,
    height: '80%'
  },
  topMilestoneContanier:{
    width:30,
    height: "80%",
    justifyContent: 'space-between'
  },
  topMilestone:{
    width: '100%',
    height: 10,
    backgroundColor: 'goldenrod'
  },
  bottomPath: {
    backgroundColor: 'cadetblue',
    width: '80%',
    height: 20
  },
  bottomMilestoneContanier:{
    flexDirection: 'row',
    width: '80%',
    height: 30,
    justifyContent: 'space-between'
  },
  bottomMilestone:{
    width: 10,
    height: '100%',
    backgroundColor: 'goldenrod'
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: 'burlywood',
    borderRadius: 25,
  },
});

export default App;
