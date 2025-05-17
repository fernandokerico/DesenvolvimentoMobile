import { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CustomInput from '../components/CustomInputs';
import Button from '../components/Buttons';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(() => setErro('Email ou senha inválidos'));
  };

  return (
    <View>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Entrar" onPress={handleLogin} />
      {erro ? <Text>{erro}</Text> : null}
      <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
      <Button title="Esqueci minha senha" onPress={() => navigation.navigate('EsqueciSenha')} />
    </View>
  );
}
