import { FlatList } from "react-native";

import orders from "@assets/data/orders";
import OrderListItem from "@/components/ui/OrderListItem";

export default function OrdersScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }} // vertical gap, overall padding
    />
  );
}
