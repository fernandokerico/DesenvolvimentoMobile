import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getGastos, addGasto, deleteGasto } from '../services/firestoreService'; // CORRIGIDO
import CustomInput from '../components/CustomInputs';
import Button from '../components/Buttons';



const GastosScreen = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const dados = await getGastos();
        setGastos(dados);
      } catch (error) {
        console.log('Erro ao carregar gastos:', error);
      }
    };

    fetchGastos();
  }, []);

  const handleAddGasto = () => {
    const novoGasto = {
      valor: 100,
      categoria: 'Alimentação',
      data: new Date(),
    };

    addGasto(novoGasto)
      .then((id) => {
        console.log('Novo gasto adicionado com ID:', id);
      })
      .catch((error) => {
        console.log('Erro ao adicionar gasto:', error);
      });
  };

  const handleDeleteGasto = (id) => {
    deleteGasto(id)
      .then(() => {
        console.log('Gasto excluído!');
      })
      .catch((error) => {
        console.log('Erro ao excluir gasto:', error);
      });
  };

  return (
    <View>
      <Button title="Adicionar Gasto" onPress={handleAddGasto} />
      <FlatList
        data={gastos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.categoria}: {item.valor}</Text>
            <Button title="Excluir" onPress={() => handleDeleteGasto(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default GastosScreen;
