import React, { useContext, useEffect, useRef, useState } from 'react'
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
  const recipientIdRef = useRef(recipientId);

  useEffect(() => {
    recipientIdRef.current = recipientId; // cập nhật giá trị mới nhất mỗi khi recipientId thay đổi
  }, [recipientId]);
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
      if(recipientIdRef.current === data.sender._id){
      setCurrentChat((prev) => [...prev, data]);
      socket.emit("readMessage", {
        senderId: data.sender._id,
        receiverId: data.receiver._id,
      })
      setCurrentChats((prev) => {
        const indexN = prev.findIndex(
          (chat) => chat.user._id === data.sender._id
        );
        if (indexN !== -1) {
          const updated = [...prev];
          updated[indexN] = {
            ...updated[indexN],
            message: {
            ...updated[indexN].message,
            content: data.content,
            createdAt: data.createdAt,
          },
            numOfUnread: 0,
          };
          return updated;
        }})

      }else{
        setCurrentChats((prev) => {
          const indexN = prev.findIndex(
            (chat) => chat.user._id === data.sender._id
          );
          if (indexN !== -1) {
            const updated = [...prev];
            updated[indexN] = {
              ...updated[indexN],
              message: {
              ...updated[indexN].message,
              content: data.content,
              createdAt: data.createdAt,
            },
              numOfUnread: updated[indexN].numOfUnread + 1,
            };
            return updated;
          }})

      }
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
    socket.emit("readMessage",{
      senderId: recipientId,
      receiverId: currentUserId,
    })
    setCurrentChats((prev) => {
      const indexN = prev.findIndex(
        (chat) => chat.user._id === recipientId
      );
      if (indexN !== -1) {
        const updated = [...prev];
        updated[indexN] = {
          ...updated[indexN],
          numOfUnread: 0,
        };
        return updated;
      }
      return prev;
    })
      

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