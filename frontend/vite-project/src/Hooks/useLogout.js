import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    try {
      const configuration = {
        method: "post",
        url: "/api/auth/logout",
      };
      const result = await axios(configuration);
      console.log(result);
      if (result.error) throw new Error(result.error);
      localStorage.removeItem("user");
      localStorage.removeItem("signed_in");
      localStorage.removeItem("logged_in_user");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error signing up. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
export default useLogout;
