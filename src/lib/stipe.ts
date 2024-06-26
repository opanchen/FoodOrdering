import { Alert } from "react-native";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

import { supabase } from "@/lib/supabase";

const fetchPaymentSheetParams = async (amount: number) => {
  // Create payment session for our customer
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });

  if (data) {
    return data;
  }

  Alert.alert("Error fetching payment sheet params");
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  console.log("[STRIPE]: Initializing payment sheet, for ", amount);

  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  );

  if (!paymentIntent || !publishableKey) return;

  await initPaymentSheet({
    merchantDisplayName: "opanchen.dev",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: "Jane Doe",
    },
  });
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    console.log("[STRIPE_ERROR]: ", error.message);
    Alert.alert(error.message);
    return false;
  }

  return true;
};
