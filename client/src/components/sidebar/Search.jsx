import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { BiSolidHot } from 'react-icons/bi';
import { AiOutlineRise } from 'react-icons/ai';
import { GoDotFill, GoClockFill } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';

const recentSearches = [
  "Trần Hà Linh",
  "trend",
  "Ảnh Avata Việt Nam Gây Sốt",
  "em có nhớ anh không drill",
  "Tháp Rơi Tự Do Drill",
  "mèo cute",
  "video chế hài hước",
  "review quán ăn ngon",
  "truyện tranh hot",
  "trending TikTok 2024",
  "filter đẹp TikTok",
  "trend nhạc hot",
  "ảnh nền điện thoại",
  "idol Hàn Quốc",
  "hướng dẫn makeup nhẹ",
  "mẹo học nhanh",
  "clip phỏng vấn thú vị",
  "giọng hát hay",
  "sự kiện hot tuần này",
  "người nổi tiếng cover"
];

const suggestedSearches = [
  { title: "nhảy trend TikTok", status: "trending" },
  { title: "Ảnh Avata Việt Nam Gây Sốt", status: "trending" },
  { title: "Tháp Rơi Tự Do Drill", status: "trending" },
  { title: "trend biến hình", status: "trending" },
  { title: "Trend Nhảy Yêu Quá Nên Mù Luôn", status: "trending" },
  { title: "vẽ cute đơn giản", status: "rising" },
  { title: "review sách hay", status: "rising" },
  { title: "trend quay đồ đôi", status: "rising" },
  { title: "thử thách vui nhộn", status: "rising" },
  { title: "nhạc chill học bài", status: "normal" },
  { title: "trend slow motion", status: "rising" },
  { title: "reaction phim kinh dị", status: "normal" },
  { title: "makeup cosplay anime", status: "rising" },
  { title: "du lịch Phú Quốc", status: "normal" },
  { title: "life hack TikTok", status: "normal" },
  { title: "setup góc học tập", status: "normal" },
  { title: "chụp ảnh sống ảo", status: "rising" },
  { title: "story tình bạn", status: "normal" },
  { title: "caption thả thính dễ thương", status: "normal" },
  { title: "trend cover giọng nam", status: "rising" }
];

const Search = ({ option, setOption }) => {
  const [showMore, setShowMore] = useState(false);

  const renderStatusIcon = (status) => {
    if (status === 'trending') return <BiSolidHot className='text-pink-500' />;
    if (status === 'rising') return <AiOutlineRise className='text-orange-500' />;
    return <GoClockFill className='text-gray-400 dark:text-gray-500' />;
  };

  return (
    <div className='w-[400px] bg-white dark:bg-neutral-900 dark:text-gray-200  rounded-xl shadow-xl  h-screen flex flex-col'>
      <div className="flex justify-between items-center px-6 mb-4 ">
        <p className="text-xl font-bold">Tìm kiếm</p>
        <button onClick={() => setOption('')} className="text-neutral-300 dark:text-neutral-500">
          <MdCancel size={24} />
        </button>
      </div>

      <div className=" pb-6  h-full  flex flex-col">
        <input
          autoFocus
          type="text"
          placeholder='Tìm kiếm'
          className='outline-none text-slate-950 dark:text-white px-4 focus:border-primary border-slate-300 dark:border-neutral-700 dark:bg-neutral-800 p-3 border rounded-full w-[calc(100%-40px)] mx-auto mb-4'
        />

       <div className='grow overflow-y-scroll hidden-scroll-bar pb-10 px-5 '>
       <div className="mb-6">
          <p className='font-semibold mb-2 text-slate-600 dark:text-gray-300'>Tìm kiếm gần đây</p>
          <ul>
            {(showMore ? recentSearches : recentSearches.slice(0, 5)).map((item, index) => (
              <li key={index} className='flex items-center justify-between py-1 text-md text-slate-700 dark:text-gray-200 hover:underline cursor-pointer'>
                <div className='flex items-center gap-4'>
                  <GoClockFill className='text-gray-400 dark:text-gray-500' />
                  <span>{item}</span>
                </div>
                <IoClose className='text-slate-400 dark:text-gray-500' />
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowMore(!showMore)}
            className='text-blue-500 dark:text-blue-400 text-md mt-1 hover:underline dark:hover:text-primary'>
            {showMore ? 'Ẩn bớt' : 'Xem thêm'}
          </button>
        </div>

        <div className="">
          <p className='font-semibold mb-2 text-slate-600 dark:text-gray-300'>Bạn có thể thích</p>
          <ul className='space-y-2 pb-10'>
            {suggestedSearches.slice(0,8).map((item, index) => (
              <li key={index} className='flex items-center gap-4 text-md text-slate-800 dark:text-gray-200 hover:underline cursor-pointer dark:hover:text-primary'>
                {renderStatusIcon(item.status)}
                {item.title}
              </li>
            ))}
          </ul>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Search;
