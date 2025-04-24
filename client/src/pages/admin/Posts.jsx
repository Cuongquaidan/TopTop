import React, { useEffect, useState } from 'react'
import PostTable from '../../components/admin/table/PostTable'
import posts from '../../data/DataPost'
import Pagination from '../../components/Pagination'
import ButtonImport from '../../components/admin/ButtonImport'
import createAxiosInstance from '../../libs/axios/AxiosInstance'
import { BASE_URL, SUMMARY_API } from '../../shared/Route'
import { toast } from 'react-toastify'

function Posts() {
  const [page,setPage]=useState(1)
  const [data,setData]=useState(posts)
  const [limit,setLimit] =useState(10)
  const fetchPost=async()=>{
    try {
      const axiosInstance=createAxiosInstance(BASE_URL)
      console.log('page:',page);
      
      const res=await axiosInstance.post(SUMMARY_API.post.get.all,{
        page:parseInt(page),
        limit
      })
      setData(res.data)
    } catch (error) {
      console.error(error.message||"Lỗi server")
    }
  }
  useEffect(()=>{

    fetchPost()
  },[page,limit])
  return (
  <div className='flex flex-col items-center  px-10 cursor-pointer'>
    <div className='w-full flex justify-end cursor-pointer'>
      <ButtonImport endpoint={SUMMARY_API.post.import} fetchData={fetchPost}></ButtonImport>
    </div>
    <div className='h-[700px] w-full overflow-y-auto'>
      <PostTable posts={data.data||data}></PostTable>
    </div>
    <div className='flex justify-center items-center mt-6 cursor-pointer'>
      <Pagination pageSize={limit}  currentPage={page} total={Math.ceil(data.totalItem/limit)} onPageChange={setPage} onPageSizeChange={setLimit}></Pagination>
    </div>
  </div>
  )
}

export default Posts