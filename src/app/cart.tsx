import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/ui/CartListItem";
import Button from "@/components/ui/Button";

const CartScreen = () => {
  const { items, total, checkout } = useCart();
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={styles.total}>Total: ${total}</Text>
      <Button onPress={checkout} text="Checkout" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  total: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
  },
});
