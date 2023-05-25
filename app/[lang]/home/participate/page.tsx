'use client';
import React from 'react';
import UserDataCard from '@/components/userDataCard/userDataCard';
import { TableUserOverview, UserArticle } from '@/components/table/table';

const participate = () => {
  return (
    <>
      <div className="mt-[100px] flex flex-col">
        <UserDataCard />
        <div className="mt-12">Statistics</div>
        <TableUserOverview />
        <UserArticle />
      </div>
    </>
  );
};

export default participate;
