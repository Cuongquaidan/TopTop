import React from 'react'
import { MdDriveFolderUpload } from "react-icons/md";
import createAxiosInstance from '../../libs/axios/AxiosInstance';
import { BASE_URL } from '../../shared/Route';
import { toast } from 'react-toastify';
function ButtonImport({endpoint, fetchData}) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // key phải là 'file'

    try {
      const resjson = await createAxiosInstance(BASE_URL).post(endpoint, formData)
      console.log(resjson);
      fetchData();
      if(resjson.success) {
        toast.success(resjson.message || "Import thành công!");
      }
      else {
        console.error(resjson.message || "Import thất bại!");
      }

      

      
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <label 

      htmlFor="file-upload"
     className=" flex border border-slate-400 p-2 bg-green-500 text-slate-200 rounded-lg mb-5">
      <input
        id="file-upload"
        type="file"
        accept=".json,.svg"
        onChange={handleFileChange}
        multiple={false} 
        className='hidden'
      />
      <MdDriveFolderUpload className='text-2xl '/>
    </label>
  )
}

export default ButtonImport