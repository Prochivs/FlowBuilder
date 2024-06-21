import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { LuHome } from "react-icons/lu";
import { FaTelegramPlane } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoPowerSharp } from "react-icons/io5";
import { LuPieChart } from "react-icons/lu";
export default function SideNav() {
 

  return (
    <aside
      style={{ zIndex: 50 }}
      className="border-r-1 border-[#33333e] border-r border-r-[#46464f] basis-[20%]  text-sm bg-transparent  h-screen "
    >
      <div className="flex h-full flex-col  justify-between">
        <div className="flex flex-col mx-4">
          {/* LOGO */}
          <div className="text-white bg-[#20202a] mb-10 py-2 px-6 flex items-center">
            <AiOutlineLeft />
            <div className="text-white px-6 w-full py-2 flex justify-center items-center">
              <h3 className="text-md text-white bg-[#20202a]">
                LOGO GOES HERE
              </h3>
            </div>
          </div>

          {/* OPTIONS */}
          <div>
            <nav className=" flex-col flex gap-4">
              <Link
                className=" rounded-lg flex gap-3 items-center px-4 py-2 flex gap-3 hover:border text-white hover:border-[#282f95]"
                href="/chats"
              >
            <LuHome /> Templates
              </Link>
              <Link
                    className=" rounded-lg flex  items-center px-4 py-2 flex gap-3 hover:border  text-white hover:border-[#282f95]"
                href=""
              >
               <FiShoppingBag /> <a>Configure Use Cases</a>
              </Link>
              <Link
                    className=" rounded-lg flex  items-center px-4 py-2 flex gap-3 hover:border  text-white hover:border-[#282f95]"
                href="/about"
              >
                <LuPieChart/><a>Dashboard</a>
              </Link>
              <Link
                    className=" rounded-lg flex  items-center px-4 py-2 flex gap-3 hover:border  text-white hover:border-[#282f95]"
                href="/about"
              >
               <AiOutlineUsergroupAdd /> <a>Escalation</a>
              </Link>
            </nav>
          </div>

        </div>

        <div className="flex flex-col gap-3  py-2 px-6 items-center mt-4 items-center">
          <button
               className=" rounded-lg flex gap-3 items-center w-full px-4 py-2 flex gap-3 text-white hover:border hover:border-[#282f95]"
            // onClick={() => onSave()}
          >
            Dashboard
          </button>
          <button
               className="rounded-lg flex gap-3 items-center w-full px-4 py-2 flex gap-3 text-white hover:border hover:border-[#282f95]"
            // onClick={() => onSave()}
          >
           ICEA LION
          </button>
          <button
               className=" rounded-lg flex gap-3 items-center px-4 py-2 flex gap-3 text-white hover:border hover:border-[#282f95]"
            // onClick={() => onSave()}
          >
          <IoPowerSharp />  Switch Accounts/Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
