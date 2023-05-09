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
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const { Header,  Content } = Layout;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
     <Link href="/home/profile">
        My Profile
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link href="/home/profile">
        Event Participation
      </Link>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'Disconnect',
  },
];

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
           <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()} className='text-white'>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
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
