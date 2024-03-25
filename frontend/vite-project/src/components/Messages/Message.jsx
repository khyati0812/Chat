// import React from "react";
// import useConversation from "../../store/zustand/useConversation";
// export const Message = ({ message }) => {
//   const auth = localStorage.getItem("logged_in_user");
//   console.log(auth);
//   console.log(message);
//   const { selectedConversation } = useConversation();
//   // const loggedInUserId = auth ? JSON.parse(auth).id : null;
//   console.log(selectedConversation._id);
//   const fromMe = message.senderId === auth;
//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   const bubbleBgColor = fromMe ? "bg-blue-500" : "";
//   const createdAt = new Date(message.createdAt);
//   const time = createdAt.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="Tailwind CSS chat bubble component"
//             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//           />
//         </div>
//       </div>

//       <div className={`chat-bubble text-white ${bubbleBgColor}`}>
//         {message.message}
//       </div>
//       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-black">
//         {time}
//       </div>
//     </div>
//   );
// };
import React from "react";
import useConversation from "../../store/zustand/useConversation";

export const Message = ({ message }) => {
  const auth = localStorage.getItem("logged_in_user");
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === auth;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  // Check if message.createdAt is a valid date
  const createdAt =
    message.createdAt instanceof Date
      ? message.createdAt
      : new Date(message.createdAt);
  const time = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Avatar"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>

      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-black">
        {time}
      </div>
    </div>
  );
};
