import React, { useRef, useState } from 'react';

const ThumbnailUploader = ({ changeThumbnail }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const inputThumbnailRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnail(reader.result);
        changeThumbnail(file);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
        <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className='hidden'
            ref={inputThumbnailRef}
        />
        <div>
            {!thumbnail && (
                <div 
                    className='relative flex justify-center cursor-pointer'
                    onClick={()=>{inputThumbnailRef.current.click()}}
                >
                    <img src={thumbnail} className='border border-gray-500 dark:border-gray-600 rounded-2xl object-contain w-[180px] h-[270px]'/>
                    <p className='absolute bottom-5 w-[80%] bg-gray-500 dark:bg-gray-700 text-center p-1 rounded-lg text-white text-lg'>Chọn ảnh bìa</p>
                </div>
            )}
            {thumbnail && (
                <div 
                  className='relative flex justify-center cursor-pointer'
                  onClick={()=>{inputThumbnailRef.current.click()}}
                >
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className='border border-gray-500 dark:border-gray-600 rounded-2xl object-contain w-[180px] h-[270px]'
                  />
                  <p className='absolute bottom-5 w-[80%] bg-gray-500 dark:bg-gray-700 text-center p-1 rounded-lg text-white text-lg'>Sửa ảnh bìa</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default ThumbnailUploader;