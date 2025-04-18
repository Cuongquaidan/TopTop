import React from 'react'
import UserTable from '../../components/admin/table/UserTable'

function Users() {
  return (
    <div className='h-[80%] overflow-y-auto'>
      <UserTable></UserTable>
    </div>
  )
}

export default Users