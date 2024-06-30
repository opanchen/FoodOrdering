import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/providers/AuthProvider";

import { defaultPizzaImage } from "@/constants/common";
import Colors from "@/constants/Colors";

const ProfileScreen = () => {
  const { isAdmin } = useAuth();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: defaultPizzaImage }} style={styles.image} />

      {isAdmin && (
        <Link href="/" style={styles.adminLink}>
          Admin
        </Link>
      )}
      <Pressable onPress={signOut}>
        <Text style={styles.signOut}>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  image: {
    width: 240,
    aspectRatio: 1,
  },

  adminLink: {
    marginVertical: 16,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.tint,
  },

  signOut: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.tint,
  },
});
