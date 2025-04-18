import React from 'react'
import { Link } from 'react-router-dom'

function LayoutAdmin() {
  return (
    <div className='grid grid-cols-[300px_1fr]'>
      <div className='bg-white'>
          <Link to={"/admin/dashboard"}>

          </Link>
      </div>
    </div>
  )
}

export default LayoutAdmin