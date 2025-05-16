import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth, db } from '../services/firebaseConfig'; // CORRIGIDO
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        telefone,
        email
      });

      navigation.navigate('Login');
    } catch (error) {
      setErro('Erro ao cadastrar');
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Cadastrar" onPress={handleCadastro} />
      {erro ? <Text>{erro}</Text> : null}
    </View>
  );
}
