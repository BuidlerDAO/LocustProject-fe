/* eslint-disable prefer-const */
'use client';
import { Avatar, Button, Collapse, List, Space, Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import Block from '@/components/blockCard/blockCard';
import { apiGetPostList } from '@/apis/post';
import { Post } from '@/store/PostStore';
import { usePostStore } from '@/store';

const App = () => {
  const { setPosts, posts } = usePostStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    Promise.all([apiGetPostList({ offset: 0, limit: 30 })]).then(
      (values: any) => {
        const newData = values.flatMap((item: any) =>
          item.items.map((item: any) => ({
            id: item.id,
            title: item.title,
            link: item.link,
            originalText: item.body,
            personalThoughts: item.thought,
            time: item.createdAt,
            avatar: item.creator.avatar,
            username: item.creator.name,
            twitter: item.creator.twitterUsername
          }))
        );
        setPosts(newData);
        setLoading(false);
      }
    );
  };

  return (
    <div className="mx-[19px] ml-[288px] mt-[100px] w-full">
      <List
        itemLayout="vertical"
        size="large"
        style={{ color: 'white' }}
        dataSource={posts}
        loading={loading}
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
