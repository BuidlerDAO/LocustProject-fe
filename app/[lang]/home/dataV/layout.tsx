'use client';
import Navbar from '@/components/navbar';
import { ReactNode, Suspense } from 'react';
import type { FC } from 'react';
import { ConfigProvider } from 'antd';

const HomeLayout: FC<{ children: ReactNode }> = (props) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: '#000000',
            colorText: 'white'
            //colorTextDescription: 'white',
            // colorTextPlaceholder: '#6f6f6f',
            // colorPrimaryHover: '#575757'
          }
        }}
      >
        <main className="mt-[100px] flex h-screen">
          <Suspense>{props.children}</Suspense>
        </main>
      </ConfigProvider>
    </div>
  );
};

export default HomeLayout;
