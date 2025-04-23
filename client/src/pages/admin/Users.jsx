import React, {useState} from 'react'
import UserTable from '../../components/admin/table/UserTable'
import users from '../../data/DataUser'
import Pagination from '../../components/Pagination'
import ButtonImport from '../../components/admin/ButtonImport'
import { SUMMARY_API } from '../../shared/Route'
function Users() {
  const [data, setData] = useState([])
  return (
    <div className='flex h-full flex-col items-center px-10 '>
    <div className='w-full flex justify-end'>
      <ButtonImport endpoint={SUMMARY_API.user.import} setData={setData}></ButtonImport>
    </div>
      <div className='h-[70%] overflow-y-auto w-full'>
      <UserTable users={users}></UserTable>
    </div>
    <div className='flex justify-center items-center mt-6'>
      <Pagination currentPage={5} total={10} onPageChange={()=>{} } onPageSizeChange={()=>{}}></Pagination>
      </div>
    </div>
  )
}

export default Users