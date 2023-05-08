'use client';
import Link from 'next/link';
import { Avatar, Button, Card, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined,UserOutlined } from '@ant-design/icons';

//import img404 from '@/assets/error.png'


const Explore: React.FC = () => {
  
  return (
    <div>
      <Card title={'Avatar'}>
        
        <Avatar size={64} icon={<UserOutlined />} />
        
      </Card>
    </div>
  );
};

export default Explore;
