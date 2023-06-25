'use client';
import Navbar from '@/components/navbar';
import { ReactNode, Suspense } from 'react';
import Loading from './loading';
import type { FC } from 'react';
import { ConfigProvider } from 'antd';
import SideMenu from '@/components/siderMenu/siderMenu';

const HomeLayout: FC<{ children: ReactNode }> = (props) => {
  return (
    <div className="min-h-screen">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#000000',
            colorLinkHover: ' #6E62EE'
          }
        }}
      >
        <main className="flex min-h-screen bg-black">
          <SideMenu />
          <Suspense>{props.children}</Suspense>
        </main>
      </ConfigProvider>
    </div>
  );
};

export default HomeLayout;
