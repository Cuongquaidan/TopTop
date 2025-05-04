import { useSelector } from "react-redux"
import { useGlobalContext } from "../../context/AppContext"
import { useEffect, useState } from "react"
import createAxiosInstance from "../../libs/axios/AxiosInstance"
import { BASE_URL, SUMMARY_API } from "../../shared/Route"
import { toast } from "react-toastify"

const StatisticsProfile=({selectedUser})=>{
    const [tab,setTab]=useState('Đã follow')
    const [user,setUser]=useState(null)
    const [followeds,setFolloweds]=useState([])
    const [followers,setFollowers]=useState([])
    const [friend,setFriends]=useState([])

    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                console.log("selected:",selectedUser);
                
                const axiosInstance=createAxiosInstance(BASE_URL)
                const res=await axiosInstance.get(SUMMARY_API.user.get.byID.replace(":userID",selectedUser._id))
                setUser(res.data)
                setFolloweds(res.data.followeds)
                setFollowers(res.data.followers)
                setFriends(res.data.friends)
            } catch (error) {
                console.log(error.message||"Lỗi khi get user")
            }
        }

        fetchUser()
    },[])
    
    return(
        <div className="w-full h-full flex flex-col items-center justify-start">
            <h1 className="text-xl font-bold dark:text-white">{user?user.username:'TopTop'}</h1>
            <div className="w-full flex border-b-gray-200 border-b-2 dark:border-b-gray-800/50">
                <div 
                    className={
                        `flex items-start justify-center p-1 py-3 w-1/4
                        ${tab==="Đã follow"?"border-b-3":"border-b-0"}
                        ${document.documentElement.classList.contains('dark')?'border-b-white':'border-b-black'}
                        `
                    }
                    onClick={()=>setTab("Đã follow")}
                >
                    <p className="font-medium dark:text-white">Đã follow {user?user.numOfFolloweds:"TopTop"}</p>
                </div>
                <div 
                    className={
                        `flex items-start justify-center p-1 py-3 w-1/4
                        ${tab==="Follower"?"border-b-3":"border-b-0"}
                        ${document.documentElement.classList.contains('dark')?'border-b-white':'border-b-black'}
                        `
                    }
                    onClick={()=>setTab("Follower")}
                >
                    <p className="font-medium dark:text-white">Follower {user?user.numOfFollowers:"TopTop"}</p>
                </div>
                <div 
                    className={
                        `flex items-start justify-center p-1 py-3 w-1/4
                        ${tab==="Bạn bè"?"border-b-3":"border-b-0"}
                        ${document.documentElement.classList.contains('dark')?'border-b-white':'border-b-black'}
                        `
                    }
                    onClick={()=>setTab("Bạn bè")}
                >
                    <p className="font-medium dark:text-white">Bạn bè {user?user.numOfFriends:"TopTop"}</p>
                </div>
                <div 
                    className={
                        `flex items-start justify-center p-1 py-3 w-1/4
                        ${tab==="Được đề xuất"?"border-b-3":"border-b-0"}
                        ${document.documentElement.classList.contains('dark')?'border-b-white':'border-b-black'}
                        `
                    }
                    onClick={()=>setTab("Được đề xuất")}
                >
                    <p className="font-medium dark:text-white">Được đề xuất</p>
                </div>
            </div>
            <div className="w-full h-full p-3 ps-5 flex flex-col gap-6 overflow-y-auto">
                {tab==="Đã follow"&&followeds.map((item,index)=>{
                    return(
                        <div key={index} className="flex gap-4 justify-start items-center">
                            <img src={item.profile_picture} className="w-[40px] h-[40px] object-cover rounded-full"/>
                            <p className="font-medium dark:text-white">{item.username}</p>
                        </div>
                    )
                })}
                {tab==="Follower"&&followers.map((item,index)=>{
                    return(
                        <div key={index} className="flex gap-4 justify-start items-center">
                            <img src={item.profile_picture} className="w-[40px] h-[40px] object-cover rounded-full"/>
                            <p className="font-medium dark:text-white">{item.username}</p>
                        </div>
                    )
                })}
                {tab==="Bạn bè"&&friend.map((item,index)=>{
                    return(
                        <div key={index} className="flex gap-4 justify-start items-center">
                            <img src={item.profile_picture} className="w-[40px] h-[40px] object-cover rounded-full"/>
                            <p className="font-medium">{item.username}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StatisticsProfile