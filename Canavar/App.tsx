import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Controller from './src/screens/Controller/Controller';
import Scan from './src/screens/Scan/Scan';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Controller" component={Controller} options={{orientation: 'landscape'}} />
        <Stack.Screen name="Scan" component={Scan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;