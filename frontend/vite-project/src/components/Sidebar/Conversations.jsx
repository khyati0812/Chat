import React from "react";
import { Conversation } from "./Conversation";
import { getRandomEmoji } from "../../../../utils/emoji.js";
import { useGetConversation } from "../../Hooks/useGetConversation.js";
export const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.data?.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={index === conversations.data.length - 1} // You're missing the value for lastIdx
        />
      ))}
      {/* <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation /> */}
    </div>
  );
};
