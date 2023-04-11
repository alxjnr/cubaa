import { io } from "socket.io-client";

// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";

export const socket = io("https://54.38.78.231:80");
