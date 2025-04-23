import React, { useEffect, useState } from 'react'
import PostTable from '../../components/admin/table/PostTable'
import posts from '../../data/DataPost'
import Pagination from '../../components/Pagination'
import createAxiosInstance from '../../libs/axios/AxiosInstance'
import { BASE_URL, SUMMARY_API } from '../../shared/Route'
import { toast } from 'react-toastify'

function Posts() {
  const [page,setPage]=useState(1)
  const [data,setData]=useState(posts)
  const limit=10
  useEffect(()=>{
    const fetchPost=async()=>{
      try {
        const axiosInstance=createAxiosInstance(BASE_URL)
        console.log('page:',page);
        
        const res=await axiosInstance.post(SUMMARY_API.post.get.all,{
          page:parseInt(page),
          limit
        })
        setData(res.data)
        console.log(res.data);
        
        toast.success(res.message||"Lấy danh sách post thành công")
      } catch (error) {
        toast.error(error.message||"Lỗi server")
      }
    }

    fetchPost()
  },[page])
  return (
  <div className='flex h-full flex-col items-center '>
      <div className='h-[80%] overflow-y-auto'>
      <PostTable posts={data.data||data}></PostTable>
    </div>
    <div className='flex justify-center items-center mt-6'>
      <Pagination currentPage={page} total={Math.ceil(data.totalItem/limit)} onPageChange={setPage} onPageSizeChange={()=>{}}></Pagination>
    </div>
  </div>
  )
}

export default Posts