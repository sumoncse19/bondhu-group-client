// // socketStore.ts
// import { io, Socket } from "socket.io-client";
// import { create } from "zustand";
// import baseUrl from "../../../config";

// interface SocketStoreState {
//   socket: Socket | null;
//   connectSocket: () => void;
//   disconnectSocket: () => void;
//   sendUserId: (id: string) => void;
// }

// export const useSocketStore = create<SocketStoreState>((set, get) => ({
//   socket: null,

//   // Connect the socket
//   connectSocket: () => {
//     const socketInstance = io("https://bondhu-group-server.onrender.com");

//     console.log(socketInstance);

//     socketInstance.on("connect", () => {
//       console.log("Socket connected:", socketInstance.id);
//       set({ socket: socketInstance });
//     });

//     // Handle chat message
//     socketInstance.on("chatMessage", (data) => {
//       console.log("Received chat message:", data.content);
//     });

//     // Handle notifications
//     socketInstance.on("notification", (data) => {
//       console.log("Received notification:", data.message);
//     });

//     // Cleanup function for disconnecting the socket
//     return () => {
//       socketInstance.disconnect();
//     };
//   },

//   // Disconnect the socket
//   disconnectSocket: () => {
//     const socket = get().socket;
//     if (socket) {
//       socket.disconnect();
//       set({ socket: null });
//       console.log("Socket disconnected");
//     }
//   },

//   // Send user ID to the register channel
//   sendUserId: (id: string) => {
//     const socket = get().socket;
//     if (socket && id) {
//       socket.emit("register", id);
//       console.log("Sent user id to register channel:", id);
//     }
//   },
// }));
