'use client';
import { DeleteOutlined, EllipsisOutlined, FieldTimeOutlined, LikeOutlined, LinkOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Collapse, Tooltip, Button } from 'antd';
import React, { useState } from 'react';
import { AvatarIcon } from '../../../../components/icons/campaignAvatar';
import Paragraph from 'antd/es/typography/Paragraph';
import Delete from '../../../../components/icons/delete';

const { Panel } = Collapse;

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
}));

const App: React.FC = () => {
  const [ellipsis, setEllipsis] = useState(true);
  const onDelete = () => {
    console.log('delete');
  };
  const text = () => (
    <button  className='hover:text-red-600' onClick={onDelete}>
      <DeleteOutlined />
      &nbsp;
      <span>Delete</span>
    </button>
  );
  return (
    <div className="mr-16">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
          
        }}
        style={{ color: 'white' }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title} className="bg-white">
            {/* <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          /> */}
            <div className='flex justify-between'>
              <span>{item.title}</span>
              <Tooltip title={text} placement='bottom'>
              <span className='flex'>
                <EllipsisOutlined  />
                </span>
                </Tooltip>
            </div>
            <div>
              <span>
                <FieldTimeOutlined />
              </span>
              <span>
                <Avatar src={item.avatar} />
              </span>
              <span>
                <LinkOutlined />
                <a href={item.href}>{item.href}</a>
              </span>
            </div>
            <Paragraph
              ellipsis={
                ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false
              }
            >
              Ant Design, a design language for background applications, is
              refined by Ant UED Team. Ant Design, a design language for
              background applications, is refined by Ant UED Team. Ant Design, a
              design language for background applications, is refined by Ant UED
              Team. Ant Design, a design language for background applications,
              is refined by Ant UED Team. Ant Design, a design language for
              background applications, is refined by Ant UED Team. Ant Design, a
              design language for background applications, is refined by Ant UED
              Team.
            </Paragraph>
          </List.Item>
        )}
      />
    </div>
  );
}
export default App;
