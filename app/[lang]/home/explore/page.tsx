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
import React, { useState, useEffect } from 'react';
import { AvatarIcon } from '../../../../components/icons/campaignAvatar';
import Paragraph from 'antd/es/typography/Paragraph';
import Delete from '../../../../components/icons/delete';
import Block from '@/components/blockCard/blockCard';
import { usePostStore } from '@/store';

const App: React.FC = () => {
  type postData = {
    [id: number]: {
      title: string;
      link: string;
      originalText: string;
      personalThoughts: string;
      time: string;
    };
  };
  type data = [
    {
      id: number;
      title: string;
      link: string;
      originalText: string;
      personalThoughts: string;
      time: string;
    }
  ];
  const onDelete = () => {
    console.log('delete');
  };
  useEffect(() => {
    console.log(data);
  }, []);
  const postData = usePostStore((state) => state.posts);
  const data = Array.from(Object.values(postData)).map((post) => ({
    title: post.title,
    link: post.link,
    originalText: post.originalText,
    personalThoughts: post.personalThoughts,
    time: post.time
  }));
  return (
    <div className="mr-16">
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
