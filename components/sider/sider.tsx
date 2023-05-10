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
import LogoIcon from '@/components/icons/logoIcon';

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
      <div className="m-4 h-8">
        {/*<Image src="/assets/Logo.png" alt="logo" width={100} height={100} />*/}
        {/* <img src='../../assets/Logo.png' alt="logo" /> */}
      </div>
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
              className="rounded-full bg-purple1 text-white text-base flex justify-center items-center py-2 px-1"
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
