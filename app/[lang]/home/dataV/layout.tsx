'use client';
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
          }
        }}
      >
        <main className="mb-[24px] ml-[25px] mt-[100px] flex w-full bg-black">
          <Suspense>{props.children}</Suspense>
        </main>
      </ConfigProvider>
    </div>
  );
};

export default HomeLayout;
