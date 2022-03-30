import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("/push")
  .withAutomaticReconnect()
  .configureLogging(LogLevel.Information)
  .build();

export { connection };