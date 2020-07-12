import React, { useMemo, useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';

import styles from './style.module.css';
import { Button, Badge } from 'antd';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../../store';

const Lobby: React.FC = () => {
  const [, token] = useSelector((state: IGlobalState) => [state.app.user, state.app.token]);
  const [connection, setConnection] = useState(false);
  const ws = useMemo(() => new WebSocket(process.env.REACT_APP_WS_URL as string), []);

  useEffect(() => {
    ws.onopen = () => {
      console.log('Socket connected');
      setConnection(true);
    };

    ws.onmessage = (e) => {
      console.log(e.data);
    }

    ws.onerror = () => {
      setConnection(false);
    }

    ws.onclose = () => {
      setConnection(false);
    }
  });

  const onFindClick = useCallback(() => {
    ws.send('CONNECT|' + token + '|test');
  }, [ws, token]);

  return (
    <Layout>
      <div className={styles.title}>
        <h1>
          Game Lobby
        </h1>
      </div>
      <div className={styles.container}>
        <div className={styles.menu}>
          <Button type="primary" onClick={onFindClick}>Find game</Button>
          <Button disabled>Show statistics</Button>
          <Button className={styles.logout}>Logout</Button>
        </div>
        <div className={styles.stats}>
          <p className={styles.label}>Server status:</p>
          <Badge status={connection ? 'success' : 'error'} text={connection ? 'Connected' : 'Disconected'} />
        </div>
      </div>
    </Layout>
  );
}

export default Lobby;