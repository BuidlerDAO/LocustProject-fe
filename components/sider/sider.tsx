'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RiseOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import Logo from '../icons/logo';

export default function Sider() {
  const { Sider } = Layout;

  const handleMenuClick = (e: any) => {
    const link = e.key;
    console.log(link);
  };

  return (
    <Sider
      trigger={null}
      className="mt-[-70px] h-screen"
      style={{ backgroundColor: 'black' }}
    >
      {/* <div className="m-4 h-8">
        <Logo/>
      </div> */}
      <Menu
        theme="dark"
        // mode="inline"
        defaultSelectedKeys={['1']}
        onSelect={handleMenuClick}
      >
        <Link href="/home/explore">
          <div className="hover:text-purple1">
            <Menu.Item
              key={1}
              icon={<AppstoreOutlined />}
              className="hover:text-purple1"
            >
              Explore
            </Menu.Item>
          </div>
        </Link>
        <div className="text-purple1 border-l-indigo-500 border-l-4">
          <Link href="/home/dataV">
            <Menu.Item key={3} icon={<RiseOutlined />}>
              Data View
            </Menu.Item>
          </Link>
        </div>
        <Link href="/home/post">
          <Menu.Item key={2}>
            <div
              className="flex items-center justify-center rounded-full bg-purple1 px-1 py-2 text-base text-white"
              style={{ fontFamily: 'Poppins' }}
            >
              new Post
            </div>
          </Menu.Item>
        </Link>
      </Menu>
    </Sider>
  );
}
