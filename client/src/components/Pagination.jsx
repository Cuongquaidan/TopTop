import React from 'react'

function Pagination({
  total,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizes = [5, 10, 20]
}) {
  function getPaginationRange(current, total, delta = 1) {
    const range = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);
  
    range.push(1);
  
    if (left > 2) range.push("...");
  
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
  
    if (right < total - 1) range.push("...");
  
    if (total > 1) range.push(total);
  
    return range;
  }
  return (
    <ul className='flex'>
        <li className=''>
            <button  className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        {
          getPaginationRange(currentPage, total).map((page, index) => (
            <li key={index} className=''>
                <button onClick={() => onPageChange(page)} className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight ${page === currentPage ? 'text-white bg-blue-600' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                    {page}
                </button>
            </li>
          ))
        }
        <li className=''>
            <button  className="flex items-center justify-center cursor-pointer px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
         </li>
    </ul>
  )
}

export default Pagination