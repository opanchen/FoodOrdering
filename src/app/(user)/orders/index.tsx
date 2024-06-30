import { ActivityIndicator, FlatList, Text } from "react-native";
import { Stack } from "expo-router";

import { useMyOrderList } from "@/api/orders";

import OrderListItem from "@/components/ui/OrderListItem";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch the orders</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />

      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }} // vertical gap, overall padding
      />
    </>
  );
}
