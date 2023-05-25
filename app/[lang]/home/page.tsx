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
import Paragraph from 'antd/es/typography/Paragraph';
import Block from '@/components/blockCard/blockCard';
import { usePostStore } from '@/store';
import { apiGetPostList } from '@/apis/post';

const App = () => {
  type post = {
    title: string;
    link: string;
    originalText: string;
    personalThoughts: string;
    time: string;
  };
  //type postData = [post];
  let data: post[] = [];
  const onDelete = () => {
    console.log('delete');
  };
  useEffect(() => {
    console.log(data);
  }, []);
  const getData = async () => {
    Promise.all([apiGetPostList({})]).then((postData) => {
      data = Array.from(Object.values(postData)).map((post: any) => ({
        title: post.title,
        link: post.link,
        originalText: post.originalText,
        personalThoughts: post.personalThoughts,
        time: post.time
      }));
      //const postData = usePostStore((state: any) => state.posts);
    });
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
};
export default App;
