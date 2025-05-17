import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "./firebaseConfig";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { StatusBar } from "expo-status-bar"; // Opcional: melhor visual

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializationError, setInitializationError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUser) => {
        setUser(authUser);
        setLoading(false);
      },
      (error) => {
        setInitializationError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (initializationError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Ocorreu um erro ao iniciar o aplicativo. Tente novamente mais tarde.
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" /> {/* Opcional: aparência da barra superior */}
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    margin: 10,
    textAlign: "center",
  },
});
