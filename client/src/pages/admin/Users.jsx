import React, {useEffect, useState } from 'react'
import UserTable from '../../components/admin/table/UserTable'
import users from '../../data/DataUser'
import Pagination from '../../components/Pagination'
import ButtonImport from '../../components/admin/ButtonImport'
import createAxiosInstance from '../../libs/axios/AxiosInstance'
import { BASE_URL, SUMMARY_API } from '../../shared/Route'
import { toast } from 'react-toastify'

function Users() {
  const [page,setPage]=useState(1)
  const [data,setData]=useState(users)
  const [limit,setLimit]=useState(10)
  const fetchUser=async()=>{
    try {
      const axiosInstance=createAxiosInstance(BASE_URL)
      const res=await axiosInstance.post(SUMMARY_API.user.get.all,{
        page,
        limit
      })
      setData(res.data)
     
    } catch (error) {
      console.error(error.message||"Lỗi server")
    }
  }
  useEffect(()=>{
   

    fetchUser()
  },[page,limit])
  return (
    <div className='flex h-full flex-col items-center px-10 '>
    <div className='w-full flex justify-end'>
      <ButtonImport endpoint={SUMMARY_API.user.import} fetchData={fetchUser}></ButtonImport>
    </div>
    <div className='h-[700px] w-full overflow-y-auto'>
      <UserTable users={data.data||users}></UserTable>
    </div>
    <div className='flex justify-center items-center mt-6'>
      <Pagination currentPage={page} total={Math.ceil(data.totalItem/limit)} onPageChange={setPage} onPageSizeChange={setLimit} pageSize={limit}></Pagination>
      </div>
    </div>
  )
}

export default Users