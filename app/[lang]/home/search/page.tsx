'use client';

//import { useRouter } from 'next/router';
//import { apiGetPost } from '../api';
import { useEffect, useState } from 'react';
import { useSearchStore } from '@/store';
import Block from '@/components/blockCard/blockCard';

export default function Post() {
  const { searchValue } = useSearchStore();
  const [data, setData] = useState<any>();

  if (!searchValue) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    console.log(searchValue);
  }, []);
  return (
    <div className="mt-[100px] flex flex-col">
      <Block data={searchValue} />
    </div>
  );
}
