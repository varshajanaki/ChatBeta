import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (!selectedConversation) return;

      if (selectedConversation._id === newMessage.senderId) {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);

        const sound = new Audio(notificationSound);
        sound.play();
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, messages, selectedConversation, setMessages]);
};

export default useListenMessages;
