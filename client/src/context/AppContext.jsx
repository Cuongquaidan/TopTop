import React, { useContext, useEffect, useState } from 'react'
import usePageCacheManager from '../hooks/usePageCacheManager';
import { useSelector } from 'react-redux';
import createAxiosInstance from '../libs/axios/AxiosInstance';
import { BASE_URL, SUMMARY_API } from '../shared/Route';
import { io, Socket } from "socket.io-client";

const AppContext = React.createContext();

const AppProvider = ({children})=>{
  const [showModal,setShowModal] = useState(false);
  const [typeModal,setTypeModal] = useState("");
  const [option, setOption] = useState("");
  const [currentChats, setCurrentChats] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  
  const currentUserId = useSelector((state) => state?.user?.user?._id || null);
  const [recipientId, setRecipientId] = useState("");
  const [newMessage, setNewMessage] = useState({
    sender: currentUserId,
    receiver: recipientId,
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [socket,setSocket] = useState(null);
  console.log(currentUserId)

  const getAllChatOfUser =  async ()=>{
    const AxiosInstance = createAxiosInstance(BASE_URL);
    const resjson = await AxiosInstance.get(SUMMARY_API.messages.get.all.replace(":userId",currentUserId));
    if(resjson.success){
      setCurrentChats(resjson.data);
    }
  }

  const getChat = async ()=>{
    const AxiosInstance = createAxiosInstance(BASE_URL);
    const resjson = await AxiosInstance.get(SUMMARY_API.messages.get.chat.replace(":userId",currentUserId).replace(":otherUserId",recipientId));
    if(resjson.success){
      setCurrentChat(resjson.data);
    }
  }
  useEffect(()=>{
    if(!currentUserId) return;
    getAllChatOfUser();
    const socket = io(BASE_URL)
    setSocket(socket);
    socket.emit("join", currentUserId);
    socket.on("getMessage", (data)=>{
      setCurrentChat((prev) => [...prev, data]);
      // setCurrentChats((prev) => {
      //   const index = prev.findIndex(chat => chat._id === data._id);
      //   if(index !== -1){
      //     prev[index] = data;
      //   }else{
      //     prev.push(data);
      //   }
      //   return prev;
      // })
    })
    return () => {
      socket.disconnect();
    }
  },[currentUserId])

  useEffect(()=>{
    if(!recipientId) return;
    if(!socket) return;
    if(!currentUserId) return;
    setNewMessage({
      ...newMessage,
      sender: currentUserId,
      receiver: recipientId,
    })
    getChat();

  },[recipientId, currentUserId])


  
  return (
    <AppContext.Provider value={{showModal,setShowModal, typeModal,setTypeModal, option, setOption, currentChats, setCurrentChats, currentChat, setCurrentChat, recipientId, setRecipientId, newMessage, setNewMessage, socket}}>
      
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = ()=>{
  return useContext(AppContext)
}

export {AppProvider, useGlobalContext}