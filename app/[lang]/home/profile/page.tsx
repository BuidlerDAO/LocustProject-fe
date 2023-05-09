'use client';
import Link from 'next/link';
import { Avatar, Button, Card, Form, Input, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import Twitter from '@/components/icons/twitter';
import { TwitterIcon } from '@/components/icons/campaignTwitter';

//import img404 from '@/assets/error.png'


const Explore: React.FC = () => {
  
  return (
    <div>
      <Card title={'Avatar'}>
        <Form layout='vertical'>
          <Form.Item label='Avatar' name='avatar'>
            <Avatar size={64} icon={<UserOutlined />} />
            <span>Support PNG、JPG、GIF,64×64<br/>recommended,max size 5M</span>
          </Form.Item>  
          <Form.Item label='User Name' name='userName'>
            <Input placeholder='User Name' />
          </Form.Item>
          <Form.Item label='Twitter' name='Twitter'>
            <div className='bg-blue-500'><Twitter /></div>
            <TwitterIcon />
          </Form.Item>
          </Form>
      </Card>
    </div>
  );
};

export default Explore;
