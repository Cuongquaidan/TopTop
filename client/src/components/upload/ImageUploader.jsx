import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function ImageUpload({ imageLimit = 5, data }) {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (!data||data.length===0) return;

    if (data.length+selectedImages.length>imageLimit) {
      toast(`Bạn chỉ có thể tải lên tối đa ${imageLimit} ảnh.`);
      return;
    }

    const newImages=[];

    data.forEach((file)=>{
      const reader=new FileReader();
      reader.onloadend=()=>{
        newImages.push(reader.result);
        if (newImages.length===data.length) {
          setSelectedImages(newImages);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [data]);

  return (
    <div>
      <div>
        {selectedImages.map((image, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
            <img
              src={image}
              alt={`Selected ${index}`}
              style={{ height:'300px', width:'180px', objectFit:'contain', border: '1px solid gray'}}
            />
          </div>
        ))}
      </div>
      {selectedImages.length >= imageLimit && (
        <p>Đã chọn tối đa {imageLimit} ảnh</p>
      )}
    </div>
  );
}

export default ImageUpload;