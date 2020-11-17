import React, { useMemo, useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';

import styles from './style.module.css';
import { Button, Badge, Modal, Input, notification } from 'antd';
import { parseMessage } from '../../helpers/parser';
import { generateMessage } from '../../helpers/constructor';
import { Message } from '../../helpers/Message';
import ChatList from '../../components/ChatList';
import User from '../../interfaces/User';
import ChatMessage from '../../interfaces/ChatMessage';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../../store';

const Lobby: React.FC = () => {
  const [user, token] = useSelector((state: IGlobalState) => [state.app.user, state.app.token]);
  const [connection, setConnection] = useState(false);
  const ws = useMemo(() => new WebSocket(process.env.REACT_APP_WS_URL as string), []);
  const [isNewChatVisible, setNewChatVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [contacts, setContacts] = useState<User[]>([]);

  const [messages, setMessages] = useState<{ [id: string]: ChatMessage[] }>({});

  useEffect(() => {
    ws.onopen = () => {
      setConnection(true);
      ws.send(generateMessage(Message.Connect, {}));
    };

    ws.onmessage = (e) => {
      const [message, payload] = parseMessage<{ [key: string]: unknown }>(e.data);
      console.warn(message, payload);

      switch(message) {
        case Message.Error: {
          notification.warn({
            message: 'Server error',
            description: payload?.message as string
          })
          break;
        }
        case Message.Connect:
        case Message.Connected:
        case Message.ContactsSend: {
          if (payload && payload.contacts) {
            setContacts(payload.contacts as User[])
          }
          break;
        }
        case Message.GetHistory: {
          if (payload && payload.to && payload.messages) {
            setMessages({ ...messages, [payload.to as string]: payload.messages as ChatMessage[] });
          }
          break;
        }
        case Message.ReceiveMessage: {
          if (payload && payload.from && payload.to && payload.content) {
            const dialogKey = payload.to === user?.id ? (payload.from as string) : (payload.to as string);
            setMessages({ 
              ...messages, 
              [dialogKey]: [
                ...messages[dialogKey],
                payload as unknown as ChatMessage
              ] 
            })
          }
        }
      }
    };

    ws.onerror = () => {
      setConnection(false);
    };

    ws.onclose = () => {
      setConnection(false);
    };
  });


  const onNewChatClick = useCallback(() => {
    setNewChatVisible(true);
  }, []);

  const onNicknameChange = useCallback((e) => {
    setNickname(e.currentTarget.value);
  }, [])

  const onNewChatClose = useCallback(() => {
    setNickname('');
    setNewChatVisible(false);
  }, []);

  const onNewChatSubmit = useCallback(() => {
    ws.send(generateMessage(Message.FindOpponent, { nickname }));
    setNickname('');
    setNewChatVisible(false);
  }, [nickname, ws]);

  const onReconnectClick = useCallback(() => {
    window.location.reload(false);
  }, []);

  const onLogoutClick = useCallback(() => {
    // TODO: rework
    ws.close();
  }, [ws]);
  
  return (
    <Layout>
      <div>
        <div className={styles.title}>
          <h1>Extra Chat</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.menu}>
            <Button type="primary" onClick={onNewChatClick}>New chat</Button>
            <Button disabled={connection} onClick={onReconnectClick}>Reconect</Button>
            <Button className={styles.logout} onClick={onLogoutClick}>Logout</Button>
          </div>
          <div className={styles.stats}>
            <p className={styles.label}>Server status:</p>
            <Badge status={connection ? 'success' : 'error'} text={connection ? 'Connected' : 'Disconected'} />
          </div>
          <ChatList contacts={contacts} ws={ws} messages={messages} />
        </div>
      </div>
      <Modal visible={isNewChatVisible} onCancel={onNewChatClose} onOk={onNewChatSubmit}>
        <div>
          <p className={styles.popupTitle}>Enter opponents' nickname here:</p>
          <Input addonBefore={'@'} value={nickname} onChange={onNicknameChange}/>
        </div>
      </Modal>
    </Layout>
  );
};

export default Lobby;
