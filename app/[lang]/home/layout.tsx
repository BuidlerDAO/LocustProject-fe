'use client';
import Navbar from "@/components/navbar"
import  { Suspense ,ReactNode} from 'react';
import Sider from "@/components/sider/sider";
import Loading from "./loading";
import type { FC } from 'react';
import { ConfigProvider } from "antd";

const HomeLayout: FC<{ children: ReactNode }> = (props) => {
  return (
    
    <div>
      <ConfigProvider theme={{
        token: {
          'colorPrimary': '#000000',
          'colorLinkHover':' #6E62EE'
        },
      }}>
      <main className="flex h-screen">
      <Sider />
      <Suspense fallback={<Loading/> }>{props.children}</Suspense>
        </main>
        </ConfigProvider>
    </div>
  );
};

export default HomeLayout;
