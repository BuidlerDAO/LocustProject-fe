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

  useEffect(() => {
    //getData();
  }, []);

  return (
    <div className="mr-16 mt-[100px]">
      <List
        itemLayout="vertical"
        size="large"
        style={{ color: 'white' }}
        dataSource={searchValue}
        renderItem={(item) => (
          <List.Item title={item.title}>
            <Block data={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
