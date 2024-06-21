import React, { useState, useEffect } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import axios from "axios";
const ChatList = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    axios
      .get("https://uat.xavierafrica.com/phone_logs")
      .then((res) => {
        console.log(res.data.phones);
      
     
    // Remove duplicates
    const uniquePhones =res.data.phones?.filter(
      (phoneObj, index, self) =>
        index === self.findIndex((p) => p.phone === phoneObj.phone)
    );
    setPhones(uniquePhones);
  })
  .catch((e) => {
    console.log(e);
  });
  }, []);
  const allChatUsers = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      id: 1,
      name: "Agent",
      active: true,
      isOnline: true,
    },
  ];

  const [allChats, setAllChats] = useState(allChatUsers);

  return (
    <div className=" border-r border-r-[#49494e] rounded-l-xl w-96 flex flex-col justify-between">
      <div className="h-[50px]">
        {phones.map((item, index) => (
          <ChatListItems
            name={allChats[0].name}
            key={item.index}
            number = {item}
            animationDelay={index + 1}
            active={allChats[0].active ? "active" : ""}
            isOnline={allChats[0].isOnline ? "active" : ""}
            image={allChats[0].image}
          />
        ))}
      </div>

      <input
        className="flex mx-2 py-1 text-white pl-4 mb-2 text-sm rounded-md bg-[#51515a] focus:outline-none placeholder:text-[#ebebec]"
        type="text"
        placeholder="search for a conversation here"
        required
      />
    </div>
  );
};

export default ChatList;
