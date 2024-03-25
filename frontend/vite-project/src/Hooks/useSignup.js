// import { useState } from "react";
// import { toast } from "react-hot-toast";
// const useSignup = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const signup = async (
//     fullName,
//     userName,
//     password,
//     confirmPassword,
//     gender
//   ) => {
//     const success = handleInputErrors(
//       fullName,
//       userName,
//       password,
//       confirmPassword,
//       gender
//     );
//     if (!success) return;
//     setSubmitted(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         // mode: "no-cors",
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullName,
//           userName,
//           password,
//           confirmPassword,
//           gender,
//         }),
//       });
//       const data = await res.json();
//       console.log(data);
//       if (data.error) throw new Error(data.error);
//     } catch {
//       toast.error("error");
//     } finally {
//       setSubmitted(false);
//     }
//   };
//   return { submitted, signup };
// };
// function handleInputErrors(
//   fullName,
//   userName,
//   password,
//   confirmPassword,
//   gender
// ) {
//   if (!fullName || !userName || !password || !confirmPassword || !gender) {
//     toast.error("Please fill in all fields");
//     return false;
//   }
//   if (password !== confirmPassword) {
//     toast.error("Passwords do not match");
//     return false;
//   }
//   if (password.minlength < 6) {
//     toast.error("Passwords must be atleast 6 characters");
//     return false;
//   }
//   return true;
// }
// export default useSignup;

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Login } from "../pages/Login/Login.jsx";
const useSignup = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const signup = async (
    fullName,
    userName,
    password,
    confirmPassword,
    gender
  ) => {
    // Validation logic
    const success = handleInputErrors(
      fullName,
      userName,
      password,
      confirmPassword,
      gender
    );

    if (!success) return;

    // Axios configuration
    const configuration = {
      method: "post",
      url: "/api/auth/signup",
      data: {
        fullName,
        userName,
        password,
        confirmPassword,
        gender,
      },
    };

    try {
      setSubmitted(true);
      const result = await axios(configuration);
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result));

      navigate("/login");
      setSubmitted(false);
      toast.success("Signup successful!");
    } catch (error) {
      console.error(error);
      toast.error("Error signing up. Please try again.");
      setSubmitted(false);
    }
  };

  return { submitted, signup };
};

function handleInputErrors(
  fullName,
  userName,
  password,
  confirmPassword,
  gender
) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
}

export default useSignup;
