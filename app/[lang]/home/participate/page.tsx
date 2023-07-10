'use client';
import React from 'react';
import UserDataCard from '@/components/userDataCard/userDataCard';
import { TableUserOverview, UserArticle } from '@/components/table/table';
import { useUserStore } from '@/store';
import useEffect from 'react';

const participate = () => {
  //路由鉴权，如果没有报名，跳转到首页
  const isSignUp = useUserStore((state: any) => state.isSignUp);
  React.useEffect(() => {
    if (!isSignUp) {
      window.location.href = '/home';
    }
  }, []);
  return (
    <>
      <div className="mt-[100px] flex w-full flex-col bg-black">
        <UserDataCard />
        <div className="ml-[3vw] mt-[2.5vw] text-[28px] font-medium">
          Statistics
        </div>
        <TableUserOverview />
        <UserArticle />
      </div>
    </>
  );
};

export default participate;
