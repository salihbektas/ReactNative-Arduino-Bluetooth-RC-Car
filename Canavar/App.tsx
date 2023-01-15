import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, ViewStyle } from "react-native";

import { Colors } from 'react-native/Libraries/NewAppScreen';


function App(){

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
