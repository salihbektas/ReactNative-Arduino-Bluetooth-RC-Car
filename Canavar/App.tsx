import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";


function App(){

  const steeringOffset = useSharedValue({ x: 0, y: 0 })

  const steeringAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: steeringOffset.value.x },
        { translateY: steeringOffset.value.y }
      ],
    };
  });

  const steeringGesture = Gesture.Pan()
    .onUpdate((e) => {
      if(e.translationY < 121 && e.translationY > -121)
        steeringOffset.value = {
          x: 0,
          y: e.translationY
        };
    })
    .onFinalize(() => {
      steeringOffset.value = {
        x: 0,
        y: 0,
      };
    });


    const throttleOffset = useSharedValue({ x: 0, y: 0 })

    const throttleAnimatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: throttleOffset.value.x },
          { translateY: throttleOffset.value.y }
        ],
      };
    });
  
    const throttleGesture = Gesture.Pan()
      .onUpdate((e) => {
        if(e.translationX < 120 && e.translationX > -120)
          throttleOffset.value = {
            x: e.translationX,
            y: 0
          };
      })
      .onFinalize(() => {
        throttleOffset.value = {
          x: 0,
          y: 0,
        };
      });


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <GestureDetector gesture={steeringGesture}>
            <Animated.View style={[styles.box, steeringAnimatedStyles]} />
          </GestureDetector>
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
          
          <GestureDetector gesture={throttleGesture}>
            <Animated.View style={[styles.box, throttleAnimatedStyles]} />
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
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
    height: 260
  },
  topMilestoneContanier:{
    width:30,
    height: 260,
    justifyContent: 'space-between'
  },
  topMilestone:{
    width: '100%',
    height: 10,
    backgroundColor: 'goldenrod'
  },
  bottomPath: {
    backgroundColor: 'cadetblue',
    width: 260,
    height: 20
  },
  bottomMilestoneContanier:{
    flexDirection: 'row',
    width: 260,
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
    position: 'absolute'
  },
});

export default App;
