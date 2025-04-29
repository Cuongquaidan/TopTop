import { HiOutlineHome } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { MdExplore } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { RiUserReceivedLine } from "react-icons/ri";
import { RiUserReceivedFill } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi2";
import { PiPlusSquare } from "react-icons/pi";
import { BiSolidPlusSquare } from "react-icons/bi";
import { BiMessageAltDetail } from "react-icons/bi";
import { BiSolidMessageDetail } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { BsFillSendFill } from "react-icons/bs";
import { TfiMoreAlt } from "react-icons/tfi";
import LiveCustomIcon from "../components/LiveCustomIcon";
import SolidLiveCustomIcon from "../components/SolidLiveCustomIcon";
import { RiProfileLine } from "react-icons/ri";
import { RiProfileFill } from "react-icons/ri";
import { BASE_URL, SUMMARY_API } from "../shared/Route";
const data = [
    {
        title: "Đề xuất",
        icon: <HiOutlineHome size={28}></HiOutlineHome>,
        iconActive: <HiHome size={28} className="text-primary"></HiHome>,
        href: "/",
    },
    {
        title: "Khám phá",
        icon: <MdOutlineExplore size={28}></MdOutlineExplore>,
        iconActive: <MdExplore size={28} className="text-primary"></MdExplore>,
        href: "/explore",
        preloadUrl: new URL(SUMMARY_API.post.get.getTop9TrendingVideo, BASE_URL).toString()
    },
    {
        title: "Đã follow",
        icon: <RiUserReceivedLine size={28}></RiUserReceivedLine>,
        iconActive: (
            <RiUserReceivedFill
                size={28}
                className="text-primary"
            ></RiUserReceivedFill>
        ),
        href: "/following",
    },
    {
        title: "Bạn bè",
        icon: <HiOutlineUserGroup size={28}></HiOutlineUserGroup>,
        iconActive: (
            <HiUserGroup size={28} className="text-primary"></HiUserGroup>
        ),
        href: "/friends",
    },
    {
        title: "Tải lên",
        icon: <PiPlusSquare size={28}></PiPlusSquare>,
        iconActive: (
            <BiSolidPlusSquare
                size={28}
                className="text-primary"
            ></BiSolidPlusSquare>
        ),
        href: "/upload",
    },
    {
        title: "Hoạt động",
        icon: <BiMessageAltDetail size={30}></BiMessageAltDetail>,
        iconActive: (
            <BiSolidMessageDetail
                size={28}
                className="text-primary"
            ></BiSolidMessageDetail>
        ),
        option: "activities",
        requireLogin: true,
    },
    {
        title: "Tin nhắn",
        icon: <BsSend size={28}></BsSend>,
        iconActive: (
            <BsFillSendFill size={28} className="text-primary"></BsFillSendFill>
        ),
        // option: "messages",
        requireLogin: true,
        href:"/chat"
    },
    {
        title: "Trực tiếp",
        icon: <LiveCustomIcon></LiveCustomIcon>,
        iconActive: <SolidLiveCustomIcon></SolidLiveCustomIcon>,
        href: "/live",
    },
    {
        title: "Hồ sơ",
        icon: <RiProfileLine size={28}></RiProfileLine>,
        iconActive: (
            <RiProfileFill
                size={28}
                className="text-primary"
            ></RiProfileFill>
        ),
        href: "/profile",
        requireLogin: true,
    },
    {
        title: "Thêm",
        icon: <TfiMoreAlt size={28}></TfiMoreAlt>,
        iconActive: (
            <TfiMoreAlt size={28} className="text-primary"></TfiMoreAlt>
        ),
    },
];

export default data;
