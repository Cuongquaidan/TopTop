import { MdDashboard } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { MdReport } from "react-icons/md";
const adminSidebarData = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    href: "/admin/dashboard",

  },{
    title: "Users",
    icon: <FaUserEdit />,
    href: "/admin/users",
  },
  {
    title: "Posts",
    icon: <IoDocumentText />,
    href: "/admin/products",
  },
  {
    title: "Reports",
    icon: <MdReport />,
    href: "/admin/reports",
  }
]