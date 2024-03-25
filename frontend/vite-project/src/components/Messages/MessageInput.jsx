// import { BsSend } from "react-icons/bs";
// import { useState } from "react";
// import React from "react";

// export const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const handleMessage = (e) => {
//     e.preventDefault();
//     setMessage(e.target.value);
//     console.log(message);
//   };
//   return (
//     <form className="px-4 my-3">
//       <div className="w-full relative">
//         <input
//           type="text"
//           onChange={handleMessage}
//           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           value={message}
//           placeholder="Send a message"
//         />
//         <button
//           className="submit absolute inset-y-0 end-0 flex items-center pe-3"
//           onSubmit={handleMessage}
//         >
//           <BsSend />
//         </button>
//       </div>
//     </form>
//   );
// };

// MessageInput.js

// MessageInput.js
// MessageInput.js
import { BsSend } from "react-icons/bs";
import { useState } from "react";
import React from "react";
import useConversation from "../../store/zustand/useConversation";
import { useSendMessage } from "../../Hooks/useSendMessage";
export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          type="submit"
          className="submit absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};
