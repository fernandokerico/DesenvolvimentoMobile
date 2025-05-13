import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './app/screens/LoginScreen';
import CadastroScreen from './app/screens/CadastroScreen';
import HomeScreen from './app/screens/HomeScreen';
import ContaScreen from './app/screens/ContaScreen';
import EsqueciSenhaScreen from './app/screens/EsqueciSenhaScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenhaScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Conta" component={ContaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
