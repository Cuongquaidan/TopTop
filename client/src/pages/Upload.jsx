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
import extractTags from '../helper/extractTags';
import { IoReload } from "react-icons/io5";
import createAxiosInstance from '../libs/axios/AxiosInstance';
import { BASE_URL, SUMMARY_API } from '../shared/Route';
import { toast } from 'react-toastify';
import ThumbnailUploader from '../components/upload/ThumbnailUploader';
import ImageUploader from '../components/upload/ImageUploader';
import { useSelector } from 'react-redux';

const defaultThumbnail='https://res.cloudinary.com/dv4tzxwwo/image/upload/v1744965792/toptop/thumbnails/a865wlmqqnxdj4y4qffc.png'
const Upload=()=>{
    const userID=useSelector((state)=>state.user.user._id)
    const inputImagesRef=useRef()
    const inputVideoRef=useRef()
    const inputTimeUploadRef=useRef()
    const [video,setVideo]=useState(null)
    const [images,setImages]=useState(null)
    const [thumbnail,setThumbnail]=useState(null)
    const [description,setDescription]=useState('')
    const [location,setLocation]=useState('')
    const [uploadTime,setUploadTime]=useState("Now")
    const [publicState,setPublicState]=useState("Mọi người")
    const [descriptionLength,setDescriptionLength]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const handleChooseVideo=(e)=>{
        const video=e.target.files[0]
        setVideo(video)
        setDescription(video.name)
        setDescriptionLength(video.name.length)
        inputVideoRef.current.value=''
    }

    const handleChangeVideo=()=>{
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
        setImages(null)
        setThumbnail(null)
        setDescription('')
        setLocation('')
        setUploadTime("Now")
        setPublicState("Mọi người")
        setDescriptionLength(0)
    }

    const chooseImagesHandler=(e)=>{
        const files=Array.from(e.target.files)
        if(files.length>10){
            alert("Tối đa 10 ảnh")
            return
        }
        setImages(files)       
        setDescription(files[0].name)
        setDescriptionLength(files[0].name.length)
        inputImagesRef.current.value=''
    }

    const handleChangeImages=()=>{
        setImages(null)
        setDescription('')
        setLocation('')
        setUploadTime("Now")
        setPublicState("Mọi người")
        setDescriptionLength(0)
        inputImagesRef.current.click()
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
            toast.error("Chưa chọn video!")
            return
        }

        try {
            const axiosInstance=createAxiosInstance(BASE_URL)
            setIsLoading(true)
            const formData=new FormData()

            formData.append('video',video)
            if (thumbnail) {
                formData.append('thumbnail',thumbnail)
            }
            else{
                formData.append('thumbnail',defaultThumbnail)
            }
            formData.append('caption',description)
            formData.append('location',location)
            formData.append('publicity',publicState)
            formData.append('user',userID)
            let tags=extractTags(description)
            formData.append('tags',JSON.stringify(tags||[]))

            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
              }
            
            await axiosInstance.post(SUMMARY_API.post.upload.video, formData)
            toast.success("Đăng video thành công")

            setVideo(null);
            setThumbnail(null);
            setDescription('');
            setLocation('');
            setUploadTime("Now");
            setPublicState("Mọi người");
            setDescriptionLength(0);
            setIsLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.message || "Đăng video thất bại")
            setIsLoading(false)
        }
    }

    const UploadImageHandler=async()=>{
        if(!images){
            toast.error("Chưa chọn ảnh!")
            return
        }

        try {
            const axiosInstance=createAxiosInstance(BASE_URL)
            setIsLoading(true)
            const formData=new FormData()

            images.map(item=>formData.append('image',item))
            formData.append('caption',description)
            formData.append('location',location)
            formData.append('publicity',publicState)
            formData.append('user',userID)
            let tags=extractTags(description)
            formData.append('tags',JSON.stringify(tags||[]))

            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            await axiosInstance.post(SUMMARY_API.post.upload.image, formData)
            toast.success("Đăng ImagePost thành công")

            setImages(null);
            setThumbnail(null);
            setDescription('');
            setLocation('');
            setUploadTime("Now");
            setPublicState("Mọi người");
            setDescriptionLength(0);
            setIsLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.message || "Đăng ImagePost thất bại")
            setIsLoading(false)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            setVideo(file);
            setDescription(file.name);
            setDescriptionLength(file.name.length);
        } else {
            alert("Vui lòng thả video hợp lệ");
        }
    };

    return(
        <div className="w-full h-full bg-gray-100 p-8 flex flex-col justify-start items-center min-w-[900px]">
            <input type='file' className='hidden' 
                accept='video/*'
                ref={inputVideoRef}
                onChange={handleChooseVideo}
            />
            <input type='file' className='hidden'
                accept='image/*'
                ref={inputImagesRef}
                onChange={chooseImagesHandler}
                multiple
            />
            {!video&&!images&&
            (
                <div className="w-full p-8 rounded-2xl bg-white flex flex-col border-gray-300 border">
                    <div 
                        className="flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-2xl border border-gray-300 border-dashed h-[600px] cursor-pointer
                        hover:border-blue-600"
                        onClick={()=>{inputVideoRef.current.click()}}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <img src={upload} className='w-[100px]'/>
                        <p className='font-bold text-2xl'>Chọn video để tải lên</p>
                        <p className='text-xl text-gray-500'>Hoặc kéo và thả vào đây</p>
                        <button 
                            className='flex items-center justify-center p-3 w-[300px] rounded-2xl bg-primary cursor-pointer text-white text-xl mt-4
                            hover:bg-primary/80'
                        >
                            Chọn video
                        </button>
                    </div>
                    <div className='grid grid-cols-4 gap-4 mt-6'>
                        <div className='flex justify-center items-start gap-2'>
                            <BsCameraReelsFill size={30} className=''/>
                            <div>
                                <p className='font-bold text-lg'>Dung lượng và thời lượng</p>
                                <p className='text-gray-500 text-md'>Dung lượng tối đa: 30 GB, thời lượng video: 60 phút.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <FaFolderMinus size={30} className=''/>
                            <div>
                                <p className='font-bold text-lg'>Định dạng tập tin</p>
                                <p className='text-gray-500 text-lg'>Đề xuất: “.mp4”. Có hỗ trợ các định dạng chính khác.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <MdHd size={30} className=''/>
                            <div>
                                <p className='font-bold text-lg'>Độ phân giải video</p>
                                <p className='text-gray-500 text-md'>Độ phân giải cao khuyến nghị: 1080p, 1440p, 4K.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <FaLightbulb  size={30} className=''/>
                            <div>
                                <p className='font-bold text-lg'>Tỷ lệ khung hình</p>
                                <p className='text-gray-500 text-md'>Đề xuất: 16:9 cho chế độ ngang, 9:16 cho chế độ dọc.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!video&&!images&&(
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
                        className=' px-4 flex justify-center items-center  bg-gray-300 rounded-xl cursor-pointer
                        hover:bg-gray-400/60'
                            
                    >
                        <img src={defaultThumbnail} className='object-contain w-16 h-16 mix-blend-multiply'/>
                        <p className='text-lg'>Thử ngay</p>
                    </button>
                </div>
            )}
            {!video&&!images&&(
                <div className="mt-6 w-full p-8 rounded-2xl bg-white flex flex-col border-gray-300 border">
                    <div 
                        className="flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-2xl border border-gray-300 border-dashed h-[300px] cursor-pointer
                        hover:border-blue-600"
                        onClick={()=>{inputImagesRef.current.click()}}
                    >
                        <p className='font-bold text-2xl'>Hoặc chọn ảnh để tải lên</p>
                        <button 
                            className='flex items-center justify-center p-3 w-[300px] rounded-2xl bg-primary cursor-pointer text-white text-xl mt-4
                            hover:bg-primary/80'
                        >
                            Chọn ảnh
                        </button>
                    </div>
                    <div className='grid grid-cols-4 gap-4 mt-6'>
                        <div className='flex justify-center items-start gap-2'>
                            <BsCameraReelsFill size={30} className=''/>
                            <div>
                                <p className='font-bold text-lg'>Dung lượng và số lượng ảnh</p>
                                <p className='text-gray-500 text-md'>Dung lượng tối đa: 500MB, số lượng ảnh tối đa: 10 ảnh.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <FaFolderMinus size={30} className=''/>
                            <div>
                                <p className='font-bold text-lg'>Định dạng tập tin</p>
                                <p className='text-gray-500 text-lg'>Đề xuất: “.png, .img, .jpeg”. Có hỗ trợ các định dạng chính khác.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <MdHd size={30} className=''/>
                            <div>
                                <p className='font-bold text-lg'>Độ phân giải ảnh</p>
                                <p className='text-gray-500 text-md'>Độ phân giải cao khuyến nghị: 1080p, 1440p, 4K.</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-start gap-2'>
                            <FaLightbulb  size={30} className=''/>
                            <div>
                                <p className='font-bold text-lg'>Tỷ lệ khung hình</p>
                                <p className='text-gray-500 text-md'>Đề xuất: 16:9 cho chế độ ngang, 9:16 cho chế độ dọc.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {(video||images)&&(
                <div className='flex flex-col h-full w-full gap-6'>
                    {video&&(
                        <div className='bg-white rounded-xl border border-gray-300 p-4 py-6 flex justify-between items-center'>
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
                    )}
                    {images&&
                    (
                        <div className='bg-white rounded-xl border border-gray-300 p-4  flex justify-between items-center'>
                            <div className='flex flex-col'>
                                <div className='flex gap-4 items-center'>
                                    <ImageUploader imageLimit={10} data={images}/>
                                </div>
                                <div className='flex items-center gap-2 text-green-600'>
                                    <FaCircleCheck/>
                                </div>
                            </div>
                            <button 
                                className='bg-gray-300 p-3 rounded-xl flex items-center gap-2
                                hover:bg-gray-400/60'
                                onClick={handleChangeImages}    
                            >
                                <RiExchangeLine size={30}/>
                                <p>Thay thế</p>
                            </button>
                        </div>
                    )}
                    <p className='font-bold text-xl mt-4'>Chi tiết</p>
                    <div className='flex flex-col p-4 items-start justify-start gap-4 rounded-2xl border-gray-300 border bg-white'>
                        <p className='font-bold text-xl mt-2'>Mô tả</p>
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
                        {video&&(
                            <p className='font-bold text-xl mt-4'>Ảnh bìa</p>
                        )}
                        {video&&(
                            <ThumbnailUploader video={video} changeThumbnail={setThumbnail}/>
                        )}
                        <p className='font-bold text-xl mt-4'>Vị trí</p>
                        <div className='flex justify-center items-center relative'>
                            <input 
                                list="locations" 
                                className='bg-gray-300 p-2 ps-15 w-[350px] rounded-xl relative'
                                placeholder="Tìm kiếm vị trí"
                                onChange={(e)=>setLocation(e.target.value)}
                            />
                            <FaSearchLocation size={20} className='text-gray-500 absolute left-4'/>
                            <datalist id="locations">
                                <option value="HCM" />
                                <option value="HN" />
                                <option value="Phố đi bộ" />
                            </datalist>
                        </div>
                    </div>
                    <p className='font-bold text-xl mt-4'>Cài đặt</p>
                    <div className='flex flex-col p-4 items-start justify-start gap-4 rounded-2xl border-gray-300 border bg-white'>
                        <p className='font-bold text-xl mt-2'>Thời điểm đăng</p>
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
                        <p className='font-bold text-xl mt-2'>Ai có thể xem {video?"video":"ảnh"} này</p>
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
                    <p className='font-bold text-xl mt-4'>Kiểm tra</p>
                    <div className='flex gap-2'>
                        {
                            !isLoading&&
                            (
                                <button 
                                className='bg-red-600/80 p-2 rounded-xl w-[300px] text-white text-lg 
                                cursor-pointer hover:bg-red-600'
                                onClick={video?UploadVideoHandler:UploadImageHandler}>
                                    {uploadTime==="Now"?"Bài đăng":"Lên lịch"}
                                </button>
                            )
                        }
                        {
                            isLoading&&
                            (
                                <button 
                                className='bg-red-600/80 p-2 rounded-xl w-[300px] text-white text-lg flex items-center justify-center
                                cursor-not-allowed'
                                >
                                    <IoReload className='animate-spin text-xl'/>
                                </button>
                            )
                        }
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