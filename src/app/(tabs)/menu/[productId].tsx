import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: `Details: ${productId}` }} />

      <Text>ProductDetailsScreen for id: {productId}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
