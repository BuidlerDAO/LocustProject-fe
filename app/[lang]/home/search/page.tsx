'use client';

import { useEffect, useState } from 'react';
import { useSearchStore } from '@/store';
import Block from '@/components/blockCard/blockCard';

export default function Post() {
  const { searchValue } = useSearchStore();

  if (!searchValue) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    console.log(searchValue);
    //当searchValue为空时，跳转到首页
    if (searchValue.avatar === '') {
      window.location.href = '/home';
    }
  }, []);

  return (
    <div className="ml-[330px] mt-[132px] flex flex-col">
      <Block data={searchValue} />
    </div>
  );
}
