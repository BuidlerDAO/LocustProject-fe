'use client';
import Link from 'next/link';
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Upload
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { url } from 'inspector';
import { PlusOutlined } from '@ant-design/icons';
import { create } from 'zustand';
import { usePostStore } from '@/store';
import PostComponent from '@/components/postComponent/postComponent';

const Post = () => {
  return <PostComponent />;
};
export default Post;
