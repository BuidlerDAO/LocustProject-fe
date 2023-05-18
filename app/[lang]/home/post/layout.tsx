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
            colorBgContainer: '#000000',
            colorText: 'white',
            //colorTextDescription: 'white',
            colorTextPlaceholder: '#FFFFFF66',
            colorPrimaryHover: '#FFFFFF4D'
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
