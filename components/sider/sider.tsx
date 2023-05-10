'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Layout, Menu } from 'antd';
import {
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
    <Sider trigger={null} className="h-screen">
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
        <div style={{ color: '#6E62EE' }}>
          <Link href="/home/explore">
            <Menu.Item key={1} icon={<AppstoreOutlined />}>
              Explore
            </Menu.Item>
          </Link>
        </div>
        <Link href="/home/dataV">
          <Menu.Item key={3} icon={<RiseOutlined />}>
            Data View
          </Menu.Item>
        </Link>
        <div className=''>
          <Link href="/home/post">
            <Menu.Item key={2} icon={<UserOutlined />}>
              new Post
            </Menu.Item>
          </Link>
        </div>
      </Menu>
    </Sider>
  );
}
