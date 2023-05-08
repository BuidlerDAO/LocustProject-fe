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

const { Header, Sider, Content } = Layout;

export default function Home() {
  const url = usePathname();
  useEffect(() => {
    console.log(url);
  }, [url]);

  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e) => {
    const link = e.key;
    console.log(link);
  };

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="m-4 h-8" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onSelect={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link href="/home/explore">Explore</Link>
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: <Link href="/home/nav2">nav 2</Link>
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <Link href="/home/nav3">nav 3</Link>
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className:
                'text-lg leading-[64px] cursor-pointer transition-[color] duration-[0.3s] px-6 py-0 hover:text-[#1890ff]',
              onClick: () => setCollapsed(!collapsed)
            }
          )}
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
