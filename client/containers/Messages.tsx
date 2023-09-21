import { useEffect, useRef, useState } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";
import styles from "../styles/Messages.module.css";

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<HTMLTextAreaElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");

  function handleSendMessage() {
   const message = inputMessage.trim(); 

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages((prevMessages:any) => [
      ...(prevMessages || []),
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    setInputMessage("");
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, messages]);

  if (!roomId) {
    return <div />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages?.map(({ message, username, time }, index) => {
          return (
            <div key={index} className={styles.message}>
              <div key={index} className={styles.messageInner}>
                <span className={styles.messageSender}>
                  {username} - {time}
                </span>
                <span className={styles.messageBody}>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.messageBox}>
        <textarea
          rows={1}
          placeholder="Tell us what you are thinking"
          ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default MessagesContainer;