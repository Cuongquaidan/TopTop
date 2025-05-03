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
      title: "sidebar.for_you",
      icon: <HiOutlineHome size={28} />,
      iconActive: <HiHome size={28} className="text-primary" />,
      href: "/",
    },
    {
      title: "sidebar.explore",
      icon: <MdOutlineExplore size={28} />,
      iconActive: <MdExplore size={28} className="text-primary" />,
      href: "/explore",
      preloadUrl: new URL(SUMMARY_API.post.get.getTop9TrendingVideo, BASE_URL).toString(),
    },
    {
      title: "sidebar.following",
      icon: <RiUserReceivedLine size={28} />,
      iconActive: <RiUserReceivedFill size={28} className="text-primary" />,
      href: "/following",
    },
    {
      title: "sidebar.friends",
      icon: <HiOutlineUserGroup size={28} />,
      iconActive: <HiUserGroup size={28} className="text-primary" />,
      href: "/friends",
    },
    {
      title: "sidebar.upload",
      icon: <PiPlusSquare size={28} />,
      iconActive: <BiSolidPlusSquare size={28} className="text-primary" />,
      href: "/upload",
    },
    {
      title: "sidebar.activities",
      icon: <BiMessageAltDetail size={30} />,
      iconActive: <BiSolidMessageDetail size={28} className="text-primary" />,
      option: "activities",
      requireLogin: true,
    },
    {
      title: "sidebar.messages",
      icon: <BsSend size={28} />,
      iconActive: <BsFillSendFill size={28} className="text-primary" />,
      option: "messages",
      requireLogin: true,
      href: "/chat",
    },
    {
      title: "sidebar.live",
      icon: <LiveCustomIcon />,
      iconActive: <SolidLiveCustomIcon />,
      href: "/live",
    },
    {
      title: "sidebar.profile",
      icon: <RiProfileLine size={28} />,
      iconActive: <RiProfileFill size={28} className="text-primary" />,
      href: "/profile",
      requireLogin: true,
    },
    {
      title: "sidebar.more",
      icon: <TfiMoreAlt size={28} />,
      iconActive: <TfiMoreAlt size={28} className="text-primary" />,
    },
  ];
  
  export default data;
  