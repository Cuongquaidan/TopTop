import { useSelector } from "react-redux";
import FollowerItem from "../components/FollowerItem";
import { useCallback, useEffect, useRef, useState } from "react";
import createAxiosInstance from "../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../shared/Route";
import { toast } from "react-toastify";
import useGetPostByCursor from "../hooks/useGetPostByCursor";
import PostItem from "../components/post/PostItem";
import useGetPostOfFollowedByCursor from "../hooks/useGetPostOfFollowedByCursor";

const Follow=()=>{
    const user=useSelector(state=>state.user.user)
    
    const [famousUser,setFamousUser]=useState([])
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
      } = useGetPostOfFollowedByCursor(user._id);
      const observerRef = useRef(null);
    
      const scrollRef = useRef(null);
      const setLastItemRef = useCallback(
        (node) => {
          if (observerRef.current) observerRef.current.disconnect();
    
          observerRef.current = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            },
            { threshold: 1.0 }
          );
    
          if (node) observerRef.current.observe(node);
        },
        [hasNextPage, isFetchingNextPage]
      );
    useEffect(()=>{
        const fetchFamousUser=async()=>{
            try {
                const axiosInstance=createAxiosInstance(BASE_URL)
                const res=await axiosInstance.post(SUMMARY_API.user.get.famous,{
                    user
                })
                
                setFamousUser(res.data)
            } catch (error) {
                toast.error(error.message||"Lỗi khi get famous user")
            }
        }

        // const fetchFolloweds=async()=>{
        //     try {
        //         const axiosInstance=createAxiosInstance(BASE_URL)
        //         const res=await axiosInstance.get(SUMMARY_API.user.get.byID.replace(":userID",user._id))
                
        //         setFollowed(res.data.followeds)
        //     } catch (error) {
        //         toast.error(error.message||"Lỗi khi get followeds")
        //     }
        // }

        // if(user.followeds.length===0){
            fetchFamousUser()
        // }
        // else{
        //     fetchFolloweds()
        // }
    },[])
    return(
        <div>
            {data && data.pages[0].data.length > 0   ?(
                <div
        ref={scrollRef}
        className="fixed top-0 pl-15 left-1/2 transform -translate-x-1/2 overflow-auto scroll-video h-screen hidden-scroll-bar flex flex-col w-full items-center z-0"
      >
        {data.pages.map((page, i) =>
          page.data.map((item, j) => (
            <div
              key={item._id}
              ref={
                i === data.pages.length - 1 &&
                j === page.data.length - 1
                  ? setLastItemRef 
                  : null
              }
            >
              <PostItem item={item} />
            </div>
          ))
        )}
      </div>
            ):(
                
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3 mx-auto w-full min-w-[300px]">
            {
                famousUser.map((item)=>(
                    <FollowerItem item={item} key={item._id}></FollowerItem>
                ))
            }
        </div>
            )}
        </div>
    )
}

export default Follow