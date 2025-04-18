import React, { use } from 'react'
import UserRow from './UserRow'
import users from '../../../data/DataUser'

function UserTable() {
  return (
    <table className="w-full text-sm text-left text-gray-500">
  <thead className="text-xs text-gray-700 font-bold bg-slate-300 uppercase ">
    <tr className=''>
      <th className="px-6 py-3">Username</th>
      <th className="px-6 py-3">Display Name</th>
      <th className="px-6 py-3">Email</th>
      <th className="px-6 py-3">Phone</th>
      <th className="px-6 py-3">State</th>
      <th className="px-6 py-3 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => 
      
      <UserRow key={user._id} user={user}></UserRow>
    )}
  </tbody>
</table>
  )
}

export default UserTable