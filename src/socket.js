import { io } from "socket.io-client";

// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";

export const socket = io("https://api.cubaa.net:5001");
