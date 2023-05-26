'use client';
import React from 'react';

import './index.css';
import Logo from '../icons/logo';
import {
  AppstoreOutlined,
  DownloadOutlined,
  DownOutlined,
  RiseOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import {
  ConfigProvider,
  Dropdown,
  MenuProps,
  Select,
  Space,
  Table
} from 'antd';
import { getFullMonth } from '@/utils/time';
type AlignType = 'left' | 'center' | 'right';
interface ColumnItem {
  title: string;
  dataIndex: string;
  key: string;
  align?: AlignType;
}
const Table2 = () => {
  const columns2: ColumnItem[] = [
    {
      align: 'center',
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      align: 'center',
      title: 'Wallet Address',
      dataIndex: 'walletAddress',
      key: 'walletAddress'
    },
    {
      align: 'center',
      title: 'Number of Content Submitted',
      dataIndex: 'numContentSubmitted',
      key: 'numContentSubmitted'
    },
    {
      align: 'center',
      title: 'Number of Deleted Content',
      dataIndex: 'numDeletedContent',
      key: 'numDeletedContent'
    },
    {
      align: 'center',
      title: 'Bonuses Received',
      dataIndex: 'bonusesReceived',
      key: 'bonusesReceived'
    },
    {
      align: 'center',
      title: 'Registration Time',
      dataIndex: 'registrationTime',
      key: 'registrationTime'
    }
  ];
  const data2 = [
    {
      key: '1',
      userName: 'John Doe',
      walletAddress: '0x1234567890abcdef',
      numContentSubmitted: 10,
      numDeletedContent: 2,
      bonusesReceived: 5,
      registrationTime: '2021-01-01'
    },
    {
      key: '2',
      userName: 'Jane Smith',
      walletAddress: '0xabcdef1234567890',
      numContentSubmitted: 5,
      numDeletedContent: 1,
      bonusesReceived: 2,
      registrationTime: '2021-02-01'
    },
    {
      key: '3',
      userName: 'Bob Johnson',
      walletAddress: '0x0987654321fedcba',
      numContentSubmitted: 20,
      numDeletedContent: 0,
      bonusesReceived: 10,
      registrationTime: '2021-03-01'
    },
    {
      key: '4',
      userName: 'Jane Smith',
      walletAddress: '0xabcdef1234567890',
      numContentSubmitted: 5,
      numDeletedContent: 1,
      bonusesReceived: 2,
      registrationTime: '2021-02-01'
    },
    {
      key: '5',
      userName: 'Jane Smith',
      walletAddress: '0xabcdef1234567890',
      numContentSubmitted: 5,
      numDeletedContent: 1,
      bonusesReceived: 2,
      registrationTime: '2021-02-01'
    },
    {
      key: '6',
      userName: 'Jane Smith',
      walletAddress: '0xabcdef1234567890',
      numContentSubmitted: 5,
      numDeletedContent: 1,
      bonusesReceived: 2,
      registrationTime: '2021-02-01'
    }
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onDownload = () => {
    console.log('download');
  };
  return (
    <>
      <div className="mt-4">
        <div className="flex justify-between">
          <div className="mb-4">
            Schedule
            <DownloadOutlined
              className="ml-6 cursor-pointer"
              onClick={onDownload}
            />
          </div>
          <div>
            <ConfigProvider
              theme={{
                token: {
                  colorBgElevated: 'black',
                  colorText: '#ffffff',
                  colorIconHover: '#ffffff',
                  colorIcon: '#ffffff'
                }
              }}
            >
              <Select
                defaultValue="January"
                style={{
                  width: 80,
                  borderRadius: '8px',
                  border: '1px solid #29282f',
                  color: 'white',
                  outlineColor: '#29282f'
                }}
                bordered={false}
                onChange={handleChange}
                options={getFullMonth()}
              />
            </ConfigProvider>
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f0f0f',
              colorText: '#ffffff',
              colorBgTextActive: '#ffffff',
              colorTextPlaceholder: '#ffffff',
              colorTextHeading: ' #747474',
              colorBorderSecondary: '#26262675',
              colorSplit: '#26262675',
              colorBorder: '#29282F'
            }
          }}
        >
          <Table
            columns={columns2}
            dataSource={data2}
            pagination={{
              position: ['bottomCenter'],
              pageSize: 4
            }}
          />
        </ConfigProvider>
      </div>
      <style jsx>{`
        .month-border {
          background: #ffffff;
          border: 1px solid #29282f;
          border-radius: 8px;
          padding: 0.5rem 1.5rem;
          gap: 0.25rem;
        }
      `}</style>
    </>
  );
};
const Table1 = () => {
  const columns1: ColumnItem[] = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      align: 'center'
    },
    {
      title: 'Enrollment',
      dataIndex: 'enrollment',
      key: 'enrollment',
      align: 'center'
    },
    {
      title: 'Number of content submitted',
      dataIndex: 'numContentSubmitted',
      key: 'numContentSubmitted',
      align: 'center'
    },
    {
      title: 'Number of valid content',
      dataIndex: 'numValidContent',
      key: 'numValidContent',
      align: 'center'
    },
    {
      title: 'Number of completed tasks',
      dataIndex: 'numCompletedTasks',
      key: 'numCompletedTasks',
      align: 'center'
    },
    {
      title: 'Number of incomplete',
      dataIndex: 'numIncomplete',
      key: 'numIncomplete',
      align: 'center'
    },
    {
      title: 'Total prize pool',
      dataIndex: 'totalPrizePool',
      key: 'totalPrizePool',
      align: 'center'
    }
  ];
  const data1: readonly any[] | undefined = [
    {
      month: 'December',
      enrollment: 567,
      numContentSubmitted: 876,
      numValidContent: 381,
      numCompletedTasks: 993,
      numIncomplete: 98,
      totalPrizePool: 604,
      numDeletedContent: 68,
      bonusesReceived: 98,
      registrationTime: '2/23/2019',
      walletAddress: '0x8e1c329f133e'
    },
    {
      month: 'September',
      enrollment: 998,
      numContentSubmitted: 467,
      numValidContent: 626,
      numCompletedTasks: 119,
      numIncomplete: 658,
      totalPrizePool: 814,
      numDeletedContent: 296,
      bonusesReceived: 508,
      registrationTime: '6/1/2018',
      walletAddress: '0x1d9f5fc48a4'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'December',
      enrollment: 567,
      numContentSubmitted: 876,
      numValidContent: 381,
      numCompletedTasks: 993,
      numIncomplete: 98,
      totalPrizePool: 604,
      numDeletedContent: 68,
      bonusesReceived: 98,
      registrationTime: '2/23/2019',
      walletAddress: '0x8e1c329f133e'
    },
    {
      month: 'September',
      enrollment: 998,
      numContentSubmitted: 467,
      numValidContent: 626,
      numCompletedTasks: 119,
      numIncomplete: 658,
      totalPrizePool: 814,
      numDeletedContent: 296,
      bonusesReceived: 508,
      registrationTime: '6/1/2018',
      walletAddress: '0x1d9f5fc48a4'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    },
    {
      month: 'June',
      enrollment: 649,
      numContentSubmitted: 216,
      numValidContent: 369,
      numCompletedTasks: 80,
      numIncomplete: 473,
      totalPrizePool: 222,
      numDeletedContent: 827,
      bonusesReceived: 304,
      registrationTime: '8/29/2019',
      walletAddress: '0x450949f62c8'
    }
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onDownload = () => {
    console.log('download');
  };
  return (
    <>
      <div className="mt-3">
        <div className="flex justify-between">
          <div className="mb-4">
            Overview Table
            <DownloadOutlined
              className="ml-6 cursor-pointer"
              onClick={onDownload}
            />
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f0f0f',
              colorText: '#ffffff',
              colorBgTextActive: '#ffffff',
              colorTextPlaceholder: '#ffffff',
              colorTextHeading: ' #747474',
              colorBorderSecondary: '#26262675',
              colorSplit: '#26262675',
              colorBorder: '#29282F'
            }
          }}
        >
          <Table
            columns={columns1}
            dataSource={data1}
            pagination={{
              pageSize: 4,
              position: ['bottomCenter']
            }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};
const TableUserOverview = () => {
  //columns含有Month、Number of articles submitted、Number of unsuccessful articles、Number of valid articles、Bonus、Total Prize Pool
  const columns: ColumnItem[] = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      align: 'center'
    },
    {
      title: 'Number of articles submitted',
      dataIndex: 'numArticlesSubmitted',
      key: 'numArticlesSubmitted',
      align: 'center'
    },
    {
      title: 'Number of unsuccessful articles',
      dataIndex: 'numUnsuccessfulArticles',
      key: 'numUnsuccessfulArticles',
      align: 'center'
    },
    {
      title: 'Number of valid articles',
      dataIndex: 'numValidArticles',
      key: 'numValidArticles',
      align: 'center'
    },
    {
      title: 'Bonus',
      dataIndex: 'bonus',
      key: 'bonus',
      align: 'center'
    },
    {
      title: 'Total Prize Pool',
      dataIndex: 'totalPrizePool',
      key: 'totalPrizePool',
      align: 'center'
    }
  ];
  const data: readonly any[] | undefined = [
    {
      month: '2021-01',
      numArticlesSubmitted: 10,
      numUnsuccessfulArticles: 2,
      numValidArticles: 8,
      bonus: 100,
      totalPrizePool: 1000
    },
    {
      month: '2021-02',
      numArticlesSubmitted: 10,
      numUnsuccessfulArticles: 2,
      numValidArticles: 8,
      bonus: 100,
      totalPrizePool: 1000
    }
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onDownload = () => {
    console.log('download');
  };
  return (
    <>
      <div className="ml-[5vw] w-[70vw]">
        <div className="mt-[38px] flex justify-between">
          <div className="mb-[24px]">
            Overview
            <DownloadOutlined
              className="ml-6 cursor-pointer"
              onClick={onDownload}
            />
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f0f0f',
              colorText: '#ffffff',
              colorBgTextActive: '#ffffff',
              colorTextPlaceholder: '#ffffff',
              colorTextHeading: ' #747474',
              colorBorderSecondary: '#26262675',
              colorSplit: '#26262675',
              colorBorder: '#29282F'
              // colorBgDisabled: '#26262675',
            }
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              position: ['bottomCenter']
            }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};
const UserArticle = () => {
  //columns中有Article Title、Submit Time、Status
  const columns: ColumnItem[] = [
    {
      title: 'Article Title',
      dataIndex: 'articleTitle',
      key: 'articleTitle',
      align: 'center'
    },
    {
      title: 'Submit Time',
      dataIndex: 'submitTime',
      key: 'submitTime',
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center'
    }
  ];
  const data: readonly any[] | undefined = [
    {
      articleTitle: 'Article Title',
      submitTime: '2021-01-01',
      status: 'Normal'
    },
    {
      articleTitle: 'Article Title',
      submitTime: '2021-01-01',
      status: 'Audit does not pass'
    }
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onDownload = () => {
    console.log('download');
  };
  return (
    <>
      <div className="ml-[5vw] w-[70vw]">
        <div className="mt-[10px] flex justify-between">
          <div className="mb-[24px]">
            Article Details
            <DownloadOutlined
              className="ml-6 cursor-pointer"
              onClick={onDownload}
            />
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f0f0f',
              colorText: '#ffffff',
              colorBgTextActive: '#ffffff',
              colorTextPlaceholder: '#ffffff',
              colorTextHeading: ' #747474',
              colorBorderSecondary: '#26262675',
              colorSplit: '#26262675',
              colorBorder: '#29282F'
              // colorBgDisabled: '#26262675',
            }
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              position: ['bottomCenter']
            }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export { Table2, Table1, TableUserOverview, UserArticle };
