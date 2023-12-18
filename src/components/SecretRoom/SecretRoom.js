// import React, { useState, useEffect } from "react";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import { IconButton } from "@mui/material";
// import "./SecretRoom.css";
// import { useLocation } from "react-router-dom";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");

// const SecretRoom = () => {
//   const location = useLocation();
//   const room = location.state?.room;

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [ownid, setOwnId] = useState("");
//   console.log(room);
//   useEffect(() => {
//     console.log("useEffect is running");
//     socket.on("connect", () => {
//       console.log("Socket connected");
//     });

//     socket.on("initialMessages", (initialMessages) => {
//       console.log("Initial messages received:", initialMessages);
//       setMessages(initialMessages);
//     });

//     socket.on("chatMessage", (message) => {
//       console.log("Chat message received:", message);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       console.log("Cleanup function");
//       socket.disconnect();
//       socket.off("chatMessage");
//       socket.off("initialMessages");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (newMessage.trim() !== "") {
//       socket.emit("chatMessage", {
//         user: socket.id,
//         content: newMessage,
//         room: room,
//       });

//       setOwnId(socket.id);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="chat-room-container">
//       <div className="chat-room">
//         {/* Header */}
//         <header className="chat-room-header">
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <h1>Secret Room</h1>
//             <p style={{ fontSize: "0.6rem" }}>
//               Share Your Thoughts in Secret Room
//             </p>
//           </div>
//         </header>

//         {/* Chat Container */}
//         <div
//           className="chat-container"
//           style={{ margin: "10px", padding: "10px" }}
//         >
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className="user-message-container"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: message.ownid === room ? "flex-end" : "flex-start",
//                 margin: "5px",
//               }}
//             >
//               {message.ownid === room ? null : (
//                 <p
//                   style={{
//                     fontSize: "0.9rem",
//                     color: "#ceb04f",
//                     textAlign:
//                       message.user === ownid || message.ownid === room
//                         ? "end"
//                         : "start",
//                   }}
//                 >
//                   {message.username}
//                 </p>
//               )}

//               <div
//                 style={{
//                   padding: "10px",
//                   backgroundColor: "rgba(127, 127, 127, 0.3)",
//                   borderRadius: `${
//                     message.ownid === room ? "8px 0 8px 8px" : "0 8px 8px 8px"
//                   }`,
//                   display: "flex",
//                   fontSize: "0.8rem",
//                   color: "#EAEAEA",
//                   maxWidth: "80%",
//                   textAlign: message.ownid === room ? "end" : "start",
//                 }}
//               >
//                 {/* Check if message.content is an object or a string */}
//                 {/* {typeof message.content === "object"
//                   ? message.content.content
//                   : message.content} */}
//                 {message.content}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Text Send Container */}
//         <div className="text-send-container">
//           <div className="textarea-container">
//             <textarea
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <IconButton onClick={sendMessage}>
//               <ArrowUpwardIcon style={{ color: "#ceb04f" }} />
//             </IconButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SecretRoom;
