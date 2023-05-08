'use client';
import { Layout, Menu } from 'antd';
import React, { use, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header,  Content } = Layout;

export default function Home() {
  const url = usePathname();
  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <Layout className="h-screen">
      
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
