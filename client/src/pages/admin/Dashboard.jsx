import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import createAxiosInstance from '../../libs/axios/AxiosInstance';
import { BASE_URL, SUMMARY_API } from '../../shared/Route';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export const typePostInYear = {
  video : 20000,
  image : 5000,
}
export const statisticsNewPostsInMonthAndYear = [20000, 5000, 10000, 20000, 5000, 10000, 20000, 5000, 10000, 20000, 5000, 10000]

export const statisticsNewUsersInMonthAndYear = [20000, 5000, 10000, 20000, 15000, 100030, 20000, 5000, 30000, 20000, 5000, 10000]

export const statisticsNewReportsInMonthAndYear = [20000, 5000, 10000, 20000, 5000, 10000, 20000, 5000, 10000, 20000, 5000, 10000]
export const statusOfReport = {
  pending: 10000,
  reviewed: 5000,
  action_taken: 20000
}
export const optionsForNewPosts = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'New Posts In Month And Year',
    },
  },
};
export const optionsForNewUsers = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'New Users In Month And Year',
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function Dashboard() {
  const [realTypePostInYear,setRealTypePostInYear]=useState([typePostInYear])
  const [newPostsInMonthAndYear,setNewPostsInMonthAndYear]=useState(statisticsNewPostsInMonthAndYear)
  const [newUsersInMonthAndYear,setNewUsersInMonthAndYear]=useState(statisticsNewUsersInMonthAndYear)
  const [newReportsInMonthAndYear,setNewReportsInMonthAndYear]=useState(statisticsNewReportsInMonthAndYear)
  const [realStatusOfReport,setRealStatusOfReport]=useState(statusOfReport)
  const limit=1000000000
  useEffect(()=>{
    const fetchPost=async()=>{
      try {
        const axiosInstance=createAxiosInstance(BASE_URL)
        const res=await axiosInstance.post(SUMMARY_API.post.get.all,{
          limit
        })
        const videoPost=res.data.data.filter(item=>item.type==='video').length
        const imagePost=res.data.data.filter(item=>item.type==='image').length
        setRealTypePostInYear({
          video:videoPost,
          image:imagePost
        })
        
        let postCountByMonth=Array(12).fill(0);
        const currentYear=new Date(Date.now()).getFullYear();
        res.data.data.forEach(item=>{
          const month=new Date(item.createdAt).getMonth()
          if(new Date(item.createdAt).getFullYear()===currentYear)
            postCountByMonth[month]++
        })
        setNewPostsInMonthAndYear(postCountByMonth)
        
      } catch (error) {
        toast.error(error.message||"Lỗi server")
      }
    }

    const fetchUser=async()=>{
      try {
        const axiosInstance=createAxiosInstance(BASE_URL)
        const res=await axiosInstance.post(SUMMARY_API.user.get.all,{
          limit
        })
        
        let newUserCountByMonth=Array(12).fill(0);
        const currentYear=new Date(Date.now()).getFullYear();
        res.data.data.forEach(item=>{
          const month=new Date(item.createdAt).getMonth()
          if(new Date(item.createdAt).getFullYear()===currentYear)
            newUserCountByMonth[month]++
        })
        setNewUsersInMonthAndYear(newUserCountByMonth)
        
      } catch (error) {
        toast.error(error.message||"Lỗi server")
      }
    }
    const fetchReport=async()=>{
      try {
        const axiosInstance=createAxiosInstance(BASE_URL)
        const res=await axiosInstance.post(SUMMARY_API.report.get.all,{
          limit
        })
        
        let newReportCountByMonth=Array(12).fill(0);
        const currentYear=new Date(Date.now()).getFullYear();
        res.data.data.forEach(item=>{
          const month=new Date(item.createdAt).getMonth()
          if(new Date(item.createdAt).getFullYear()===currentYear)
            newReportCountByMonth[month]++
        })
        setNewReportsInMonthAndYear(newReportCountByMonth)
        setRealStatusOfReport({
          pending:res.data.data.filter(item=>item.status==='pending').length,
          reviewed:res.data.data.filter(item=>item.status==='reviewed').length,
          action_taken:res.data.data.filter(item=>item.status==='action_taken').length
        })
      } catch (error) {
        toast.error(error.message||"Lỗi server")
      }
    }

    fetchPost()
    fetchUser()
    fetchReport()
  },[])
  const [tab,setTab] = useState("reports")
  return (
    <div className='w-full h-full flex flex-col   p-10'>
      <div className='grid w-full grid-cols-3'>
      <button className={`px-4  py-2 text-xl cursor-pointer font-semibold border border-t-4 border-slate-400 hover:border-slate-400 ${tab === "posts" ? " border-transparent bg-slate-200 !border-t-blue-400" : " border-t-transparent"}`}  onClick={() => setTab("posts")}>
          Posts
        </button>
        <button className={`px-4  py-2 text-xl cursor-pointer font-semibold border border-t-4 border-slate-400 hover:border-slate-400 ${tab === "users" ? " border-transparent bg-slate-200 !border-t-blue-400" : " border-t-transparent"}`}  onClick={() => setTab("users")}>
          Users
        </button>
        <button className={`px-4  py-2 text-xl cursor-pointer font-semibold border border-t-4 border-slate-400 hover:border-slate-400 ${tab === "reports" ? " border-transparent bg-slate-200 !border-t-blue-400" : " border-t-transparent"}`}  onClick={() => setTab("reports")}>
          Reports
        </button>
      </div>
      <div className= " h-full overflow-auto py-4">
        {
          tab === "posts" && (
            <div className='w-full flex flex-col gap-10 mt-10'>
            <div className='p-4 grid grid-cols-2 gap-10'>
            <div className='flex flex-col gap-10'>
            <h2 className='font-bold italic text-2xl'>Loại bài trong năm</h2>
            <div className='w-[50%] '>
            <Pie className='' data={{
              labels: [
                   `Video (${realTypePostInYear.video})`,
                   `Image (${realTypePostInYear.image})`,
          ],
              datasets:[
                {
                  label: "num of post",
                  data: Object.values(typePostInYear),
                  backgroundColor: [
                    "rgba(255, 11, 85, 1)",
                    "rgba(1, 24, 216, 1)",
                  ],
                }
              ]
            }} />
            </div>

            </div>
            <div className='flex flex-col gap-10'>
            <h2 className='font-bold italic text-2xl'>Số bài mới trong năm</h2>
            <div className='w-[full] '>
            <Line options={optionsForNewPosts} data={{
              labels,
              datasets: [
                {
                  label: 'Số bài mới trong năm',
                  data: newPostsInMonthAndYear,
                  borderColor: 'rgba(255, 11, 85, 0.5)',
                  backgroundColor: 'rgba(255, 11, 85, 1)',
                },
              ],
            }} />;
            </div>

            </div>
            </div>
           
        
            </div>
          )
        }
        {
          tab === "users" && (
            <div className='w-full flex flex-col gap-10 mt-10 h-full '>
            <div className='p-4 grid grid-cols-1 gap-10  '>
         
            <div className='flex flex-col gap-10 '>
            <h2 className='font-bold italic text-2xl'>Số người mới trong năm</h2>
            <div className='w-[80%]   '>
            <Line options={optionsForNewUsers} data={{
              labels,
              datasets: [
                {
                  label: 'Số người mới trong năm',
                  data: newUsersInMonthAndYear,
                  borderColor: 'rgba(255, 11, 85, 0.5)',
                  backgroundColor: 'rgba(255, 11, 85, 1)',
                },
              ],
            }} />;
            </div>

            </div>
            </div>
           
        
            </div>
          )
        }
        {
          tab === "reports" && (
            <div className='w-full flex flex-col gap-10 mt-10'>
            <div className='p-4 grid grid-cols-2 gap-10'>
            <div className='flex flex-col gap-10'>
            <h2 className='font-bold italic text-2xl'>Trạng thái của các report trong năm</h2>
            <div className='w-[50%] '>
            <Pie className='' data={{
              labels: [
                   `Pending: (${realStatusOfReport["pending"]})`,
                   `Reviewed: (${realStatusOfReport["reviewed"]})`,
                     `Action taken: (${realStatusOfReport["action_taken"]})`,
          ],
              datasets:[
                {
                  label: "num of post",
                  data: Object.values(realStatusOfReport),
                  backgroundColor: [
                    "rgba(255, 11, 85, 1)",
                    "rgba(1, 24, 216, 1)",
                    "rgba(254, 79, 45, 1)",
                  ],
                }
              ]
            }} />
            </div>

            </div>
            <div className='flex flex-col gap-10'>
            <h2 className='font-bold italic text-2xl'>Number of new reports in year</h2>
            <div className='w-[full] '>
            <Line options={optionsForNewPosts} data={{
              labels,
              datasets: [
                {
                  label: 'Number of new reports in year',
                  data: newReportsInMonthAndYear,
                  borderColor: 'rgba(254, 79, 45, 0.5)',
                  backgroundColor: 'rgba(254, 79, 45, 1)',
                },
              ],
            }} />;
            </div>

            </div>
            </div>
           
        
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Dashboard