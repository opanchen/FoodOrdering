import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

import { supabase } from "@/lib/supabase";
import { registerForPushNotificationsAsync } from "@/lib/notifications";

import { useAuth } from "@/providers/AuthProvider";

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { profile } = useAuth();
  const [newToken, setNewToken] = useState<string | undefined>();
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();

  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    if (!newToken || !profile) return;

    const savePushToken = async (newToken: string | undefined) => {
      setExpoPushToken(newToken);

      if (newToken) {
        //   Update the token in the database
        await supabase
          .from("profiles")
          .update({ expo_push_token: newToken })
          .eq("id", profile.id);
      }
    };

    savePushToken(newToken);
  }, [newToken, profile]);

  // ! The code doesn't work correctly - use additional useEffect ahead
  //   const savePushToken = async (newToken: string | undefined) => {
  //     setExpoPushToken(newToken);

  //     if (!newToken) return;

  //     await supabase
  //       .from("profiles")
  //       .update({ expo_push_token: newToken })
  //       .eq("id", profile.id);
  //   };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      //   savePushToken(token);
      setNewToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  console.log("Push token: ", expoPushToken);
  notification && console.log("Notif: ", notification);

  return <>{children}</>;
};

export default NotificationProvider;
