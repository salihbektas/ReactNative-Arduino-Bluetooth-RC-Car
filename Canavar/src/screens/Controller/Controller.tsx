import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";


function Controller(){

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
      if(e.translationY < 130 && e.translationY > -130)
      throttleOffset.value = {
          x: 0,
          y: e.translationY
        };
    })
    .onFinalize(() => {
      throttleOffset.value = {
        x: 0,
        y: 0,
      };
    });


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
        if(e.translationX < 130 && e.translationX > -130)
          steeringOffset.value = {
            x: e.translationX,
            y: 0
          };
      })
      .onFinalize(() => {
        steeringOffset.value = {
          x: 0,
          y: 0,
        };
      });


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue'}} ></View>
      <View style={{flex: 6, flexDirection: 'row'}}>

      <View style={{...styles.leftContainer}}>
          <View style={styles.leftMilestoneContanier}>
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
          </View>
          <View style={styles.leftPath} />
          <View style={styles.leftMilestoneContanier}>
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
            <View style={styles.leftMilestone} />
          </View>
          
          <GestureDetector gesture={steeringGesture}>
            <Animated.View style={[styles.box, steeringAnimatedStyles]} />
          </GestureDetector>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.rightMilestoneContanier}>
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
          </View>
          <View style={styles.rightPath} />
          <View style={styles.rightMilestoneContanier}>
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
            <View style={styles.rightMilestone} />
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
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightPath: {
    backgroundColor: 'cadetblue',
    width: 20,
    height: 260
  },
  rightMilestoneContanier:{
    width:30,
    height: 260,
    justifyContent: 'space-between'
  },
  rightMilestone:{
    width: '100%',
    height: 5,
    backgroundColor: 'goldenrod'
  },
  leftPath: {
    backgroundColor: 'cadetblue',
    width: 260,
    height: 20
  },
  leftMilestoneContanier:{
    flexDirection: 'row',
    width: 260,
    height: 30,
    justifyContent: 'space-between'
  },
  leftMilestone:{
    width: 5,
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

export default Controller;
