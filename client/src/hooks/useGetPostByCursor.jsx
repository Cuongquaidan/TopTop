import { useInfiniteQuery } from '@tanstack/react-query';
import createAxiosInstance from '../libs/axios/AxiosInstance';
import { BASE_URL, SUMMARY_API } from '../shared/Route';

const fetchPosts = async ({pageParam=null, limit, onlyVideo})=>{
  const axiosInstance = createAxiosInstance(BASE_URL);
  const data = await axiosInstance.get(SUMMARY_API.post.get.byCursor,{
    params:{
      cursor:pageParam,
      limit:limit,
      onlyVideo:onlyVideo
    }
  })
  console.log('data:',data.data);
  return data.data
}

const useGetPostByCursor = (limit= 5, onlyVideo = false)=>{
  return useInfiniteQuery({
    queryKey: ['posts', limit, onlyVideo],
    queryFn: ({ pageParam = null }) => fetchPosts({ pageParam, limit, onlyVideo }),
    getNextPageParam:(lastPage)=>{
      return lastPage.nextCursor
    },
  })
}

export default useGetPostByCursor