/* eslint-disable prefer-const */
'use client';
import { Avatar, Button, Collapse, List, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import Block from '@/components/blockCard/blockCard';
import { apiGetPostList } from '@/apis/post';
import { Post } from '@/store/PostStore';
import { useSearchStore } from '@/store';

const App = () => {
  const { setSearchValue, searchValue } = useSearchStore();
  const [search, setSearch] = useState([]);
  useEffect(() => {
    console.log(searchValue);
    //setSearch(searchValue)
  }, []);

  return (
    <div className="mr-16 mt-[100px]">
      <Block data={searchValue} />
    </div>
  );
};

export default App;
