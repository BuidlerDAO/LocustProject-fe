import Link from 'next/link';
import Image from 'next/image';
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import LogoIcon from '@/components/icons/logoIcon';

export default function Sider() {
  const { Sider } = Layout;

  const handleMenuClick = (e) => {
    const link = e.key;
    console.log(link);
  };

  return (
    <Sider trigger={null} className="h-screen">
      <div className="m-4 h-8">
        <LogoIcon />
        {/*<Image src="/assets/Logo.png" alt="logo" width={100} height={100} />*/}
        {/* <img src='../../assets/Logo.png' alt="logo" /> */}
      </div>
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
            label: <Link href="/home/post">new post</Link>
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: <Link href="/home/dataV">Data View</Link>
          }
        ]}
      />
    </Sider>
  );
}
