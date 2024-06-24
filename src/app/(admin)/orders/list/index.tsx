import { ActivityIndicator, FlatList } from "react-native";

import { useAdminOrderList } from "@/api/orders";
import OrderListItem from "@/components/ui/OrderListItem";
import { Text } from "react-native";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch the orders</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }} // vertical gap, overall padding
    />
  );
}
