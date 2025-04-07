import React from "react";
import { Link, useParams } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import SidebarItem from "./SidebarItem";
import data from "../data/SidebarData";
import { MdOutlineCopyright } from "react-icons/md";
function Sidebar() {
    const currentPathname = window.location.pathname;
    return (
        <div className="flex flex-col gap-4 p-2 relative z-[999]">
            <div>
                <Link
                    className="flex text-3xl italic font-black text-primary"
                    to={"/"}
                >
                    <p>TopTop</p>
                </Link>
            </div>
            <div className="relative">
                <LuSearch
                    size={20}
                    className="absolute transform -translate-y-1/2 top-1/2 left-2"
                />
                <input
                    type="text"
                    className="outline-none bg-slate-200/50 w-[200px] rounded-3xl p-2 pl-8"
                    placeholder="Tìm kiếm..."
                />
            </div>
            <div className="flex flex-col gap-2">
                {data
                    .filter((item, index) => index != data.length - 1)
                    .map((item, index) => (
                        <SidebarItem
                            key={index}
                            currentPathname={currentPathname}
                            item={item}
                        ></SidebarItem>
                    ))}
                <div className="h-10 p-2"> Hồ sơ</div>
                <Link
                    className={`${
                        currentPathname === data[data.length - 1].href &&
                        "text-primary bg-primary/20 "
                    } p-2 rounded-lg hover:text-primary hover:bg-primary/20 transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
                    to={data[data.length - 1].href}
                >
                    <div>
                        {currentPathname === data[data.length - 1].href
                            ? data[data.length - 1].iconActive
                            : data[data.length - 1].icon}
                    </div>
                    <p>{data[data.length - 1].title}</p>
                </Link>
            </div>
            <div className="p-4 -mt-2 border-y-1 border-neutral-200">
                <div className="font-semibold text-neutral-600">
                    <p className=" text-md"> Các tài khoản đã follow</p>
                    <p className="mt-1 text-sm leading-4">
                        Những tài khoản bạn follow sẽ xuất hiện tại đây
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-1 text-sm font-bold text-neutral-500">
                <Link to={"/company"}>Công ty</Link>
                <Link to={"/"}>Chương trình</Link>
                <Link to={"/"}>Điều khoản và chính sách</Link>
                <p className="text-[12px] cursor-pointer">Thêm</p>
                <p className="flex gap-2">
                    <MdOutlineCopyright size={20} />
                    Copy right CamOnGPT Group
                </p>
            </div>
        </div>
    );
}

export default Sidebar;
