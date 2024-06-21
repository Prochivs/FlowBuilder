import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { MdOutlineSms } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
export default function Sidebar({
  nodeName,
  setNodeName,
  setNodeDescription,
  nodeDescription,
  selectedNode,
  onSave,
  setSelectedElements,
}) {
  const handleInputChange = (event) => {
    // setNodeName(event.target.value);
    setNodeDescription(event.target.value);
    
  };

  const onDragStart = (event, nodeType,name) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("name",name);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{zIndex:50}} className="border-r-1 border-[#33333e] border-r border-r-[#46464f] basis-[26%]  text-sm bg-transparent  h-screen ">
      {selectedNode ? (
        //settings panel
        <div >
          <div className="w-[360px] text-white bg-[#20202a] mb-10 py-2 px-6 flex items-center">
              <AiOutlineLeft />
              <div className="text-white px-6 w-full py-2 flex justify-center items-center">
                <h3 className="text-md text-white bg-[#20202a]">
                 Update Node
                </h3>
              </div>
            </div>
          <label className="block mb-2 mx-6 text-sm font-medium text-[#96969a]">
           Description:
          </label>
          <div className="flex flex-col gap-4 mx-6">
          <input
            type="text"
            className="block w-full text-[#96969a]  pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-[#20202a] focus:outline-none focus:border-[#353ebd]"
            value={nodeDescription}
            onChange={handleInputChange}
          />
          <div className="flex  justify-end mt-4 items-center">
            <button
              className="bg-[#353ebd] px-4 py-2 rounded-lg hover:scale-10"
              onClick={() => setSelectedElements([])}
            >
              Save change
            </button>
          </div>
          </div>
        </div>
      ) : (
        //node panel
        <div className="flex h-full flex-col  justify-between">
          <div>
            <div className="text-white bg-[#20202a] mb-10 py-2 px-6 flex items-center">
              <AiOutlineLeft />
              <div className="text-white px-6 w-full py-2 flex justify-center items-center">
                <h3 className="text-md text-white bg-[#20202a]">
                  Intergrations
                </h3>
              </div>
            </div>

            <h3 className="text-sm px-6 mt-4 mb-3 text-white">
              WHEN{" "}
              <span className="pl-1 text-[#838389] underline">
                {" "}
                request contains
              </span>
            </h3>

            <div className=" mx-6  p-3 border-[1px]  border border-[#6a6a6b] rounded-2xl text-white bg-[#20202a] mt-4 py-2  px-2 flex flex-col ">
              <p className="font-semibold  mt-[12px] flex items-center mb-[5px] text-[#96969a]">
              <span className="w-3 h-3 rounded-full bg-[#333cbd] mr-2" />  Create a flow for a use Case
              </p>
              <p className="text-xs text-[#96969a] mb-[15px]">
                <span className="text-[#838389] text-xs">Message is about</span> person
                who want to <br></br> setup a product
              </p>
              <p className="text-[#96969a] mt-[10px] text-xs">5K runs</p>
            </div>

            <p className="text-[#96969a] text-md font-semibold  mx-8 mt-[25px] mb-[10px]">
              Use Case Nodes
            </p>

            <div className="px-2 py-4 mx-6 rounded-2xl border-[1px] text-sm  border border-[#6a6a6b]   grid grid-cols-2 gap-3">
              <div
                className="flex items-center gap-4     bg-[#1e1f2a] p-[8px] border-[1px] text-xs  border-dashed border-[#6a6a6b] rounded-lg cursor-move flex justify-center items-center text-white hover:bg-[#353ebd] hover:text-white transition-colors duration-200"
                onDragStart={(event) => onDragStart(event, "textnode","WhatsApp")}
                draggable
              >
               <FaWhatsapp color="#337058" size="18px"/>  WhatsApp
              </div>
              <div
                className="flex items-center gap-4  p-[8px] border-[1px] text-xs border-dashed border-[#6a6a6b] rounded-lg cursor-move flex justify-center items-center text-white hover:bg-[#353ebd] hover:text-white transition-colors duration-200"
                onDragStart={(event) => onDragStart(event, "textnode","Call")}
                draggable
              >
                <IoCallOutline color="#337058" size="18px"/> Call
              </div>
              <div
                className="flex items-center gap-4  p-[8px] border-[1px] text-xs border-dashed border-[#6a6a6b] rounded-lg cursor-move flex justify-center items-center text-white hover:bg-[#353ebd] hover:text-white transition-colors duration-200"
                onDragStart={(event) => onDragStart(event, "textnode","File")}
                draggable
              >
                 <CiFileOn color="#337058" size="18px"/> File
              </div>
              <div
                className="flex items-center gap-4  p-[8px] border-[1px] text-xs border-dashed border-[#6a6a6b] rounded-lg cursor-move flex justify-center items-center text-white hover:bg-[#353ebd] hover:text-white transition-colors duration-200"
                onDragStart={(event) => onDragStart(event, "textnode","SMS")}
                draggable
              >
                < MdOutlineSms color="#6a9eff" size="18px"/> SMS
              </div>
              <div
                className="flex items-center gap-4  p-[8px] border-[1px] text-xs border-dashed border-[#6a6a6b] rounded-lg cursor-move flex justify-center items-center text-white hover:bg-[#353ebd] hover:text-white transition-colors duration-200"
                onDragStart={(event) => onDragStart(event, "textnode","Email")}
                draggable
              >
             < CiMail color="#6a9eff" size="18px"/> Email
              </div>
              <div
                className="flex items-center gap-4  p-[8px] border-[1px] text-xs border-dashed border-[#6a6a6b] rounded-lg cursor-move flex justify-center items-center text-white hover:bg-[#353ebd] hover:text-white transition-colors duration-200"
                onDragStart={(event) => onDragStart(event, "textnode","Add Customer Details")}
                draggable
              >
                <BiDetail color="#6a9eff" size="18px"/>Customer Details
              </div>
              <div
                className="flex items-center gap-4  p-[8px] border-[1px] text-xs border-dashed border-[#6a6a6b] rounded-lg cursor-move flex justify-center items-center text-white hover:bg-[#353ebd] hover:text-white transition-colors duration-200"
                onDragStart={(event) => onDragStart(event, "textnode","Check Available Slots")}
                draggable
              >
                Check Available Slots
              </div>
              <div
                className="flex items-center gap-4  p-[8px] border-[1px] text-xs border-dashed border-[#6a6a6b] rounded-lg cursor-move flex justify-center items-center text-white hover:bg-[#353ebd] hover:text-white transition-colors duration-200"
                onDragStart={(event) => onDragStart(event, "textnode","Book Appointments")}
                draggable
              >
                Book Appointments
              </div>
            </div>

            {/* <div className="flex mx-6 justify-end mt-4 items-center">
              <button
                className="bg-[#353ebd] px-4 py-2 rounded-lg hover:scale-10"
                onClick={() => onSave()}
              >
                Save flow
              </button>
            </div> */}
          </div>

          <div className="flex bg-[#1a1a25] py-2 px-6 justify-end mt-4 items-center">
            <button
              className="bg-[#353ebd] px-4 py-2 rounded-lg hover:scale-10"
              onClick={() => onSave()}
            >
              Save flow
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
