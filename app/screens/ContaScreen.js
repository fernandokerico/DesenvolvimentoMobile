import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import CustomInput from '../components/CustomInputs';
import Button from '../components/Buttons';

export default function ContaScreen() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUsuario(docSnap.data());
      }
    };
    buscarDados();
  }, []);

  return (
    <View>
      {usuario && (
        <>
          <Text>Nome: {usuario.nome}</Text>
          <Text>Email: {usuario.email}</Text>
          <Text>Telefone: {usuario.telefone}</Text>
        </>
      )}
    </View>
  );
}
