import Link from "next/link";
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';

export default function Sider() {
  const { Sider } = Layout;

const handleMenuClick = (e) => {
    const link = e.key;
    console.log(link);
  };

  return (
    <Sider trigger={null} collapsible collapsed>
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
  );
}