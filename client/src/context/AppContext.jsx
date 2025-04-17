import React, { useContext, useState } from 'react'


const AppContext = React.createContext();

const AppProvider = ({children})=>{
  const [showModal,setShowModal] = useState(false);
  const [typeModal,setTypeModal] = useState("");
  return (
    <AppContext.Provider value={{showModal,setShowModal, typeModal,setTypeModal}}>
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = ()=>{
  return useContext(AppContext)
}

export {AppProvider, useGlobalContext}