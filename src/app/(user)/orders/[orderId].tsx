import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import OrderListItem from "@/components/ui/OrderListItem";
import OrderedProductListItem from "@/components/ui/OrderedProductListItem";
import { useOrderDetails } from "@/api/orders";

const OrderDetailsScreen = () => {
  const { orderId: idString } = useLocalSearchParams();

  if (typeof idString === "undefined") {
    return <Text>Order not found</Text>;
  }

  const orderId = parseFloat(
    typeof idString === "string" ? idString : idString[0]
  );

  const { data: order, isLoading, error } = useOrderDetails(orderId);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
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
