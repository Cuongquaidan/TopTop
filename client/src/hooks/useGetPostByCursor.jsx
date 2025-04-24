import { useInfiniteQuery } from '@tanstack/react-query';
import createAxiosInstance from '../libs/axios/AxiosInstance';
import { BASE_URL, SUMMARY_API } from '../shared/Route';

const fetchPosts = async ({pageParam=null})=>{
  const axiosInstance = createAxiosInstance(BASE_URL);
  const data = await axiosInstance.get(SUMMARY_API.post.get.byCursor,{
    params:{
      cursor:pageParam,
    }
  })
  console.log('data:',data.data);
  return data.data
}

const useGetPostByCursor = ()=>{
  return useInfiniteQuery({
    queryKey:['posts'],
    queryFn:fetchPosts,
    getNextPageParam:(lastPage)=>{
      return lastPage.nextCursor
    },
  })
}

export default useGetPostByCursor