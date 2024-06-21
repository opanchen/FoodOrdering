import { StyleSheet, Text, View, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import orders from "@assets/data/orders";
import OrderListItem from "@/components/ui/OrderListItem";
import OrderedProductListItem from "@/components/ui/OrderedProductListItem";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();

  const order = orders.find((order) => order.id.toString() === orderId);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderedProductListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
