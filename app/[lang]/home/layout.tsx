'use client';
import Navbar from "@/components/navbar"
import  { Suspense ,ReactNode} from 'react';
import Sider from "@/components/sider/sider";
import Loading from "./loading";
import type { FC } from 'react';

const HomeLayout: FC<{ children: ReactNode }> = (props) => {
  return (
    <div
      
      
    >
      <main className="flex h-screen">
      <Sider />
      <Suspense fallback={<Loading/> }>{props.children}</Suspense>
    </main>
    </div>
  );
};

export default HomeLayout;
