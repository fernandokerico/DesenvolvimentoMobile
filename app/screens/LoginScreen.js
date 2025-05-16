import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../services/firebaseConfig'; // CORRIGIDO
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => setErro('Email ou senha inválidos'));
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Entrar" onPress={handleLogin} />
      {erro ? <Text>{erro}</Text> : null}
      <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
      <Button title="Esqueci minha senha" onPress={() => navigation.navigate('EsqueciSenha')} />
    </View>
  );
}
