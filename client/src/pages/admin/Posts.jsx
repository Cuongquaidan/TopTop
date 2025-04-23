import React, { useState } from 'react'
import PostTable from '../../components/admin/table/PostTable'
import posts from '../../data/DataPost'
import Pagination from '../../components/Pagination'
import ButtonImport from '../../components/admin/ButtonImport'
import { SUMMARY_API } from '../../shared/Route'

function Posts() {
  const [data, setData] = useState([])
  return (
  <div className='flex h-full flex-col items-center  px-10 cursor-pointer'>
    <div className='w-full flex justify-end cursor-pointer'>
      <ButtonImport endpoint={SUMMARY_API.post.import} setData={setData}></ButtonImport>
    </div>
      <div className='h-[70%] overflow-y-auto w-full cursor-pointer'>
      <PostTable posts={posts}></PostTable>
    </div>
    <div className='flex justify-center items-center mt-6 cursor-pointer'>
      <Pagination currentPage={5} total={10} onPageChange={()=>{} } onPageSizeChange={()=>{}}></Pagination>
    </div>
  </div>
  )
}

export default Posts