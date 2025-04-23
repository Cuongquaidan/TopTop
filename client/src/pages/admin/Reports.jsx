import React, { useEffect, useState } from 'react'
import ReportTable from '../../components/admin/table/ReportTable'
import reports from '../../data/DataReports'
import Pagination from '../../components/Pagination'
import createAxiosInstance from '../../libs/axios/AxiosInstance'
import { BASE_URL, SUMMARY_API } from '../../shared/Route'
import { toast } from 'react-toastify'

function Reports() {
  const [page,setPage]=useState(1)
  const limit=10
  const [data,setData]=useState(reports)
  useEffect(()=>{
    const fetchReport=async()=>{
      try {
        const axiosInstance=createAxiosInstance(BASE_URL)
        const res=await axiosInstance.post(SUMMARY_API.report.get.all,{
          page,
          limit
        })
        setData(res.data)
        toast.success(res.message||"Lấy danh sách report thành công")
      } catch (error) {
        toast.error(error.message||"Lỗi server")
      }
    }
  },[page])

  return (
    <div className='flex h-full flex-col items-center '>
      <div className='h-[80%] overflow-y-auto'>
      <ReportTable reports={data.data||reports}></ReportTable>
      
    </div>
    <div className='flex justify-center items-center mt-6'>
      <Pagination currentPage={page} total={Math.ceil(data.totalItem/limit)} onPageChange={setPage} onPageSizeChange={()=>{}}></Pagination>
    </div>
    </div>
  )
}

export default Reports