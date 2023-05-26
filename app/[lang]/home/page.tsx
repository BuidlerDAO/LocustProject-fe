/* eslint-disable prefer-const */
'use client';
import { Avatar, Button, Collapse, List, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import Block from '@/components/blockCard/blockCard';
import { apiGetPostList } from '@/apis/post';
import { Post } from '@/store';

const App = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    Promise.all([apiGetPostList({ offset: 0, limit: 30 })]).then(
      (values: any) => {
        const newData = values.flatMap((item: any) =>
          item.items.map((item: any) => ({
            title: item.title,
            link: item.link,
            originalText: item.body,
            personalThoughts: item.thought,
            time: item.createdAt,
            avatar: item.avatar,
            username: item.username
          }))
        );
        setData(newData);
        console.log(newData);
      }
    );
  };

  return (
    <div className="mr-16 mt-[100px]">
      <List
        itemLayout="vertical"
        size="large"
        style={{ color: 'white' }}
        dataSource={data}
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
