import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/providers/AuthProvider";

import { InsertTables, UpdateTables } from "@/types";

// All the existing orders
export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];

  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useMyOrderList = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ["orders", { userId }],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useOrderDetails = (orderId: number) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", orderId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: async (data: InsertTables<"orders">) => {
      const { data: newProduct, error } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select() // to select a newly created order
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newProduct;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      updatedFields,
    }: {
      orderId: number;
      updatedFields: UpdateTables<"orders">;
    }) => {
      const { data: updatedOrder, error } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", orderId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return updatedOrder;
    },
    onSuccess: async (_, { orderId }) => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({
        queryKey: ["orders", orderId],
      });
    },
  });
};
