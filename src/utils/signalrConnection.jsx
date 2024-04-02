import {
  HttpTransportType,
  HubConnectionBuilder,
  JsonHubProtocol,
  LogLevel,
} from "@microsoft/signalr";
import { LS } from "./functions";
import { appConstants } from "./variables";

const token = LS.read(appConstants.SH_CT_ACCESS_TOKEN);

const connection = new HubConnectionBuilder()
  .withUrl(`${process.env.REACT_APP_SIGNALR_URL}/notifhub`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .withAutomaticReconnect()
  .withHubProtocol(new JsonHubProtocol())
  .configureLogging(LogLevel.Information)
  .build();

// Optional: Configure connection options, such as access token or headers
// connection.on("your-event", (data) => {
//    // Handle incoming events
// });

export default connection;
