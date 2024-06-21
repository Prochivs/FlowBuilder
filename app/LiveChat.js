import ChatBody from "./components/chatBody/ChatBody";

function LiveChat() {



  return (
    <div  className="text-white   flex h-full mx-auto justify-center flex-col p-4 ">
      <div className=" flex flex-col  justify-center items-center md:mb-14">
        <h className=" w-[400px] text-center  text-md mb-6 bg-gradient-to-r from-[#5c5c65] via-black-500 to-gray-300 inline-block text-transparent font-bold bg-clip-text">
          Live Chats
        </h>
        <p className="text-gray-300 text-sm mb-10 md:mb-0 md:w-[590px] text-center">
          Below are a list of chatbots that best suit your use cases.You will findthat there is a readiness meter in the cards
        </p>
      </div>

      <div className="mx-20">
        <ChatBody/>
      </div>
    </div>
  );
}

export default LiveChat;
