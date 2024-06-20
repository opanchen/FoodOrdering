import { Image, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import { defaultPizzaImage } from "@/constants/common";
import products from "@assets/data/products";

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams();

  const product = products.find(({ id }) => id.toString() === productId);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    fontSize: 20,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
