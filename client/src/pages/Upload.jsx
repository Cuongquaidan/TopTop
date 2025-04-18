import upload from '../assets/uploadVideo.svg'
import capcut from '../assets/capcutIcon.png'
import { BsCameraReelsFill } from "react-icons/bs";
import { FaFolderMinus } from "react-icons/fa";
import { MdHd } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa6";
import { useRef, useState } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { RiExchangeLine } from "react-icons/ri";
import { FaSearchLocation } from "react-icons/fa";

const user={
    username:'test',
    display_name:'test',
    profile_picture:'https://res.cloudinary.com/dv4tzxwwo/image/upload/v1744947248/profile_picture/y0lzpa2w7ldmb5nj4fkr.png'
}

const Upload=()=>{
    
    const inputVideoRef=useRef()
    const inputThumbnailRef=useRef()
    const inputTimeUploadRef=useRef()
    const [video,setVideo]=useState(null)
    const [thumbnail,setThumbnail]=useState(null)
    const [description,setDescription]=useState('')
    const [location,setLocation]=useState('')
    const [uploadTime,setUploadTime]=useState("Now")
    const [publicState,setPublicState]=useState("Mọi người")
    const [descriptionLength,setDescriptionLength]=useState(0)
    const handleChooseVideo=(e)=>{
        const video=e.target.files[0]
        setVideo(video)
        setDescription(video.name)
        setDescriptionLength(video.name.length)
        inputVideoRef.current.value=''
    }

    const handleChangeVideo=(e)=>{
        setVideo(null)
        setThumbnail(null)
        setDescription('')
        setLocation('')
        setUploadTime("Now")
        setPublicState("Mọi người")
        setDescriptionLength(0)
        inputVideoRef.current.click()
    }

    const handleCancel=()=>{
        setVideo(null)
        setThumbnail(null)
        setDescription('')
        setLocation('')
        setUploadTime("Now")
        setPublicState("Mọi người")
        setDescriptionLength(0)
    }

    const chooseThumbnailHandler=(e)=>{
        const newThumbnail=e.target.files[0]
        setThumbnail(newThumbnail)
    }

    const changeDescriptionHandler=(e)=>{
        let newLength=e.target.value.length
        if(newLength<=4000){
            setDescription(e.target.value)
            setDescriptionLength(newLength)
        }
        else{
            alert("Tối đa 4000 ký tự")
        }
    }

    const hashTagHandler=(e)=>{
        if(descriptionLength<4000){
            setDescription(description+'#')
            setDescriptionLength(descriptionLength+1)
        }
        else{
            alert("Tối đa 4000 ký tự")
        }
    }

    const tagHandler=(e)=>{
        if(descriptionLength<4000){
            setDescription(description+'@')
            setDescriptionLength(descriptionLength+1)
        }
        else{
            alert("Tối đa 4000 ký tự")
        }
    }

    const UploadVideoHandler=async()=>{
        if(!video){
            alert("Chưa chọn video!")
            return
        }

        try {
            const formData=new FormData()
            formData.append("video",video)
            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }              
            formData.append("caption", description);
            formData.append("location", location);
            formData.append("publicity", publicState);
            formData.append("username", user.username);
            formData.append("display_name", user.display_name);
            formData.append("profile_picture", user.profile_picture);

            const res=await fetch('http://localhost:3000/video/upload',{
                method:'POST',
                body:formData
            })

            const data=await res.json()
            if(!res.ok){
                throw new Error(data.message)
            }

            alert("Upload video thành công")

            setVideo(null);
            setThumbnail(null);
            setDescription('');
            setLocation('');
            setUploadTime("Now");
            setPublicState("Mọi người");
            setDescriptionLength(0);
        } catch (error) {
            
        }
    }
    return(
        <div className="w-full h-full bg-gray-100 p-8 flex flex-col justify-start items-center min-w-[900px]">
            <input type='file' className='hidden' 
                accept='video/*'
                ref={inputVideoRef}
                onChange={handleChooseVideo}
            />
            <input type='file' className='hidden' 
                accept='image/*'
                ref={inputThumbnailRef}
                onChange={chooseThumbnailHandler}
            />
            {!video&&
            (
                <div className="w-full p-8 rounded-2xl bg-white flex flex-col border-gray-300 border">
                    <div 
                        className="flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-2xl border border-gray-300 border-dashed h-[600px] cursor-pointer
                        hover:border-blue-600"
                        onClick={()=>{inputVideoRef.current.click()}}
                    >
                        <img src={upload} className='w-[100px]'/>
                        <p className='font-bold text-3xl'>Chọn video để tải lên</p>
                        <p className='text-xl text-gray-500'>Hoặc kéo và thả vào đây</p>
                        <button 
                            className='flex items-center justify-center p-3 w-[300px] rounded-2xl bg-red-500/90 cursor-pointer text-white text-xl mt-4
                            hover:bg-red-700/80'
                        >
                            Chọn video
                        </button>
                    </div>
                    <div className='grid grid-cols-4 gap-4 mt-6'>
                        <div className='flex justify-center items-start gap-2'>
                            <BsCameraReelsFill size={30} className=''/>
                            <div>
                                <p className='font-bold text-xl'>Dung lượng và thời lượng</p>
                                <p className='text-gray-500 text-lg'>Dung lượng tối đa: 30 GB, thời lượng video: 60 phút.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <FaFolderMinus size={30} className=''/>
                            <div>
                                <p className='font-bold text-xl'>Định dạng tập tin</p>
                                <p className='text-gray-500 text-lg'>Đề xuất: “.mp4”. Có hỗ trợ các định dạng chính khác.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <MdHd size={30} className=''/>
                            <div>
                                <p className='font-bold text-xl'>Độ phân giải video</p>
                                <p className='text-gray-500 text-lg'>Độ phân giải cao khuyến nghị: 1080p, 1440p, 4K.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <FaLightbulb  size={30} className=''/>
                            <div>
                                <p className='font-bold text-xl'>Tỷ lệ khung hình</p>
                                <p className='text-gray-500 text-lg'>Đề xuất: 16:9 cho chế độ ngang, 9:16 cho chế độ dọc.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!video&&(
                <div className="w-full p-4 rounded-lg bg-white flex justify-between items-center border-gray-300 border mt-6">
                    <div>
                        <p className='font-bold text-lg'>
                            Tạo video chất lượng cao trên CapCut Online
                        </p>
                        <p className='text-lg text-gray-500'>
                            Tự động cắt ngắn video của bạn và tạo video từ kịch bản với các tính năng hoạt động bằng AI.
                        </p>
                    </div>
                    <button 
                        className='p-2 px-4 flex justify-center items-center gap-2 bg-gray-300 rounded-xl cursor-pointer
                        hover:bg-gray-400/60'
                            
                    >
                        <img src={capcut} className='object-fill w-15 h-15'/>
                        <p className='text-lg'>Thử ngay</p>
                    </button>
                </div>
            )}
            {video&&(
                <div className='flex flex-col h-full w-full gap-6'>
                    <div className='bg-white rounded-xl border border-gray-300 p-5 py-7 flex justify-between items-center'>
                        <div className='flex flex-col'>
                            <div className='flex gap-4 items-center'>
                                <p className='font-bold text-xl'>
                                    {video.name}
                                </p>
                                <p className='p-1 px-2 border rounded-xl border-gray-400'>720P</p>
                            </div>
                            <div className='flex items-center gap-2 text-green-600'>
                                <FaCircleCheck/>
                                <p>Đã tải lên ({Math.round(video.size/(1024*1024))}MB)</p>
                            </div>
                        </div>
                        <button 
                            className='bg-gray-300 p-3 rounded-xl flex items-center gap-2
                            hover:bg-gray-400/60'
                            onClick={handleChangeVideo}    
                        >
                            <RiExchangeLine size={30}/>
                            <p>Thay thế</p>
                        </button>
                    </div>
                    <p className='font-bold text-2xl mt-4'>Chi tiết</p>
                    <div className='flex flex-col p-4 items-start justify-start gap-4 rounded-2xl border-gray-300 border bg-white'>
                        <p className='font-bold text-2xl mt-2'>Mô tả</p>
                        <div className='w-full relative h-[300px] bg-gray-200 rounded-2xl'>
                            <textarea 
                                className='bg-gray-200 border-0 rounded-xl w-full h-60 p-5 text-start 
                                focus:outline-0 resize-none' 
                                placeholder='Chia sẻ thêm về video của bạn tại đây...'
                                maxLength={4001}
                                value={description}
                                onChange={changeDescriptionHandler}
                            />
                            <span className='absolute bottom-5 right-5 text-gray-500'>
                                {descriptionLength}/4000
                            </span>
                            <div className='0 absolute bottom-5 left-5'>
                                <button 
                                    className='border-0p-1 text-gray-500 font-bold text-lg
                                    cursor-pointer'
                                    onClick={hashTagHandler}
                                >
                                    # Hashtag
                                </button>
                                <button 
                                    className='border-0p-1 text-gray-500 font-bold text-lg ms-7
                                    cursor-pointer'
                                    onClick={tagHandler}
                                >
                                    # Nhắc đến
                                </button>
                            </div>
                        </div>
                        <p className='font-bold text-2xl mt-4'>Ảnh bìa</p>
                        <div 
                            className='relative flex justify-center
                            cursor-pointer'
                            onClick={()=>{inputThumbnailRef.current.click()}}
                        >
                            <img src={thumbnail} className='border border-gray-500 rounded-2xl object-cover w-[180px] h-[270px]'/>
                            <p className='absolute bottom-5 w-[80%] bg-gray-500 text-center p-1 rounded-lg text-white text-lg'>Sửa ảnh bìa</p>
                        </div>
                        <p className='font-bold text-2xl mt-4'>Vị trí</p>
                        <div className='flex justify-center items-center relative'>
                            <input 
                                list="locations" 
                                className='bg-gray-300 p-2 ps-15 w-[350px] rounded-xl relative'
                                placeholder="Tìm kiếm vị trí" 
                            />
                            <FaSearchLocation size={20} className='text-gray-500 absolute left-4'/>
                            <datalist id="locations">
                                <option value="HCM" />
                                <option value="HN" />
                                <option value="Phố đi bộ" />
                            </datalist>
                        </div>
                    </div>
                    <p className='font-bold text-2xl mt-4'>Cài đặt</p>
                    <div className='flex flex-col p-4 items-start justify-start gap-4 rounded-2xl border-gray-300 border bg-white'>
                        <p className='font-bold text-2xl mt-2'>Thời điểm đăng</p>
                        <div className='flex gap-8'>
                            <label className='flex items-center gap-2'>
                                <input type='radio' 
                                    name='timeUpload' 
                                    style={{width:20,height:20,accentColor:'red'}} 
                                    defaultChecked
                                    value={"Now"}
                                    onChange={(e)=>setUploadTime(e.target.value)}
                                />
                                <span className='text-lg'>Bây giờ</span>
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type='radio' 
                                    name='timeUpload' 
                                    style={{width:20,height:20,accentColor:'red'}}
                                    value={"Calendar"}
                                    onChange={(e)=>setUploadTime(e.target.value)}
                                />
                                <span className='text-lg'>Lên lịch</span>
                            </label>
                        </div>
                        {uploadTime==="Calendar"&&(
                            <div>
                                <input type='datetime-local' 
                                    className='p-2 rounded-xl bg-gray-300'
                                    ref={inputTimeUploadRef}
                                />
                            </div>
                        )}
                        <p className='font-bold text-2xl mt-2'>Ai có thể xem video này</p>
                        <select 
                            className='p-2 bg-gray-300 rounded-xl w-[350px] 
                            focus:bg-white focus:outline-1'
                            onChange={(e)=>setPublicState(e.target.value)}    
                        >
                            <option>Mọi người</option>
                            <option>Bạn bè</option>
                            <option>Chỉ mình bạn</option>
                        </select>
                    </div>
                    <p className='font-bold text-2xl mt-4'>Kiểm tra</p>
                    <div className='flex gap-2'>
                        <button 
                            className='bg-red-600/80 p-2 rounded-xl w-[300px] text-white text-lg 
                            cursor-pointer hover:bg-red-600'
                            onClick={UploadVideoHandler}
                        >
                            {uploadTime==="Now"?"Bài đăng":"Lên lịch"}
                        </button>
                        <button 
                            className='bg-gray-300 p-2 px-3 rounded-xl  text-lg
                            cursor-pointer hover:bg-gray-400/60'
                            onClick={handleCancel}
                        >
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Upload