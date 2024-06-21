import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";

const ChatListItems = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log("props")
    console.log(props)
    console.log("props")
    // Your effect code here (if any)
  }, []); // Add dependencies if needed

  const selectChat = (e) => {
    const children = Array.from(e.currentTarget.parentNode.children);
    children.forEach((child) => child.classList.remove("active"));
    e.currentTarget.classList.add("active");
  };

  return (
    <div
      style={{ animationDelay: `0.${props.animationDelay}s` }}
      onClick={(e) => {
        selectChat(e);
        setActive(true);
        // localStorage.setItem('number',)""
      }}
      className={`chatlist__item ${active ? "active" : ""}`}
    >
      <Avatar
        image={props.image ? props.image : "http://placehold.it/80x80"}
        isOnline={props.isOnline}
      />

      <div className="userMeta">
        <p>{props.name}</p>
        <span className="activeTime">Active</span>
      </div>
    </div>
  );
};

export default ChatListItems;
