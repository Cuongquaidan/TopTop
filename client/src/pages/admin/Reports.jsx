import React from 'react'
import ReportTable from '../../components/admin/table/ReportTable'
import reports from '../../data/DataReports'
import Pagination from '../../components/Pagination'

function Reports() {
  return (
    <div className='flex h-full flex-col items-center '>
      <div className='h-[80%] overflow-y-auto'>
      <ReportTable reports={reports}></ReportTable>
      
    </div>
    <div className='flex justify-center items-center mt-6'>
      <Pagination currentPage={5} total={10} onPageChange={()=>{} } onPageSizeChange={()=>{}}></Pagination>
    </div>
    </div>
  )
}

export default Reports