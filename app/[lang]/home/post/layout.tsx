'use client';
import Navbar from '@/components/navbar';
import { ReactNode, Suspense } from 'react';
import type { FC } from 'react';
import { ConfigProvider } from 'antd';

const HomeLayout: FC<{ children: ReactNode }> = (props) => {
  return (
    <div>
      <main className="ml-[41px] mt-[100px] flex">
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
          <Suspense>{props.children}</Suspense>
        </ConfigProvider>
      </main>
    </div>
  );
};

export default HomeLayout;
