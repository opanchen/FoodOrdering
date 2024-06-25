import { View, ActivityIndicator } from "react-native";
import { Link, Redirect, Stack } from "expo-router";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/providers/AuthProvider";

import Button from "@components/ui/Button";

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Food Ordering", headerShown: false }} />

      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Link href={"/(user)"} asChild>
          <Button text="User" />
        </Link>

        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>

        <Button text="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </>
  );
};

export default index;
