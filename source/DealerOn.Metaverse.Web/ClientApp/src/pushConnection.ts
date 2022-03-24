import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("/push")
  .withAutomaticReconnect()
  .configureLogging(LogLevel.Information)
  .build();

const connected = connection.start();

export { connected, connection };