import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../store/zustand/useConversation.js";
import { useGetConversation } from "../../Hooks/useGetConversation.js";
import { useState } from "react";
import toast from "react-hot-toast";
export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  console.log(conversations);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.data.find(
      (c) => c.fullName.toLowerCase() === search.toLowerCase()
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search"
        className="input input-bordered rounded-full mt-4"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <button
        type="submit"
        className="btn btn-circle bg-sky-500 text-white mt-4"
      >
        <IoSearchSharp />
      </button>
    </form>
  );
};
