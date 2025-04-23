import { useEffect, useState } from 'react'
import tiktokIcon from '../assets/tiktok-icon.png'
import createAxiosInstance from '../libs/axios/AxiosInstance'
import { BASE_URL, SUMMARY_API } from '../shared/Route'
import { toast } from 'react-toastify'
import { FaShare } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";
import convertNumToString from '../helper/convertNumToString'
import ProfilePostItem from '../components/ProfilePostItem'

const userID='6801c83174602c8e7b70a33b'
const Profile=()=>{
    const [user,setUser]=useState(null)
    const [postType,setPostType]=useState('Video')
    const [postTypeHover,setPostTypeHover]=useState(postType)
    const [sortPost,setSortPost]=useState('Mới nhất')
    const [postList,setPostList]=useState([])
    const [postListFinal,setPostListFinal]=useState(null);
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const axiosInstance=createAxiosInstance(BASE_URL)
                let result=await axiosInstance.get(SUMMARY_API.user.get.replace(":userID",userID))
                setUser(result.data)
            } catch (error) {
                toast(error.response?.data?.message||"Lỗi khi lấy thông tin user")
            }
        }

        fetchUser()

        const fetchPost=async()=>{
            try {
                const axiosInstance=createAxiosInstance(BASE_URL)
                let result=await axiosInstance.get(SUMMARY_API.post.get.byUser.replace(':user',userID))
                console.log(result.data);
                
                setPostList(result.data)
                setPostListFinal(result.data)
            } catch (error) {
                toast(error.response?.data?.message||"Lỗi khi lấy các post của user")
            }
        }

        fetchPost()
        
    },[])

    const sortPostHandler=(value)=>{
        setSortPost(value)
        let tempList
        switch (value) {
            case "Mới nhất":
                tempList=postList.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
                return setPostListFinal(tempList)
            case "Thịnh hành":
                tempList=postList.sort((a,b)=>new Date(b.numOfLikes)-new Date(a.numOfLikes))
                return setPostListFinal(tempList)  
            case "Cũ nhất":
                tempList=postList.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt))
                return setPostListFinal(tempList)
            default:
                break;
        }
    }

    return(
        <div className='p-6 gap-4 flex flex-col items w-full items-start justify-start'>
            <div className='flex lg:flex-row lg:items-start lg:justify-start md:flex-col md:items-center  gap-5'>
                <img src={user?user.profile_picture:tiktokIcon} className='rounded-full w-[300px] h-[300px] object-contain'/>
                <div className='flex flex-col gap-6 ps-4 items-start justify-start min-w-[600px]'>
                    <div className='flex gap-5 items-center lg:justify-start md:justify-center w-full'>
                        <p className='text-3xl font-bold'>{user?user.username:"TopTop"}</p>
                        {user&&user.blue_tick&&(
                            <FaCircleCheck color='blue' className='text-3xl'/>
                        )}
                        <p className='text-3xl font-medium'>{user?user.display_name:'TopTop'}</p>  
                    </div>
                    <div className='flex gap-5 items-center justify-start  w-full'>
                        <button 
                            className='bg-red-500 rounded-lg text-white text-2xl font-medium p-4 px-10
                            hover:bg-red-600 cursor-pointer'
                        >
                            Follow
                        </button>
                        <button 
                            className='bg-gray-200 rounded-lg text-2xl font-medium p-4 px-10
                            hover:bg-gray-300 cursor-pointer'
                        >
                            Tin nhắn
                        </button>
                        <button 
                            className='bg-gray-200 rounded-lg text-2xl font-medium p-4
                            hover:bg-gray-300 cursor-pointer'
                        >
                            <FaShare />
                        </button>
                        <button 
                            className='bg-gray-200 rounded-lg text-2xl font-medium p-4
                            hover:bg-gray-300 cursor-pointer'
                        >
                            <HiOutlineDotsHorizontal />
                        </button>
                    </div>
                    <div className='flex gap-8 items-start justify-start  w-full'>
                        <div className='flex gap-4'>
                            <p className='font-bold text-3xl'>
                                {user?user.numOfFolloweds:'TopTop'}
                            </p>
                            <button className='bg-white border-0 hover:border-b-gray-500 hover:underline cursor-pointer text-gray-500 text-3xl'>
                                Đã follow
                            </button>
                        </div>
                        <div className='flex gap-4'>
                            <p className='font-bold text-3xl'>
                                {user&&user.numOfFollowers>=1000?
                                    convertNumToString(user.numOfFollowers)
                                    :user?user.numOfFollowers:'TopTtop'
                                }
                            </p>
                            <button className='bg-white border-0 hover:border-b-gray-500 hover:underline cursor-pointer text-gray-500 text-3xl'>
                                Follower
                            </button>
                        </div>
                        <div className='flex gap-4'>
                            <p className='font-bold text-3xl'>
                                {user&&user.numOfLikes>=1000?
                                    convertNumToString(user.numOfLikes)
                                    :user?user.numOfLikes:'TopTop'
                                }
                            </p>
                            <p className='text-gray-500 text-3xl'>
                                Lượt thích
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center justify-start'>
                        <p className='text-2xl'>
                            {
                                user&&user.description===''?
                                'Người dùng chưa có thông tin giới thiệu'
                                :user?user.description:'description'
                            }
                        </p>
                    </div>
                    <div className='flex gap-5 items-center justify-start'>
                        
                    </div>
                </div>
            </div>
            <div className='flex md:flex-col md:items-center md:gap-3 md:pb-4 lg:flex-row lg:gap-0 lg:pb-0 w-full border-b-3 border-b-gray-200'>
                <div className='lg:w-6/10 md:w-full flex'>
                    <div className='flex relative justify-start w-full max-w-[900px]'>
                        <div
                            className="absolute bottom-0 left-0 w-1/3 h-[3px] bg-black transition-all duration-400 ease-in-out"
                            style={{
                                transform: `translateX(${postTypeHover === 'Video' ? '0%' : postTypeHover === 'Bài đăng lại' ? '100%' : '200%'})`
                            }}
                        />
                        <div className='w-1/3 flex items-center max-w-[300px] justify-center cursor-pointer p-0'
                            onClick={()=>setPostType('Video')}
                            onMouseEnter={()=>setPostTypeHover('Video')}
                            onMouseLeave={()=>setPostTypeHover(postType)}
                        >
                                <p 
                                    className={`text-2xl font-medium w-full text-center py-4 border-b-3 border-white
                                        ${postTypeHover==='Video'?'text-black':'text-gray-400'}`}
                                >
                                    Video
                                </p>
                        </div>
                        <div className='w-1/3 flex items-center max-w-[300px] justify-center cursor-pointer p-0'
                            onClick={()=>setPostType('Bài đăng lại')}
                            onMouseEnter={()=>setPostTypeHover('Bài đăng lại')}
                            onMouseLeave={()=>setPostTypeHover(postType)}
                        >
                                <p 
                                    className={`text-2xl font-medium w-full text-center py-4 border-b-3 border-white
                                        ${postTypeHover==='Bài đăng lại'?'text-black':'text-gray-400'}`}
                                >
                                    Bài đăng lại
                                </p>
                        </div>
                        <div className='w-1/3 flex items-center max-w-[300px] justify-center cursor-pointer p-0'
                            onClick={()=>setPostType('Đã thích')}
                            onMouseEnter={()=>setPostTypeHover('Đã thích')}
                            onMouseLeave={()=>setPostTypeHover(postType)}
                        >
                                <p 
                                    className={`text-2xl font-medium w-full text-center py-4 border-b-3 border-white
                                        ${postTypeHover==='Đã thích'?'text-black':'text-gray-400'}`}
                                >
                                    Đã thích
                                </p>
                        </div>
                    </div>
                    
                </div>
                <div className='lg:w-4/10 md:w-full flex lg:justify-end md:justify-center items-center'>
                    {postType==='Video'&&(
                        <div className='flex p-1 gap-1 item-center justify-center bg-gray-300 cursor-pointer rounded-lg text-lg font-medium'>
                            <p 
                                className={`px-3 py-2 rounded-lg ${sortPost==="Mới nhất"?'bg-white text-black':'bg-gray-300 text-gray-500'}`}
                                onClick={()=>sortPostHandler("Mới nhất")}
                            >
                                Mới nhất
                            </p>
                            <p 
                                className={`px-3 py-2 rounded-lg ${sortPost==="Thịnh hành"?'bg-white text-black':'bg-gray-300 text-gray-500'}`}
                                onClick={()=>sortPostHandler("Thịnh hành")}
                            >
                                Thịnh hành
                            </p>
                            <p 
                                className={`px-3 py-2 rounded-lg ${sortPost==="Cũ nhất"?'bg-white text-black':'bg-gray-300 text-gray-500'}`}
                                onClick={()=>sortPostHandler("Cũ nhất")}
                            >
                                Cũ nhất
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-wrap gap-3 w-full items-start justify-start'>
                {postListFinal&&postListFinal.map((item,index)=>{
                    return(
                        <ProfilePostItem key={index} item={item}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile