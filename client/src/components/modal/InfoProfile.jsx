import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tiktokIcon from '../../assets/tiktok-icon.png'
import { FaPen } from "react-icons/fa";
import createAxiosInstance from "../../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../../shared/Route";
import { useNavigate } from 'react-router-dom';
import { setUser } from "../../redux/features/userSlice";
import { IoReload } from "react-icons/io5";

const InfoProfile = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const avatarRef=useRef()
    const [loading,setLoading]=useState(false)
    const [profilePicture,setProfilePicture]=useState(user.profile_picture)
    const [uploadPicture,setUploadPicture]=useState(null)
    const [descLenght,setDescLength]=useState(user.description.length)
    const [username,setUsername]=useState(user.username)
    const [displayName,setDisplayName]=useState(user.display_name)
    const [desc,setDesc]=useState(user.description)

    const cancelHandler=()=>{
        setUsername(user.username)
        setDisplayName(user.display_name)
        setDesc(user.description)
        setDescLength(user.description.length)
        setProfilePicture(user.profile_picture)
        navigate(0)
    }

    const chooseImagesHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadPicture(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };    

    const updateInfoHandeler=async()=>{
        try {
            setLoading(true)
            const axiosInstance=createAxiosInstance(BASE_URL)
            let res=await axiosInstance.put(SUMMARY_API.user.put.update,{
                user,
                username:username,
                display_name:displayName,
                description:desc
            })

            dispatch(setUser({
                user:res.data
            }))

            if(uploadPicture){                
                const formData=new FormData()
                formData.append('userID',user._id)
                formData.append('profile_picture',uploadPicture)
                res=await axiosInstance.put(SUMMARY_API.user.put.updateProfilePicture,formData)
                dispatch(setUser({
                    user:res.data
                }))
            } 
            navigate(0)
            setLoading(false)
        } catch (error) {
            console.log(error.message||"Lỗi server khi cập nhật thông tin user");
        }
    }

    return (
        <div className="flex flex-col gap-2 px-6 pb-6 overflow-y-auto h-full">
            <h1 className="text-2xl font-medium">
                Sửa hồ sơ
            </h1>
            <input type='file' className='hidden'
                accept='image/*'
                ref={avatarRef}
                onChange={chooseImagesHandler}
            />
            {/* Ảnh hồ sơ */}
            <div className="flex flex-col items-center gap-2 border-t-2 py-4 border-gray-300">
                <p className="text-lg font-medium w-full">Ảnh hồ sơ</p>
                <div className="relative">
                    <img
                        src={profilePicture||tiktokIcon}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <button 
                        className="border-1 border-gray-400 absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer"
                        onClick={()=>avatarRef.current.click()}    
                    >
                        <FaPen />
                    </button>
                </div>
            </div>

            {/* TikTok ID */}
            <div className="flex flex-col gap-1 border-t-2 py-4 border-gray-300 ">
                <p className="text-lg font-medium w-full">TikTok ID</p>
                <input
                    type="text"
                    value={username}
                    className="bg-gray-200 cursor-pointer p-2 rounded-xl"
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                    www.tiktok.com/@{username} <br />
                    TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi TikTok ID, liên kết hồ sơ của bạn cũng sẽ thay đổi.
                </p>
            </div>

            {/* Tên */}
            <div className="flex flex-col gap-1 border-t-2 py-4 border-gray-300">
                <p className="text-lg font-medium w-full">Tên</p>
                <input
                    type="text"
                    value={displayName}
                    className="bg-gray-200 cursor-pointer p-2 rounded-xl"
                    onChange={(e)=>setDisplayName(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                    Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.
                </p>
            </div>

            {/* Tiểu sử */}
            <div className="flex flex-col gap-1 border-t-2 py-4 border-gray-300">
                <p className="text-lg font-medium w-full">Tiểu sử</p>
                <textarea
                    placeholder="Tiểu sử"
                    value={desc||""}
                    maxLength={80}
                    className="bg-gray-200 cursor-pointer rounded-lg p-3 text-sm resize-none h-24"
                    onChange={(e)=>{
                        setDesc(e.target.value)
                        setDescLength(e.target.value.length)
                    }}
                />
                <div className="text-right text-xs text-gray-400">{descLenght}/80</div>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end gap-2 mt-4 border-t-2 py-4 border-gray-300">
                <button className="p-2 px-5 rounded-xl border-1 border-gray-300 cursor-pointer" onClick={cancelHandler}>Hủy</button>
                {loading?
                    (
                        <button 
                        className='bg-red-600/80 p-2 rounded-xl px-5 text-white text-lg flex items-center justify-center
                        cursor-not-allowed'
                        >
                            <IoReload className='animate-spin text-xl'/>
                        </button>
                    ):(      
                        <button className="p-2 px-5 rounded-xl border-1 border-gray-300 cursor-pointer" onClick={updateInfoHandeler}>Lưu</button>
                    )
                }
            </div>
        </div>
    );
};

export default InfoProfile;