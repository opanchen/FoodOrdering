import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { useProduct } from "@/api/products";

import { defaultPizzaImage } from "@/constants/common";
import Colors from "@/constants/Colors";

import RemoteImage from "@/components/ui/RemoteImage";

const ProductDetailsScreen = () => {
  const { productId: idString } = useLocalSearchParams();

  if (typeof idString === "undefined") {
    return <Text>Product not found</Text>;
  }

  const productId = parseFloat(
    typeof idString === "string" ? idString : idString[0]
  );

  const { data: product, error, isLoading } = useProduct(productId);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !product) {
    return <Text>Failed to fetch products</Text>;
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

      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
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
