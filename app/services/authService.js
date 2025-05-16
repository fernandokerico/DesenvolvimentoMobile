// service/authService.js
import { firebase } from './firebaseConfig';

// Função de cadastro de usuário
export const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Usuário criado com sucesso
      return userCredential.user;
    })
    .catch(error => {
      throw error.message;
    });
};

// Função de login de usuário
export const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      return userCredential.user;
    })
    .catch(error => {
      throw error.message;
    });
};

// Função para resetar senha
export const resetPassword = (email) => {
  return firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log('Email de recuperação de senha enviado.');
    })
    .catch(error => {
      throw error.message;
    });
};
