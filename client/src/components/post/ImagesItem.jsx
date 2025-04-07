import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
function ImagesItem({ media, ...props }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ratio = 9 / 16;
    const height = window.innerHeight;
    const width = height * ratio;
    const length = media.length;
    const handleSelectImage = (index) => {
        setCurrentIndex(index);
    };
    const handleNextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % length);
    };
    const handlePrevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + length) % length);
    };
    return (
        <div
            {...props}
            className="relative z-10 overflow-hidden rounded-lg shadow-lg"
            style={{ width: width, height: height - 20 }}
        >
            <div
                className="flex h-full transition-transform duration-500"
                style={{
                    transform: `translateX(-${currentIndex * width}px)`,
                    width: `${media?.length * width}px`,
                }}
            >
                {media.map((item, index) => (
                    <img
                        key={index}
                        src={item}
                        alt="image"
                        style={{ width: width }}
                        className="object-cover h-full"
                    />
                ))}
            </div>
            <div
                onClick={handlePrevImage}
                className="absolute flex items-center justify-center transform -translate-y-1/2 rounded-full cursor-pointer top-1/2 left-2 bg-neutral-200/50 w-14 text-neutral-900 h-14 "
            >
                <FaChevronLeft size={24} />
            </div>
            <div
                onClick={handleNextImage}
                className="absolute flex items-center justify-center transform -translate-y-1/2 rounded-full cursor-pointer top-1/2 right-2 bg-neutral-200/50 w-14 text-neutral-900 h-14"
            >
                <FaChevronRight size={24} />
            </div>
            <div className="absolute bottom-[15vh]  left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2">
                {Array.from({ length: length }, (_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full cursor-pointer ${
                            index === currentIndex ? "bg-white" : "bg-gray-400"
                        }`}
                        onClick={() => handleSelectImage(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default ImagesItem;
