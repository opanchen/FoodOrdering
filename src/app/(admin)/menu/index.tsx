import { ActivityIndicator, FlatList, Text } from "react-native";

import { useProductList } from "@/api/products";
import ProductListItem from "@components/ui/ProductListItem";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }} // vertical gap, overall padding
      columnWrapperStyle={{ gap: 10 }} // horizontal gap
    />
  );
}
