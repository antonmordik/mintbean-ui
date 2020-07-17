import React, { useState, useCallback } from 'react';

import styles from './styles.module.css';
import { Input, Button } from 'antd';
import { signUp } from '../../store/app/actions';
import { useDispatch } from 'react-redux';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail],
  );

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    [setPassword],
  );

  const onConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirm(e.currentTarget.value);
    },
    [setConfirm],
  );

  const onNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.currentTarget.value);
    },
    [setNickname],
  );

  const onBtnSubmit = useCallback(() => {
    if (password === confirm) {
      dispatch(signUp({ email, password, nickname }));
    }
  }, [dispatch, email, password, confirm, nickname]);

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      <Input type="email" placeholder="Email" value={email} onChange={onEmailChange} className={styles.input} />
      <Input.Password
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        className={styles.input}
      />
      <Input.Password
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={onConfirmChange}
        className={styles.input}
      />
      <Input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={onNicknameChange}
        className={styles.input}
        minLength={3}
        maxLength={16}
      />
      <Button type="primary" onClick={onBtnSubmit}>
        Sign up
      </Button>
    </div>
  );
};

export default SignUp;
