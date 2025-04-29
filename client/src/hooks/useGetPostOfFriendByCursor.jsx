import { useInfiniteQuery } from '@tanstack/react-query';
import createAxiosInstance from '../libs/axios/AxiosInstance';
import { BASE_URL, SUMMARY_API } from '../shared/Route';

const fetchPosts = async ({pageParam=null, userID})=>{
  const axiosInstance = createAxiosInstance(BASE_URL);
  const data = await axiosInstance.get(SUMMARY_API.post.get.ofFriends,{
    params:{
      cursor:pageParam,
      userID: userID
    }
  })
  console.log('data:',data.data);
  return data.data
}

const useGetPostOfFriendByCursor = (userID="")=>{
  return useInfiniteQuery({
    queryKey: ['posts', userID],
    queryFn: ({ pageParam = null }) => fetchPosts({ pageParam, userID }),
    getNextPageParam:(lastPage)=>{
      return lastPage.nextCursor
    },
  })
}

export default useGetPostOfFriendByCursor