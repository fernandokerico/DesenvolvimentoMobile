import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { auth, db } from '../services/firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import CustomInput from '../components/CustomInputs';
import Button from '../components/Buttons';


export default function HomeScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [gastos, setGastos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const gastosRef = collection(db, 'gastos');
    const q = query(gastosRef, where('userId', '==', auth.currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setGastos(lista);
    });

    return () => unsubscribe();
  }, []);

  const handleSalvar = async () => {
    if (!descricao || !valor) return;

    if (editandoId) {
      await updateDoc(doc(db, 'gastos', editandoId), {
        descricao,
        valor,
        data: new Date()
      });
      setEditandoId(null);
    } else {
      await addDoc(collection(db, 'gastos'), {
        descricao,
        valor,
        data: new Date(),
        userId: auth.currentUser.uid
      });
    }

    setDescricao('');
    setValor('');
  };

  const handleEditar = (item) => {
    setDescricao(item.descricao);
    setValor(item.valor);
    setEditandoId(item.id);
  };

  const handleExcluir = async (id) => {
    await deleteDoc(doc(db, 'gastos', id));
  };

  const handleLogout = () => {
    signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View>
      <Text>Adicionar ou Editar Gasto</Text>
      <CustomInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <CustomInput placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric" />
      <Button title={editandoId ? "Salvar Edição" : "Adicionar"} onPress={handleSalvar} />

      <FlatList
        data={gastos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditar(item)}>
            <View>
              <Text>{item.descricao} - R$ {item.valor}</Text>
              <Button title="Excluir" onPress={() => handleExcluir(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />

      <Button title="Minha Conta" onPress={() => navigation.navigate('Conta')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
