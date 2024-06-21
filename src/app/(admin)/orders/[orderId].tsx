import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import orders from "@assets/data/orders";
import Colors from "@/constants/Colors";
import { orderStatusList } from "@/constants/common";

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {orderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
