import React from "react";
import { Messages } from "./Messages";
import { MessageInput } from "./MessageInput";
import { TiMessage } from "react-icons/ti";
import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../../store/zustand/useConversation";
export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => {
      setSelectedConversation(null); // Clear selected conversation on component unmount
    };
  }, []);
  const noChatSelected = true;
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
// export const NoChatSelected = ({ className }) => {
//   const auth = localStorage.getItem("logged_in_user");
//   console.log("Hey");
//   return (
//     <div className="bg-slate-500 px-4 py-2 mb-2 mt-56">
//       <article className={`p-4 ${className}`}>
//         <h1 className="text-black mb-4">Welcome,John Doe!👋</h1>
//         <p className="text-black mt-20">
//           Select a chat to start Messaging!
//           <TiMessage className="text-center text-6xl" />
//         </p>
//       </article>
//     </div>
//   );
// };
export const NoChatSelected = ({ className }) => {
  const [fullName, setFullName] = useState(null); // State to store the full name

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const userId = localStorage.getItem("logged_in_user");

        // Make a GET request to fetch the full name
        const response = await axios.get(`/api/auth/${userId}`);

        // If the request is successful, set the full name in state
        setFullName(response.data.fullName);
      } catch (error) {
        console.error("Error fetching full name:", error);
      }
    };

    fetchFullName(); // Call the function to fetch full name when component mounts
  }, []);

  return (
    <div className="bg-slate-500 px-4 py-2 mb-2 mt-56">
      <article className={`p-4 ${className}`}>
        <h1 className="text-black mb-4">
          Welcome, {fullName || "John Doe"}!👋
        </h1>
        <p className="text-black mt-20">
          Select a chat to start Messaging!
          <TiMessage className="text-center text-6xl" />
        </p>
      </article>
    </div>
  );
};
