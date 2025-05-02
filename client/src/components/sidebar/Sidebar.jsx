import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import SidebarItem from "./SidebarItem";
import data from "../../data/SidebarData";
import { MdOutlineCopyright } from "react-icons/md";
import { motion } from "framer-motion";
import MoreOptions from "./MoreOptions";
import OtherOptions from "./OtherOptions";
import Modal from "../Modal";
import { useGlobalContext } from "../../context/AppContext";
import AuthForm from "../modal/AuthForm";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function Sidebar() {
    const user = useSelector((state) => state.user.user);
    const location = useLocation();
    const [currentPathname, setCurrentPathname] = useState(location.pathname);
    const [showMore, setShowMore] = useState(false);

    const { showModal, setShowModal, setTypeModal, option, setOption } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPathname(location.pathname);
    }, [location.pathname]);

    const variants = {
        textAnimate: {
            opacity: showMore || option ? 0 : 1,
        },
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowMore(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4 fixed top-0 left-0 z-[999] dark:bg-neutral-900 dark:text-gray-200">
            <div>
                <Link className="flex text-3xl italic font-black text-primary" to={"/"}>
                    <h1 className="flex">
                        T
                        <motion.p variants={variants} animate="textAnimate">
                            opTop
                        </motion.p>
                    </h1>
                </Link>
            </div>
            <div
                className="relative"
                onClick={() => {
                    setOption(option === "search" ? "" : "search");
                }}
            >
                <LuSearch
                    size={20}
                    className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 left-3 dark:text-neutral-500"
                />
                <input
                    type="text"
                    className={`outline-none h-[48px] bg-slate-200/50 dark:bg-neutral-700 w-[200px] rounded-3xl p-2 pl-10 ${
                        (showMore || option) && "!w-[48px]"
                    } transition-all`}
                    placeholder="Tìm kiếm..."
                    onFocus={() => setOption("search")}
                />
            </div>
            <div className="flex flex-col gap-2">
                {data
                    .filter((_, index) => index !== data.length - 1)
                    .filter((item) => (user ? true : item.requireLogin !== true))
                    .map((item, index) =>
                        item.href && item.option ? (
                            <button
                                key={index}
                                onClick={() => {
                                    setOption(item.option === option ? "" : item.option);
                                    setShowMore(false);
                                    navigate(item.href);
                                }}
                                className={`${
                                    item.option === option && "text-primary !rounded-full"
                                } p-2 rounded-lg hover:text-primary dark:hover:text-primary cursor-pointer transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
                            >
                                <div>{item.option === option ? item.iconActive : item.icon}</div>
                                <motion.p animate={{ opacity: showMore || option ? 0 : 1 }}>
                                    {item.title}
                                </motion.p>
                            </button>
                        ) : item.href ? (
                            <SidebarItem
                                key={index}
                                currentPathname={currentPathname}
                                item={item}
                                showMore={showMore}
                                setShowMore={setShowMore}
                                option={option}
                                setOption={setOption}
                            />
                        ) : (
                            <button
                                key={index}
                                onClick={() => {
                                    setOption(item.option === option ? "" : item.option);
                                    setShowMore(false);
                                }}
                                className={`${
                                    item.option === option && "text-primary !rounded-full"
                                } p-2 rounded-lg hover:text-primary dark:hover:text-primary cursor-pointer transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
                            >
                                <div>{item.option === option ? item.iconActive : item.icon}</div>
                                <motion.p animate={{ opacity: showMore || option ? 0 : 1 }}>
                                    {item.title}
                                </motion.p>
                            </button>
                        )
                    )}

                {showMore ||
                    (!user ? (
                        <button
                            className="p-2 px-4 max-w-[200px] bg-primary text-lg cursor-pointer rounded text-white font-bold"
                            onClick={() => {
                                setShowModal(true);
                                setTypeModal("login");
                            }}
                        >
                            Đăng nhập
                        </button>
                    ) : (
                        <div className="flex items-center p-2 gap-2 max-w-[200px] text-md font-semibold cursor-pointer rounded dark:hover:bg-neutral-800">
                            {user.profile_picture ? (
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src={user.profile_picture} className="w-full h-full object-cover" alt="" />
                                </div>
                            ) : (
                                <FaUserCircle size={32} className="text-amber-900 dark:text-neutral-400" />
                            )}
                            <motion.div variants={variants} animate="textAnimate" className="flex flex-col">
                                <p>{user.display_name}</p>
                                <p className="text-sm italic">@{user.username}</p>
                            </motion.div>
                        </div>
                    ))}
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <AuthForm />
                </Modal>
                <button
                    className={`${
                        showMore && "text-primary !rounded-full"
                    } p-2 rounded-lg hover:text-primary dark:hover:text-primary cursor-pointer transition-all w-[200px] font-semibold flex gap-2 items-center text-md`}
                    onClick={() => {
                        setShowMore(!showMore);
                        setOption("");
                    }}
                >
                    <div>{showMore ? data[data.length - 1].iconActive : data[data.length - 1].icon}</div>
                    <motion.p variants={variants} animate="textAnimate">
                        {data[data.length - 1].title}
                    </motion.p>
                </button>
            </div>
            <motion.div
                variants={variants}
                animate="textAnimate"
                className="p-4 -mt-2 border-y-1 border-neutral-200 dark:border-neutral-700"
            >
                <div className="font-semibold text-neutral-600 dark:text-gray-300">
                    <motion.p className="text-md">Các tài khoản đã follow</motion.p>
                    <motion.p className="mt-1 text-sm leading-4">
                        Những tài khoản bạn follow sẽ xuất hiện tại đây
                    </motion.p>
                </div>
            </motion.div>

            <motion.div
                variants={variants}
                animate="textAnimate"
                className="flex flex-col gap-1 text-sm font-bold text-neutral-500 dark:text-neutral-400"
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
            {showMore && <MoreOptions setShowMore={setShowMore} />}
            {option && <OtherOptions option={option} setOption={setOption} />}
        </div>
    );
}

export default Sidebar;
