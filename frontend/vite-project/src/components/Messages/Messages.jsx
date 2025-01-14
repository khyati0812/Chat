import React from "react";
import { Message } from "./Message";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import { useGetMessages } from "../../Hooks/useGetMessages";
import { useEffect, useRef } from "react";
import useListenMessages from "../../Hooks/useListenMessages";
export const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chatbox when messages update
  useEffect(() => {
    if (!loading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);
  console.log(messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
      {/* Empty div used as a marker to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};
