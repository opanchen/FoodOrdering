import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Real-time update, if new orders appear
export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orderSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          //   console.log("Change received!", payload);
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
      )
      .subscribe();

    return () => {
      orderSubscription.unsubscribe();
    };
  }, []);
};

// Real-time update, if one order changes
export const useUpdateOrderSubscription = (orderId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orderSubscription = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
        }
      )
      .subscribe();

    return () => {
      orderSubscription.unsubscribe();
    };
  }, []);
};
