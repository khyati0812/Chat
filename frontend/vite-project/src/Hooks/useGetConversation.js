import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const configuration = {
          url: "/api/users",
        };
        const result = await axios(configuration);
        // console.log(result);
        if (result.error) throw new Error(result.error);
        setConversations(result);
        // console.log(conversations);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
};
