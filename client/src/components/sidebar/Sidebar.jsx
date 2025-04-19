import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import SidebarItem from "./SidebarItem";
import data from "../../data/SidebarData";
import { MdOutlineCopyright } from "react-icons/md";
import { motion } from "framer-motion";
import MoreOptions from "./MoreOptions";
import Messages from "./Messages";
import OtherOptions from "./OtherOptions";
import Modal from "../Modal";
import { useGlobalContext } from "../../context/AppContext";
import LoginForm from "../modal/LoginForm";
import LoginWithPhone from "../modal/LoginWithPhone";
import LoginWithOther from "../modal/LoginWithOther";
import ForgotPassword from "../modal/ForgotPassword";
import AuthForm from "../modal/AuthForm";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
function Sidebar() {
    const user = useSelector((state)=>state.user.user);
    const location = useLocation(); // Lấy thông tin URL hiện tại
    const [currentPathname, setCurrentPathname] = useState(location.pathname);
    const [showMore, setShowMore] = useState(false);
    const [option, setOption] = useState("");
    const {showModal,setShowModal, typeModal,setTypeModal} = useGlobalContext();

   
    console.log(user   )
    useEffect(() => {
        setCurrentPathname(location.pathname); // Tự cập nhật khi pathname thay đổi
    }, [location.pathname]);
    const variants = {
        textAnimate: {
            opacity: showMore || option ? 0 : 1,
        },
    };
    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY);
            setShowMore(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div className="flex flex-col gap-4 p-4 fixed top-0 left-0 z-[999]">
            <div>
                <Link
                    className="flex text-3xl italic font-black text-primary"
                    to={"/"}
                >
                    <h1 className="flex">
                        T
                        <motion.p variants={variants} animate="textAnimate">
                            opTop
                        </motion.p>
                    </h1>
                </Link>
            </div>
            <div className="relative">
                <LuSearch
                    size={20}
                    className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 left-3"
                />
                <input
                    type="text"
                    className={`outline-none h-[48px] bg-slate-200/50 w-[200px] rounded-3xl p-2 pl-10 ${
                        (showMore || option )&& "!w-[48px]"
                    } transition-all`}
                    placeholder="Tìm kiếm..."
                />
            </div>
            <div className="flex flex-col gap-2">
                {data
                .filter((_,index) => index !== data.length - 1)
                .map((item, index) => 
                       {
                         return   item.href ? (   <SidebarItem
                            key={index}
                            currentPathname={currentPathname}
                            item={item}
                            showMore={showMore}
                            setShowMore={setShowMore}
                            option={option}
                            setOption={setOption}
                        ></SidebarItem>
                            ):(
                                <button onClick={()=>{
                                    if(item.option === option) {
                                        setOption("");
                                    }
                                    else {
                                        setOption(item.option);
                                    }
                                    setShowMore(false);
                                }}
                                className={`${
                         item.option === option &&
                        "text-primary   !rounded-full"
                    } p-2 rounded-lg hover:text-primary cursor-pointer transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
                                >
                                   <div>{item.option === option ? item.iconActive: item.icon}</div>
                                               <motion.p
                                                   animate={{
                                                       opacity: showMore || option ? 0 : 1,
                                                   }}
                                               >
                                                   {item.title}
                                               </motion.p>
                                </button>
                            )

                       }
                    )}
                {/* <motion.div
                    variants={variants}
                    animate="textAnimate"
                    className="h-10 p-2"
                >
                    {" "}
                    Hồ sơ
                </motion.div> */}
               {
                !user ? (
                    <button className="p-2 px-4 max-w-[200px] bg-primary text-lg cursor-pointer rounded text-white font-bold" onClick={
                    () => {
                        setShowModal(true);
                        setTypeModal("login");
                    }
                }>
                    Đăng nhập
                </button>
                ):(
                    <div className="flex items-center p-2 gap-2  max-w-[200px]  text-md font-semibold cursor-pointer rounded ">
                    {
                        user.profile_picture ? (
                            <div className="w-20 h-20 rounded-full overflow-hidden">
                                <img src={user.profile_picture} className="w-full h-full object-cover" alt="" />
                            </div>
                        ):(
                            <FaUserCircle size={32} className="text-amber-900" />)
                    }
                        <motion.div variants={variants} animate={"textAnimate"} className="flex flex-col">
                            <p>{user.display_name}</p>
                            <p className="text-sm italic">@{user.username}</p>
                        </motion.div>
                    </div>
                )
               }
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                   <AuthForm></AuthForm>
                </Modal>
                <button
                    className={`${
                        showMore  &&
                        "text-primary   !rounded-full"
                    } p-2 rounded-lg hover:text-primary cursor-pointer transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
                    onClick={() => {
                        setShowMore(!showMore);
                            setOption("");
                        
                    }}
                >
                    <div>
                        {showMore
                            ? data[data.length - 1].iconActive
                            : data[data.length - 1].icon}
                    </div>
                    <motion.p variants={variants} animate="textAnimate">
                        {data[data.length - 1].title}
                    </motion.p>
                </button>
            </div>
            <motion.div
                variants={variants}
                animate="textAnimate"
                className="p-4 -mt-2 border-y-1 border-neutral-200"
            >
                <div className="font-semibold text-neutral-600">
                    <motion.p className=" text-md">
                        Các tài khoản đã follow
                    </motion.p>
                    <motion.p className="mt-1 text-sm leading-4">
                        Những tài khoản bạn follow sẽ xuất hiện tại đây
                    </motion.p>
                </div>
            </motion.div>

            <motion.div
                variants={variants}
                animate="textAnimate"
                className="flex flex-col gap-1 text-sm font-bold text-neutral-500"
            >
                <Link to={"/company"}>Công ty</Link>
                <Link to={"/"}>Chương trình</Link>
                <Link to={"/"}>Điều khoản và chính sách</Link>
                <p className="text-[12px] cursor-pointer">Thêm</p>
                <p className="flex gap-2">
                    <MdOutlineCopyright size={20} />
                    Copy right CamOnGPT Group
                </p>
            </motion.div>
            {showMore && <MoreOptions setShowMore={setShowMore}></MoreOptions>}
            {option && <OtherOptions option={option} setOption={setOption}></OtherOptions>}
            
        </div>
    );
}

export default Sidebar;
