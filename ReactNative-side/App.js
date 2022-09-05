import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  function pressLeft(paramater){
    console.log(`Left ${paramater}`);
  }

  function pressRight(paramater){
    console.log(`Right ${paramater}`);
  }

  function pressForward(paramater){
    console.log(`Forward ${paramater}`);
  }

  function pressBackward(paramater){
    console.log(`Backward ${paramater}`);
  }



  return (
    <View style={styles.container}>
      <View style={{flex: 1, width:"100%"}}>
        <Pressable style={{flex:1}} onPressIn={()=> pressLeft(5)}>
          <View style={styles.left}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPressIn={()=> pressLeft(4)}>
          <View style={styles.left}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPressIn={()=> pressLeft(3)}>
          <View style={styles.left}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPressIn={()=> pressLeft(2)}>
          <View style={styles.left}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPress={()=> pressLeft(1)}>
          <View style={styles.left}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPress={()=> pressRight(1)}>
          <View style={styles.right}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPress={()=> pressRight(2)}>
          <View style={styles.right}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPress={()=> pressRight(3)}>
          <View style={styles.right}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPress={()=> pressRight(4)}>
          <View style={styles.right}></View>
        </Pressable>
        <Pressable style={{flex:1}} onPress={()=> pressRight(5)}>
          <View style={styles.right}></View>
        </Pressable>
      </View>
      <View style={{flex: 1, width:"100%", flexDirection:"row"}}>
        <Pressable style={{flex:1}}>
          <View style={styles.forward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.forward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.forward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.forward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.forward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.backward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.backward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.backward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.backward}></View>
        </Pressable>
        <Pressable style={{flex:1}}>
          <View style={styles.backward}></View>
        </Pressable>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  left: {
    flex: 1, 
    backgroundColor: "dodgerblue", 
    borderWidth: 1, 
    width:"100%",
  },
  right: {
    flex: 1, 
    backgroundColor: "aliceblue", 
    borderWidth: 1, 
    width:"100%",
  },
  forward: {
    flex: 1, 
    backgroundColor: "royalblue", 
    borderWidth: 1, 
    height:"100%",
  },
  backward: {
    flex: 1, 
    backgroundColor: "steelblue", 
    borderWidth: 1, 
    height:"100%",
  }
});
