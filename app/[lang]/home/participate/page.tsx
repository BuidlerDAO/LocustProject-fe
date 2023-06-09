'use client';
import React from 'react';
import UserDataCard from '@/components/userDataCard/userDataCard';
import { TableUserOverview, UserArticle } from '@/components/table/table';

const participate = () => {
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
