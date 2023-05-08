'use client';
import Link from 'next/link';
import { Button, Card, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

//import img404 from '@/assets/error.png'

interface PostProps {
  id: string;
  comment_count: number;
  cover: string[];
  like_count: number;
  pubdate: string;
  read_count: number;
  status: number;
  title: string;
}

const Post: React.FC = () => {
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover: string[]) => {
        return <img src={cover[0]} width={80} height={60} alt="" />;
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data: number) => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data: PostProps) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      }
    }
  ];

  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: ['http://geek.itheima.net/resources/images/15.jpg'],
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ];

  return (
    <div>
      <Card title={`根据筛选条件共查询到 count 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Post;
