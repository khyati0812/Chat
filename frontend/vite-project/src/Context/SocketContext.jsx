import { createContext, useContext, useEffect, useState } from "react";
export const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
import { io } from "socket.io-client";
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const auth = localStorage.getItem("logged_in_user");
  useEffect(() => {
    if (auth) {
      const socket = io("http://localhost:5000", { query: { userId: auth } });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
