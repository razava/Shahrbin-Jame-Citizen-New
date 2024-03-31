import { useCallback, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  HttpTransportType,
  HubConnectionBuilder,
  JsonHubProtocol,
  LogLevel,
} from "@microsoft/signalr";
// import connection from "../utils/signalrConnection";
import { postConnectionId } from "../services/MessagesApi";
import connection from "../utils/signalrConnection";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import useNotification from "./useNotification";
import { appConstants } from "../utils/variables";
import useAuthenticate from "./useAuthenticate";

const useSignalR = (callBack = (f) => f) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthenticate();
  const { pathname } = useLocation();
  const updateNotificationState = useNotification((state) => state.update);
  const postConnectionIdMutation = useMutation({
    mutationKey: ["connectionId"],
    mutationFn: postConnectionId,
    onSuccess: (res) => {},
    onError: (err) => {},
  });

  useEffect(() => {
    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR connected");

        postConnectionIdMutation.mutate(connection.connectionId);

        connection.on("Update", (data) => {
          if (pathname == "/user/notifications") {
            callBack();
          }
          localStorage.setItem(appConstants.SH_CT_NOTIFICATION_STATE, "true");
          updateNotificationState();
          toast("یک پیام جدید دارید.", { type: "info" });
        });
      } catch (err) {
        console.error("SignalR connection failed: ", err);
      }
    };
    
    if (isAuthenticated) {
      startConnection();
    }
    // console.log(connection.connectionId);

    // return () => {
    //   if (connection.state === "Connected") {
    //     connection.stop();
    //     console.log("SignalR disconnected");
    //   }
    // };
  }, [isAuthenticated]);

  // console.log(connection.state);
  // useEffect(() => {
  //   console.log(11111);
  //   console.log(connection.state);
  //   // Subscribe to events and update query data accordingly
  //   // Example: Listen for a "newMessage" event and update a query with the new message data

  //   console.log(connection.state);

  // }, [queryClient]);

  // return connection;
};

export default useSignalR;
