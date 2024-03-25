// import React from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import useConversation from "../store/zustand/useConversation";
// import { useEffect, useState } from "react";
// export const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();
//   console.log(selectedConversation);
//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         setLoading(true);
//         const configuration = {
//           method: "get",
//           url: `/api/messages/${selectedConversation?._id}`,
//         };
//         const result = await axios(configuration);
//         console.log(result);
//         if (result.error) throw new Error(result.error);
//         setMessages(result);
//         // console.log(conversations);
//       } catch (error) {
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (selectedConversation?._id) getMessages();
//   }, [selectedConversation?._id, setMessages]);
//   return { messages, loading };
// };
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import useConversation from "../store/zustand/useConversation";

// export const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { selectedConversation, setMessages } = useConversation();

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         if (!selectedConversation?._id) return; // Return early if no conversation selected

//         setLoading(true);

//         const url = `/api/messages/${selectedConversation._id}`;
//         console.log("Fetching messages from:", url);

//         const response = await axios.get(url);
//         const { data } = response;

//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         toast.error("Error fetching messages. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getMessages();
//   }, [selectedConversation?._id, setMessages]);

//   return { messages, loading };
// };
import { useEffect, useState } from "react";
import useConversation from "../store/zustand/useConversation";
import toast from "react-hot-toast";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  console.log("heyyyyy", messages);
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        console.log(data);
        if (data.error) throw new Error(data.error);
        setMessages(data);
        console.log(messages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
