import { FlatList } from "react-native";

import products from "@assets/data/products";
import ProductListItem from "@components/ui/ProductListItem";

export default function MenuScreen() {
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
