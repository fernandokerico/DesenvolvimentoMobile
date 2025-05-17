import { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import CustomInput from '../components/CustomInputs';
import Button from '../components/Buttons'; // seu botão personalizado

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
        email,
      });

      navigation.navigate('Login');
    } catch (error) {
      console.error(error); // ajuda na depuração
      setErro('Erro ao cadastrar');
    }
  };

  return (
    <View>
      <CustomInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <CustomInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Cadastrar" onPress={handleCadastro} />
      {erro ? <RNText>{erro}</RNText> : null}
    </View>
  );
}
