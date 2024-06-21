import React, { useState, useRef, useEffect } from "react";
import "./chatContent.css";

import { RxAvatar } from "react-icons/rx";
import { BsSend, BsEmojiSmile } from "react-icons/bs";

import ChatItem from "./ChatItem";
import axios from "axios";
const ChatContent = () => {
  const BASE_URL = "https://uat.xavierafrica.com";

  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [agent, setAgent] = useState({});

  const messagesEndRef = useRef(null);
  const [ws, setWs] = useState(null);

  // let userID = JSON.parse(localStorage.getItem("current-userID"));
  // const agentIndex = JSON.parse(localStorage.getItem("agent-Index"));
  // let currentUser = JSON.parse(localStorage.getItem("current-userName"));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let userID = JSON.parse(localStorage.getItem("current-userID"));
  //     const response = await axios.get(
  //       `${BASE_URL}/api/collections/users/records/${userID}`
  //     );
  //     let { orgId } = await response.data;
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL}/api/collections/agents/records/get-by-org/${orgId}`
  //       );

  //       let agentsData = response.data.orgAgents;
  //       const Agent = agentsData.find((i) => {
  //         return i.id === agentIndex;
  //       });

  //       console.log("this is the agent");
  //       console.log(Agent);
  //       setAgent(Agent);
  //     } catch (error) {
  //       // Handle error here
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    // const websocket = new WebSocket(
    //   `wss://uat.xavierafrica.com/chatbot/${userID}`
    // );
    // setWs(websocket);

    // websocket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
      setChat((prevChat) => [
        ...prevChat,
        {
          key: prevChat.length + 1,
          type: "other",
          msg: "data.response",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        },
      ]);
    // };
 
    // websocket.onerror = () => {
      setChat((prevChat) => [
        ...prevChat,
        {
          key: prevChat.length + 1,
          type: "other",
          msg: "Hello, how can I help you?",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
        },
      ]);
    // };

    // return () => {
    //   websocket.close();
    // };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

 

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 13 && msg.trim() !== "") {
        handleSendMessage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    scrollToBottom();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chat, msg]);

  const handleSendMessage = () => {
    if (msg.trim() !== "" ) {
      const data = {
        name:`;`,
        index_id: ``,
        personality: `l`,
        user: `,l`,
        date: "19:08 Monday, June 26, 2023 (GMT+2)",
        location: "Gaborone/Botswana",
        query: msg,
      };

      setChat((prevChat) => [
        ...prevChat,
        {
          key: prevChat.length + 1,
          type: "",
          msg: msg,
          image: "https://pngset.com/images/user-avatar-circle-number-symbol-text-alphabet-transparent-png-2657598.png",
        },
      ]);
      // ws.send(JSON.stringify(data));
      setMsg("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className=" relative w-11/12 rounded-r-2xl pt-6 pl-6 pr-6">
      <div className="content__header ">
        <div className="blocks">
          <div className="current-chatting-user">
            <RxAvatar color="#95969e" size={30} />
            {/* <p className="pl-2   text-[#95969e]">{currentUser}</p> */}
          </div>
        </div>
      </div>

      <div className="content__body">
        <div className="chat__items rounded-xl mt-4 bg-[#060612]">
          {chat.map((itm, index) => (
            <ChatItem
              animationDelay={index + 2}
              key={itm.key}
              user={itm.type ? itm.type : "me"}
              msg={itm.msg}
              image={itm.image}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="content__footer flex w-full">
        <div className="sendNewMessage border-t mr-20 border-t-[#a1a1a5] absolute flex w-full right-0 left-0 m bottom-0">
          <button className="addFiles flex justify-center items-center">
            <BsEmojiSmile />
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button
            onClick={handleSendMessage}
            className="btnSendMsg flex justify-center items-center"
            id="sendMsgBtn"
          >
            <BsSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
