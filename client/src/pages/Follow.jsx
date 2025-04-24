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
        const fetchAllUser=async()=>{
            try {
                const axiosInstance=createAxiosInstance(BASE_URL)
                const res=await axiosInstance.post(SUMMARY_API.user.get.all,{
                    page,
                    limit
                })
                
                setFollowed(res.data.data)
            } catch (error) {
                toast.error(error.message||"Lỗi khi get follower")
            }
        }

        if(user.followeds.length===0){
            fetchAllUser()
        }
        else{
            setFollowed(user.followeds)
        }
    },[])
    return(
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3 mx-auto w-full min-w-[300px]">
            {followed.map((item,index)=>
                <FollowerItem user={item} key={index}/>
            )}
        </div>
    )
}

export default Follow