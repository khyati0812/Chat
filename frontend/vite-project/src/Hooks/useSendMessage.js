import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../store/zustand/useConversation";

// export const useSendMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();

//   const sendMessage = async (message) => {
//     try {
//       setLoading(true);
//       const configuration = {
//         method: "post",
//         url: `/api/messages/send/${selectedConversation._id}`,
//         data: {
//           message,
//         },
//       };
//       const result = await axios(configuration);
//       console.log(result);
//       if (result.error) throw new Error(result.error);
//       setMessages([...messages, result]);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Return loading and sendMessage function from the hook
//   return { loading, sendMessage };
// };
export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      const configuration = {
        method: "post",
        url: `/api/messages/send/${selectedConversation._id}`,
        data: {
          message,
        },
      };
      const result = await axios(configuration);
      console.log(result);
      if (result.error) throw new Error(result.error);

      // Update messages state with new message
      setMessages([...messages, result.data]); // Assuming result.data contains the new message
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Return loading and sendMessage function from the hook
  return { loading, sendMessage };
};
