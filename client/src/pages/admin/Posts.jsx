import React from 'react'
import PostTable from '../../components/admin/table/PostTable'
import posts from '../../data/DataPost'
import Pagination from '../../components/Pagination'

function Posts() {
  return (
  <div className='flex h-full flex-col items-center '>
      <div className='h-[80%] overflow-y-auto'>
      <PostTable posts={posts}></PostTable>
    </div>
    <div className='flex justify-center items-center mt-6'>
      <Pagination currentPage={5} total={10} onPageChange={()=>{} } onPageSizeChange={()=>{}}></Pagination>
    </div>
  </div>
  )
}

export default Posts