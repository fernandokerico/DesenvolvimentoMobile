// service/firestoreService.js
import { firebase } from './firebaseConfig';

const db = firebase.firestore();

// Função para adicionar um gasto
export const addGasto = (gasto) => {
  return db.collection('gastos').add(gasto)
    .then(docRef => {
      console.log('Gasto adicionado com ID:', docRef.id);
      return docRef.id;
    })
    .catch(error => {
      throw error.message;
    });
};

// Função para listar os gastos
export const getGastos = () => {
  return db.collection('gastos').get()
    .then(snapshot => {
      const gastos = snapshot.docs.map(doc => doc.data());
      return gastos;
    })
    .catch(error => {
      throw error.message;
    });
};

// Função para editar um gasto
export const updateGasto = (id, gasto) => {
  return db.collection('gastos').doc(id).update(gasto)
    .then(() => {
      console.log('Gasto atualizado!');
    })
    .catch(error => {
      throw error.message;
    });
};

// Função para excluir um gasto
export const deleteGasto = (id) => {
  return db.collection('gastos').doc(id).delete()
    .then(() => {
      console.log('Gasto excluído!');
    })
    .catch(error => {
      throw error.message;
    });
};

