import React, { Component } from "react";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";

export default class ChatBody extends Component {
  render() {
    return (
      <div className="bg-[#060612] border border-[#49494e] flex h-[400px]  rounded-2xl">
        <ChatList />
        <ChatContent /> 
      </div>
    );
  }
}
