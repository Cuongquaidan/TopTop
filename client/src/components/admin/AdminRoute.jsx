import React from 'react'
import LayoutAdmin from './LayoutAdmin'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function AdminRoute() {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <LayoutAdmin>
        <Outlet></Outlet>
      </LayoutAdmin>
    </div>
  )
}

export default AdminRoute