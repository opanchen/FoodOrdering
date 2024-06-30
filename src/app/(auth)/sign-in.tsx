import { StyleSheet, Text, TextInput, View } from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";

import { supabase } from "@/lib/supabase";

import Colors from "@/constants/Colors";

import Button from "@/components/ui/Button";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
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
      setErrors("Password is required");
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

    signInWithEmail();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />

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
        text={loading ? "Signing in..." : "Sign in"}
        onPress={onSubmit}
        disabled={loading}
      />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

export default SignInScreen;

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
