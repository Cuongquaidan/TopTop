import React, { useState, useRef, useEffect } from "react";
import titokIcon from '../assets/tiktok-icon.png'
import createAxiosInstance from "../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../shared/Route";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSelectedUser, setUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const Followeruser=({user,currentUser})=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [media,setMedia]=useState(null);
    const [isHover, setIsHover] = useState(false);
    const [followingState,setFollowingState]=useState(false)

    const clickUserHandler=()=>{
        dispatch(setSelectedUser({
            selectedUser:user
        }))
        navigate(`/profile/${user.username}`)
    }

    const followClickHandler=async(e)=>{
        const axiosInstance=createAxiosInstance(BASE_URL)
        const updateUser=currentUser
        let updateFolloweds=[...updateUser.followeds]
        let updateNumOfFolloweds=updateUser.numOfFolloweds

        e.stopPropagation()

        if(followingState===false){
            updateFolloweds.push(user._id)
            updateNumOfFolloweds++
        }
        else{
            updateFolloweds=updateFolloweds.filter(followed=>followed.toString()!==user._id.toString())
            updateNumOfFolloweds--
        }        
        
        const res=await axiosInstance.put(SUMMARY_API.user.put.update,{
            user:updateUser,
            followeds:updateFolloweds,
            numOfFolloweds:updateNumOfFolloweds
        })

        dispatch(setUser({
            user:res.data
        }))
        setFollowingState(!followingState)
    }

    useEffect(()=>{
        const fetchRandomPost=async()=>{
            try {
                const axiosInstance=createAxiosInstance(BASE_URL)
                
                const res=await axiosInstance.get(SUMMARY_API.post.get.byUser.replace(":user",user._id))
                if(res.data.length===0)
                    return
                const randomPost=res.data.find(post=>post.type==="video")
                if (randomPost&&randomPost.media){
                    setMedia(randomPost.media)
                }
                if(currentUser.followeds.includes(user._id)){
                    setFollowingState(true)
                }
            } catch (error) {
                toast.error(error.message||"Lỗi fetchRandomPost FollowerItem")
            }
        }

        fetchRandomPost()
    },[])
    return (
        <div
            style={{
                height: 400,
                userSelect: "none",
            }}
            className="min-w-[280px] max-w-[300px] rounded-2xl relative flex flex-col justify-center items-center cursor-pointer"
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
            }}
            onClick={clickUserHandler}
        >
            {isHover ? (
                <video
                    src={media?media.url:null}
                    muted={true}
                    playsInline
                    controls={false}
                    className={`object-cover w-full h-full rounded-2xl ${media?'block':'none'}`}
                    loop={true}
                    autoPlay={true}
                    onClick={(e) => {}}
                />
            ) : (
                <img
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                    }}
                    draggable={false}
                    src={media?media.thumbnail:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}
                    className="rounded-2xl shadow-2xl"
                />
            )}
            <div className="absolute flex flex-col items-center w-[80%] transform top-2/5 ">
                <img src={user.profile_picture||titokIcon} className="rounded-full w-[70px] h-[70px] object-cover"/>
                <p className="text-white text-xl font-bold mt-4">{user.display_name}</p>
                <p className="text-white text-lg font-bold">{user.username}</p>
                <button 
                    onClick={followClickHandler} 
                    className="bg-red-600 p-2 w-full rounded-lg cursor-pointer mt-3 text-white text-2xl font-semibold"
                >
                    {followingState?"Đã follow":"Follow"}
                </button>
            </div>
        </div>
    );
};

export default Followeruser;
