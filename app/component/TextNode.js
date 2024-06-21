import React from "react";
import { Handle, Position } from "reactflow";
import { TbArrowBigRightFilled } from "react-icons/tb";

//custome node
function TextNode({ data,id, selected }) {
  return (
    <div
      className={`min-w-[150px] text-[9px] shadow-md rounded-lg   ${
        selected ? "border-solid border-1 rounded-lg border-[#424242]" : ""
      } `}
    >
      <div className="flex w-full  bg-[#353ebd]  rounded-lg p-3">
        <p className="px-2 py-1 text-left w-full text-white rounded-md bg-[#5862ea] text-xs">
         {data?.label || "Node"}
        </p>
      
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className={`${id === "node_0" ? "bg-transparent": "bg-transparent mr-2 -translate-x-1/2"}`}
      >
{id !== "node_0" ? <TbArrowBigRightFilled size={8} color="#b5b5bb"/> : ""}
</Handle>
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="w-1 rounded-full bg-gray-500"
      />
    </div>
  );
}

export default TextNode;
