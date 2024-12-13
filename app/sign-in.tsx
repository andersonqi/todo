import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await signIn(username, password);
      if (!response) {
        setMessage("Oops! Credenciales incorrectas.");
      }

      router.push("/(tabs)");
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Go Game</Text>
      <Text style={styles.subtitle}>Ingresar</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.button_text}>Ingresar</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
  },
  message: {
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 5,
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 5,
  },
  button_text: {
    color: "#fff",
    textAlign: "center",
  },
});

export default LoginScreen;
