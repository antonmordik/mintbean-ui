import React, { useState, useCallback } from 'react';

import styles from './styles.module.css';
import { Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/app/actions';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const onBtnSubmit = useCallback(() => {
    dispatch(signIn({ email, password }));
  }, [dispatch, email, password]);

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <Input type="email" placeholder="Email" value={email} onChange={onEmailChange} className={styles.input} />
      <Input.Password
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        className={styles.input}
      />
      <Button type="primary" onClick={onBtnSubmit}>
        Sign in
      </Button>
    </div>
  );
};

export default SignIn;
