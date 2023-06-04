/* eslint-disable prefer-const */
'use client';
import { Avatar, Button, Collapse, List, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import Block from '@/components/blockCard/blockCard';
import { apiGetPostList } from '@/apis/post';
import { Post } from '@/store/PostStore';
import { useSearchStore } from '@/store';
import { useRouter } from 'next/router';

const App = () => {
  const { setSearchValue, searchValue } = useSearchStore();
  const [search, setSearch] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   console.log(id);
  //   if (router.isReady) {
  //     //setSearch(searchValue)
  //   }
  // }, [router.isReady]);

  return (
    <div className="mr-16 mt-[100px]">{/* <Block data={searchValue} /> */}</div>
  );
};

export default App;
