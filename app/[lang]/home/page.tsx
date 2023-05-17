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
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Disconnect from '../../../components/icons/disconnect';

const { Header, Content } = Layout;

export default function Home() {
  const url = usePathname();
  useEffect(() => {
    window.location.href = '/home/explore';
  }, []);

  return (
    <div>1</div>
  );
}
