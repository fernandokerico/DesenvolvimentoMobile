import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../services/firebaseConfig'; // CORRIGIDO
import { sendPasswordResetEmail } from 'firebase/auth';


export default function EsqueciSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRecuperarSenha = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMensagem('Email de recuperação enviado!');
    } catch (error) {
      setMensagem('Erro ao enviar email.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Enviar recuperação" onPress={handleRecuperarSenha} />
      {mensagem ? <Text>{mensagem}</Text> : null}
      <Button title="Voltar para Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
