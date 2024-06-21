import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { defaultPizzaImage } from "@/constants/common";
import Colors from "@/constants/Colors";
import products from "@assets/data/products";

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams();

  const product = products.find(({ id }) => id.toString() === productId);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?productId=${productId}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

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
