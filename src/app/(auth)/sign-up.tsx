import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";

import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrors(error.message);
    } else resetFields();

    setLoading(false);
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const validateInput = () => {
    setErrors("");

    if (!email) {
      setErrors("Name is required");
      return false;
    }

    if (!password) {
      setErrors("Price is required");
      return false;
    }

    if (password.trim().length < 6) {
      setErrors("Password has to be at least 6 characters");
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validateInput()) return;

    signUpWithEmail();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="johndoe@gmail.com"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.errors}>{errors}</Text>
      <Button
        text={loading ? "Creating an account..." : "Create an account"}
        onPress={onSubmit}
        disabled={loading}
      />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  label: {
    color: "gray",
    fontSize: 16,
  },

  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    backgroundColor: "white",
  },

  errors: {
    color: "red",
  },

  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
