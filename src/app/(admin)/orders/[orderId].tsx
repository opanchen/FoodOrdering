import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import { notifyUserAboutOrderUpdate } from "@/lib/notifications";

import { useOrderDetails, useUpdateOrder } from "@/api/orders";

import { orderStatusList } from "@/constants/common";
import Colors from "@/constants/Colors";

import OrderListItem from "@/components/ui/OrderListItem";
import OrderedProductListItem from "@/components/ui/OrderedProductListItem";

import { OrderStatus } from "@/types";

const OrderDetailsScreen = () => {
  const { orderId: idString } = useLocalSearchParams();

  if (typeof idString === "undefined") {
    return <Text>Order not found</Text>;
  }

  const orderId = parseFloat(
    typeof idString === "string" ? idString : idString[0]
  );

  const { data: order, isLoading, error } = useOrderDetails(orderId);
  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatus = async (status: OrderStatus) => {
    updateOrder({ orderId, updatedFields: { status } });

    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status });
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !order) {
    return <Text>Failed to fetch the order</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      {order.order_items && (
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
                    onPress={() => updateStatus(status)}
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
      )}
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
