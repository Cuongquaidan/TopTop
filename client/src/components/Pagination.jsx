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
    <ul className='flex gap-2'>
        <li className=''>
            <button onClick={()=>{
              if(currentPage>1){
                onPageChange(currentPage-1)
              }
            }}
            disabled={currentPage===1}
             className="flex font-semibold  cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-blue-800 border border-e-0 border-gray-300 rounded-s-lg hover:bg-blue-600 min-w-[120px]">Previous</button>
        </li>
        {
          getPaginationRange(currentPage, total).map((page, index) => (
            <li key={index} className=''>
                <button onClick={() => onPageChange(page)} className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight ${page === currentPage ? 'text-white bg-blue-600' : 'text-gray-500 bg-white'} border border-gray-300 hover:opacity-65  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} disabled={page === "..." || page === currentPage}>
                    {page}
                </button>
            </li>
          ))
        }
        <li className=''>
            <button
              onClick={()=>{
                if(currentPage<total){
                  onPageChange(currentPage+1)
                }
              }}
              disabled={currentPage===total}
              className="flex font-semibold  cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-blue-800 border border-e-0 border-gray-300 rounded-e-lg min-w-[120px] hover:bg-blue-600">Next</button>
         </li>
         <select name="page-size" id="page-size" className="outline-none border border-gray-300 rounded-md px-2 py-1 ml-4 text-gray-500 bg-white h-8" value={pageSize} onChange={(e) => {
          onPageSizeChange(e.target.value)
          onPageChange(1)
         }}>
            {pageSizes.map((size) => (
              <option  key={size} value={size}>{size}</option>
            ))}
         </select>
    </ul>
  )
}

export default Pagination