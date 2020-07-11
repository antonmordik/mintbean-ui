import React from 'react';
import { Layout as AntdLayout } from 'antd';
import styles from './styles.module.css';

const { Header, Footer, Content } = AntdLayout;

const Layout: React.FC = ({ children }) => {

  return (
    <AntdLayout className={styles.layout}>
      <Header className={styles.header}>Bermuda</Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        Author: 
        <a
          href={'https://github.com/modriX'}
          rel="noopener noreferrer"
          target="_blank"
        >
          github.com/modriX
        </a>
        </Footer>
    </AntdLayout>
  )
}

export default Layout;