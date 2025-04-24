import { useSelector } from "react-redux";
import FollowerItem from "../components/FollowerItem";
import { useEffect, useState } from "react";
import createAxiosInstance from "../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../shared/Route";
import { toast } from "react-toastify";

const Follow=()=>{
    const user=useSelector(state=>state.user.user)
    
    const [followed,setFollowed]=useState([])
    const [page,setPage]=useState(1)
    const limit=10
    useEffect(()=>{
        const fetchFamousUser=async()=>{
            try {
                const axiosInstance=createAxiosInstance(BASE_URL)
                const res=await axiosInstance.post(SUMMARY_API.user.get.famous,{
                    user
                })
                
                setFollowed(res.data)
            } catch (error) {
                toast.error(error.message||"Lỗi khi get famous user")
            }
        }

        const fetchFolloweds=async()=>{
            try {
                const axiosInstance=createAxiosInstance(BASE_URL)
                const res=await axiosInstance.get(SUMMARY_API.user.get.byID.replace(":userID",user._id))
                
                setFollowed(res.data.followeds)
            } catch (error) {
                toast.error(error.message||"Lỗi khi get followeds")
            }
        }

        if(user.followeds.length===0){
            fetchFamousUser()
        }
        else{
            fetchFolloweds()
        }
    },[])
    return(
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3 mx-auto w-full min-w-[300px]">
            {followed.map((item,index)=>
                <FollowerItem user={item} currentUser={user} key={index}/>
            )}
        </div>
    )
}

export default Follow