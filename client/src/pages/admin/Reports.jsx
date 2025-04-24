import React, { useEffect, useState } from 'react'
import ReportTable from '../../components/admin/table/ReportTable'
import reports from '../../data/DataReports'
import Pagination from '../../components/Pagination'
import ButtonImport from '../../components/admin/ButtonImport'
import createAxiosInstance from '../../libs/axios/AxiosInstance'
import { BASE_URL, SUMMARY_API } from '../../shared/Route'
import { toast } from 'react-toastify'

function Reports() {
  const [page,setPage]=useState(1)
  const [limit,setLimit] =useState(10)
  const [data,setData]=useState(reports)
  const fetchReport=async()=>{
    try {
      const axiosInstance=createAxiosInstance(BASE_URL)
      const res=await axiosInstance.post(SUMMARY_API.report.get.all,{
        page,
        limit
      })
      setData(res.data)
      
    } catch (error) {
      console.error(error.message||"Lỗi server")
    }
  }
  useEffect(()=>{
    
    fetchReport()
  },[page,limit])

  return (
    <div className='flex h-full w-full flex-col items-center px-10'>
      <div className='w-full flex justify-end'>
        <ButtonImport 
        endpoint={SUMMARY_API.report.import}
        fetchData={fetchReport}
          ></ButtonImport>
      </div>
      <div className='h-[700px] w-full overflow-y-auto'>
        <ReportTable reports={data.data||reports}></ReportTable>
      </div>
      <div className='flex justify-center items-center mt-6'>
        <Pagination currentPage={page} total={Math.ceil(data.totalItem/limit)} onPageChange={setPage} onPageSizeChange={setLimit} pageSize={limit}></Pagination>
      </div>
    </div>
  )
}

export default Reports