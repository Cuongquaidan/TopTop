import React, { useContext, useState } from 'react'
import usePageCacheManager from '../hooks/usePageCacheManager';


const AppContext = React.createContext();

const AppProvider = ({children})=>{
  const [showModal,setShowModal] = useState(false);
  const [typeModal,setTypeModal] = useState("");
  const [option, setOption] = useState("");
  
  return (
    <AppContext.Provider value={{showModal,setShowModal, typeModal,setTypeModal, option, setOption}}>
      
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = ()=>{
  return useContext(AppContext)
}

export {AppProvider, useGlobalContext}