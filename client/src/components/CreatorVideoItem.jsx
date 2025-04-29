import { useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'
const CreatorVideoItem=({item})=>{
    const navigate=useNavigate()
    const data = item;
        const { media, numOfLikes } = data;
        const [isHover, setIsHover] = useState(false);
        return (
            <div
                style={{
                    userSelect: "none",
                }}
                className="border-2 border-gray-200 w-[30%] h-[200px] rounded-2xl relative flex flex-col justify-center items-center cursor-pointer"
                onMouseEnter={() => {
                    setIsHover(true);
                }}
                onMouseLeave={() => {
                    setIsHover(false);
                }}
                onClick={()=>{navigate(`/posts/${item._id}`)}}
            >   
                {item.type==="image"&&(
                    <img
                        className="object-cover w-full h-[200px] rounded-2xl"
                        draggable={false}
                        src={media[0]}
                    />
                )}
                {item.type==='video'&&isHover?(
                    <video
                        src={media.url}
                        muted={true}
                        playsInline
                        controls={false}
                        className="object-cover w-full h-full rounded-2xl"
                        loop={true}
                        autoPlay={true}
                        onClick={(e) => {}}
                    />
                ):item.type==="video"&&(
                    <img
                        className="object-cover w-full h-full rounded-2xl"
                        draggable={false}
                        src={media.thumbnail}
                    />
                )}
                <div className="absolute bottom-[10px] left-[10px] flex gap-2 items-center">
                    <IoPlayOutline  className="text-2xl text-white"/>
                    <p className="text-2xl font-bold text-white">{item.numOfViews}</p>
                </div>
            </div>
        );
}

export default CreatorVideoItem