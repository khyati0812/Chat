import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const login = async (userName, password) => {
    // Validation logic
    console.log(userName, " ", password);
    setSubmitted(true);
    // Axios configuration
    try {
      const configuration = {
        method: "post",
        url: "/api/auth/login",
        data: {
          userName,
          password,
        },
      };
      // const result = await axios(configuration);
      // console.log(result);
      // //   localStorage.setItem("user", JSON.stringify(result));
      // localStorage.setItem("logged_in_user", result);

      const response = await axios(configuration);
      console.log(response);
      const { token } = response.data;
      // Extract username from the response data

      // Perform another request to fetch user ID using the username
      const userIdResponse = await axios.get(`/api/users/${userName}`);
      console.log(JSON.stringify(userIdResponse));

      // Store user ID in localStorage
      localStorage.setItem("logged_in_user", userIdResponse.data.userId);
      localStorage.setItem("signed_in", true);

      navigate("/");
      //   setSubmitted(false);

      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error("Error signing up. Please try again.");
      setSubmitted(false);
    } finally {
      setSubmitted(false);
    }
  };

  return { submitted, login };
};

export default useLogin;
