import React, { useState } from 'react';

function ImageUpload({ imageLimit = 5, changeImage }) {
  const [selectedImages, setSelectedImages] = useState([]);
  
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Chuyển files thành mảng
    if (files.length + selectedImages.length > imageLimit) {
      alert(`Bạn chỉ có thể tải lên tối đa ${imageLimit} ảnh.`);
      return;
    }

    const newImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result); // Đọc file và đẩy vào mảng newImages
        if (newImages.length === files.length) {
          // Khi tất cả ảnh đã được đọc xong, cập nhật state
          setSelectedImages((prevImages) => [...prevImages, ...newImages]);
          changeImage([...selectedImages, ...newImages]); // Gọi hàm changeImage với dữ liệu mới
        }
      };
      reader.readAsDataURL(file); // Đọc ảnh dưới dạng URL
    });
  };

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    changeImage(updatedImages); // Cập nhật prop với dữ liệu mới
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      <div>
        {selectedImages.map((image, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
            <img
              src={image}
              alt={`Selected ${index}`}
              style={{ width: '100px', height: 'auto' }}
            />
            <button onClick={() => removeImage(index)}>Xóa</button>
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