import React from 'react';
import Layout from '../../components/Layout';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

import styles from './styles.module.css';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className={styles.title}>
        <h1>
          Welcome to Bermuda See game!
        </h1>
      </div>
      <div className={styles.container}>
        <SignIn/>
        <div className={styles.devider} />
        <SignUp/>
      </div>
    </Layout>
  )
}

export default Login;