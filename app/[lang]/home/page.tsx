/* eslint-disable prefer-const */
'use client';
import {
  DeleteOutlined,
  EllipsisOutlined,
  FieldTimeOutlined,
  LikeOutlined,
  LinkOutlined,
  MessageOutlined,
  StarOutlined
} from '@ant-design/icons';
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
    Promise.all([apiGetPostList({ offset: 0, limit: 10 })]).then(
      (values: any) => {
        const newData = values.map((item: any) => ({
          title: item.items[0].title,
          link: item.items[0].link,
          originalText: item.items[0].body,
          personalThoughts: item.items[0].thought,
          time: item.items[0].createdAt,
          avatar: item.items[0].avatar,
          username: item.items[0].username
        }));
        setData(newData);
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
