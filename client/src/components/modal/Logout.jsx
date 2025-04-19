import React from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../redux/features/userSlice'


function Logout() {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto text-center space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Bạn có chắc muốn đăng xuất?</h2>
      
      <div className="flex justify-center gap-4">
        <button
          className="px-6 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Có
        </button>
        <button
          className="px-6 py-2 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition"
        >
          Không
        </button>
      </div>
    </div>
  )
}

export default Logout
