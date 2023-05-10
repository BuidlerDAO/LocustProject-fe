'use client';
import Link from 'next/link';
import { Avatar,message, Button, Card, Form, Input, Space, Table, Tag,Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import Twitter from '@/components/icons/twitter';
import { TwitterIcon } from '@/components/icons/campaignTwitter';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useState } from 'react';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

//import img404 from '@/assets/error.png'
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Explore: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Card title={'Avatar'}>
        <Form layout='vertical'>
          <Form.Item label='Avatar' name='avatar'>
            {/* <Avatar size={64} icon={<UserOutlined />} /> */}
            <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
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
