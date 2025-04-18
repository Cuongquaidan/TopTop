import React from 'react'
import UserTable from '../../components/admin/table/UserTable'
import users from '../../data/DataUser'
import Pagination from '../../components/Pagination'

function Users() {
  return (
    <div className='flex h-full flex-col items-center '>
      <div className='h-[80%] overflow-y-auto w-full'>
      <UserTable users={users}></UserTable>
    </div>
    <div className='flex justify-center items-center mt-6'>
      <Pagination currentPage={5} total={10} onPageChange={()=>{} } onPageSizeChange={()=>{}}></Pagination>
      </div>
    </div>
  )
}

export default Users