import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/Login';
import Registra from './screen/Registra';
import Menu from './screen/Menu';
import Logo from './screen/LogoAbertura';
import Abertura from './screen/Abertura';
import ManterTenis from './screen/ManterTenis';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Logo} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Abertura" component={Abertura} options={{headerShown: false}}/>
      <Stack.Screen name="Registra" component={Registra} options={{headerShown: false}}/>
      <Stack.Screen name="Menu"     component={Menu} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
