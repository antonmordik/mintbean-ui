import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import User from '../../interfaces/User';

import styles from './styles.module.css';
import { Input, Button } from 'antd';
import { generateMessage } from '../../helpers/constructor';
import { Message } from '../../helpers/Message';
import ChatMessage from '../../interfaces/ChatMessage';

interface ChatListProps {
  contacts: User[];
  ws: WebSocket;
  messages: { [id: string]: ChatMessage[] }
}

const ChatList: React.FC<ChatListProps> = ({ contacts, ws, messages }) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const activeUser = useMemo(() => activeChat ? contacts.find((contact) => contact.id === activeChat) : null, [activeChat, contacts]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');

  const visibleMessages = useMemo(() => {
    return activeChat ? messages[activeChat] || [] : []
  }, [activeChat, messages]);

  const onUserClick = useCallback((id: string) => {
    setActiveChat(id);
    ws.send(generateMessage(Message.GetHistory, {
      to: id
    }));
  }, [setActiveChat, ws]);

  const onMessageChange = useCallback((e) => {
    setMessage(e.currentTarget.value);
  }, []);

  const onMessageSendClick = useCallback(() => {
    ws.send(generateMessage(Message.SendMessage, {
      message,
      to: activeUser?.id
    }));
    setMessage('');
  }, [message, ws, activeUser]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: 100000 });
    }
  }, [chatRef, messages])

  return (
    <div className={styles.block}>
      <div className={styles.userlist}>
        {
          contacts.map((contact) => {
            return (
              <div key={contact.nickname} className={styles.user} onClick={() => onUserClick(contact.id)}>
                {contact.nickname}
              </div>
            )
          })
        }
      </div>
      {
        activeChat && activeUser && (
          <div className={styles.window}>
            <div className={styles.title}>
              { `@${activeUser.nickname}` }
            </div>
            <div className={styles.chat} ref={chatRef}>
              <div>
                {
                  visibleMessages.map((msg, index) => (
                    <div className={styles.messageWrapper} key={index + msg.content}>
                      <div className={msg.from !== activeChat ? styles.self : styles.opponent}>
                       {msg.content}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className={styles.input}>
              <Input value={message} onChange={onMessageChange}/>
              <Button type={'primary'} onClick={onMessageSendClick}>Send</Button>
            </div>
          </div>
        )
      }
      
    </div>
  )
}

export default ChatList;