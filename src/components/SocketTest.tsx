// "use client";

// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import baseUrl from "../../config";

// const SocketTest = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   const id: string = Cookies.get("id") || "";

//   useEffect(() => {
//     // Connect to the Socket.IO server
//     const socketInstance = io("https://bondhu-group-server.onrender.com");

//     // Ensure socket is set once connected
//     socketInstance.on("connect", () => {
//       setSocket(socketInstance);
//       console.log("Socket connected:", socketInstance.id);
//     });

//     // Listen for chat messages
//     socketInstance.on("chatMessage", (data) => {
//       console.log("Received chat message:", data.content);
//     });

//     // Listen for notifications
//     socketInstance.on("notification", (data) => {
//       console.log("Received notification:", data.message);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   // Send user id to the register channel
//   const sendUserId = () => {
//     if (socket && id) {
//       console.log("Sent user id to register channel:", id);
//       socket.emit("register", id);
//     }
//   };

//   // Send a chat message to the server
//   const sendMessage = () => {
//     if (socket) {
//       socket.emit("chatMessage", { content: "Hello from client!" });
//       // socket.emit("register", { content: id });
//     }
//   };

//   // Send a notification to the server
//   const sendNotification = () => {
//     if (socket) {
//       socket.emit("notification", { message: "Client notification" });
//     }
//   };

//   useEffect(() => {
//     // Only send user ID if socket is ready and ID exists
//     if (socket && id) {
//       console.log("socekt and id", socket, id);
//       sendUserId();
//     }
//   }, [socket, id]);

//   return (
//     <div>
//       {/* <h1>Socket.IO Client Test</h1>
//       <button onClick={sendMessage}>Send Chat Message</button>
//       <button onClick={sendNotification}>Send Notification</button> */}
//     </div>
//   );
// };

// export default SocketTest;
