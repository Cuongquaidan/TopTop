import React from 'react'
import LayoutAdmin from './LayoutAdmin'
import { Outlet } from 'react-router-dom'

function AdminRoute() {
  return (
    <div>
      <LayoutAdmin>
        <Outlet></Outlet>
      </LayoutAdmin>
    </div>
  )
}

export default AdminRoute