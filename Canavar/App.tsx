import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen'
import Controller from './src/screens/Controller/Controller'
import Scan from './src/screens/Scan/Scan'
import {RootStackParamList} from './src/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Scan">
        <Stack.Screen name="Scan" component={Scan} options={{orientation: 'portrait'}} />
        <Stack.Screen
          name="Controller"
          component={Controller}
          options={{orientation: 'landscape'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
