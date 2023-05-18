'use client';
import Navbar from '@/components/navbar';
import { Suspense, ReactNode } from 'react';
import Sider from '@/components/sider/sider';
import type { FC } from 'react';
import { ConfigProvider } from 'antd';


const HomeLayout: FC<{ children: ReactNode }> = (props) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: '#0f0f0f',
            colorText: 'white',
            //colorTextDescription: 'white',
            colorTextPlaceholder: '#6f6f6f',
            colorPrimaryHover: '#575757'
          }
        }}
      >
        <main className="flex h-screen">
          <Suspense>{props.children}</Suspense>
        </main>
      </ConfigProvider>
    </div>
  );
};

export default HomeLayout;
