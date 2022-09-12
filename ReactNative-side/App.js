import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, width:"100%"}}>
        
        <Pressable style={{flex:1}} onPressIn={()=> pressLeft(1)}>
          <View style={styles.left}>
            <Text>Left</Text>
          </View>
        </Pressable>

        <Pressable style={{flex:1}} onPressIn={()=> pressRight(1)}>
          <View style={styles.right}>
          <Text>Right</Text>
          </View>
        </Pressable>
        
      </View>
      <View style={{flex: 1, width:"100%", flexDirection:"row"}}>
        <Pressable style={{flex:1}} onPressIn={() => pressBackward(1)}>
          <View style={styles.backward}>
            <Text>Backward</Text>
          </View>
        </Pressable>
        
        <Pressable style={{flex:1}} onPressIn={() => pressForward(1)}>
          <View style={styles.forward}>
          <Text>Forward</Text>
          </View>
        </Pressable>
        
      </View>
    </SafeAreaView>
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
    alignItems: "center",
    justifyContent: "center"
  },
  right: {
    flex: 1, 
    backgroundColor: "aliceblue", 
    borderWidth: 1, 
    width:"100%",
    alignItems: "center",
    justifyContent: "center"
  },
  forward: {
    flex: 1, 
    backgroundColor: "royalblue", 
    borderWidth: 1, 
    height:"100%",
    alignItems: "center",
    justifyContent: "center"
  },
  backward: {
    flex: 1, 
    backgroundColor: "steelblue", 
    borderWidth: 1, 
    height:"100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
