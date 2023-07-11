'use client';
import { ReactNode, Suspense } from 'react';
import type { FC } from 'react';
import { ConfigProvider } from 'antd';

const HomeLayout: FC<{ children: ReactNode }> = (props) => {
  return (
    <div>
      <main className="ml-[330px] mt-[100px] flex w-full bg-black">
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#000000',
              colorText: 'white',
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
