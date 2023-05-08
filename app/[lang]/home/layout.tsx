'use client';
import Navbar from "@/components/navbar"
import  { Suspense ,ReactNode} from 'react';
import Sider from "@/components/sider/sider";
import Loading from "./loading";
import type { FC } from 'react';

const HomeLayout: FC<{ children: ReactNode }> = (props) => {
  return (
    <div
      className="flex-1"
      style={{ background: 'linear-gradient(#ADFFF4,#000000)' }}
    >
      <main>
      <Sider />
      <Suspense fallback={<Loading/> }>{props.children}</Suspense>
    </main>
    </div>
  );
};

export default HomeLayout;
