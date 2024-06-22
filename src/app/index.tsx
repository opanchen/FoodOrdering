import { View, Text, ActivityIndicator } from "react-native";
import { Link, Redirect } from "expo-router";

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

  // TODO: Uncomment and implement logout button for user or smth like that
  // if (!isAdmin) {
  //   return <Redirect href={"/(user)"} />;
  // }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      {/* temporary approach */}
      {isAdmin && (
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>
      )}

      <Button text="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default index;
