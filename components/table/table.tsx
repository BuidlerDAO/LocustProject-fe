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

const Table2 = () => {
  const columns2 = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: 'Wallet Address',
      dataIndex: 'walletAddress',
      key: 'walletAddress'
    },
    {
      title: 'Number of Content Submitted',
      dataIndex: 'numContentSubmitted',
      key: 'numContentSubmitted'
    },
    {
      title: 'Number of Deleted Content',
      dataIndex: 'numDeletedContent',
      key: 'numDeletedContent'
    },
    {
      title: 'Bonuses Received',
      dataIndex: 'bonusesReceived',
      key: 'bonusesReceived'
    },
    {
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
                defaultValue="lucy"
                style={{
                  width: 80,
                  borderRadius: '8px',
                  border: '1px solid #29282f',
                  color: 'white',
                  outlineColor: '#29282f'
                }}
                className=""
                bordered={false}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true }
                ]}
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
              // colorBgDisabled: '#26262675',
            }
          }}
        >
          <Table
            columns={columns2}
            dataSource={data2}
            pagination={{
              position: ['bottomCenter']
            }}
          />
        </ConfigProvider>
      </div>
      <style jsx>{`
        .month-border {
          background: #0D0COF;
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
  const columns1 = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month'
    },
    {
      title: 'Enrollment',
      dataIndex: 'enrollment',
      key: 'enrollment'
    },
    {
      title: 'Number of content submitted',
      dataIndex: 'numContentSubmitted',
      key: 'numContentSubmitted'
    },
    {
      title: 'Number of valid content',
      dataIndex: 'numValidContent',
      key: 'numValidContent'
    },
    {
      title: 'Number of completed tasks',
      dataIndex: 'numCompletedTasks',
      key: 'numCompletedTasks'
    },
    {
      title: 'Number of incomplete',
      dataIndex: 'numIncomplete',
      key: 'numIncomplete'
    },
    {
      title: 'Total prize pool',
      dataIndex: 'totalPrizePool',
      key: 'totalPrizePool'
    }
  ];
  const data1: readonly any[] | undefined = [];
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
          {/* <div>
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
                defaultValue="lucy"
                style={{
                  width: 80,
                  borderRadius: '8px',
                  border: '1px solid #29282f',
                  color: 'white',
                  outlineColor: '#29282f'
                }}
                className=""
                bordered={false}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true }
                ]}
              />
            </ConfigProvider>
          </div> */}
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
            columns={columns1}
            dataSource={data1}
            pagination={{
              position: ['bottomCenter']
            }}
          />
        </ConfigProvider>
      </div>
      <style jsx>{`
        .month-border {
          background: #0D0COF;
          border: 1px solid #29282f;
          border-radius: 8px;
          padding: 0.5rem 1.5rem;
          gap: 0.25rem;
        }
      `}</style>
    </>
  );
};
const TableUserOverview = () => {
  //columns含有Month、Number of articles submitted、Number of unsuccessful articles、Number of valid articles、Bonus、Total Prize Pool
  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month'
    },
    {
      title: 'Number of articles submitted',
      dataIndex: 'numArticlesSubmitted',
      key: 'numArticlesSubmitted'
    },
    {
      title: 'Number of unsuccessful articles',
      dataIndex: 'numUnsuccessfulArticles',
      key: 'numUnsuccessfulArticles'
    },
    {
      title: 'Number of valid articles',
      dataIndex: 'numValidArticles',
      key: 'numValidArticles'
    },
    {
      title: 'Bonus',
      dataIndex: 'bonus',
      key: 'bonus'
    },
    {
      title: 'Total Prize Pool',
      dataIndex: 'totalPrizePool',
      key: 'totalPrizePool'
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
      <div>
        <div className="flex justify-between">
          <div>
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
      <style jsx>{`
        .month-border {
          background: #0D0COF;
          border: 1px solid #29282f;
          border-radius: 8px;
          padding: 0.5rem 1.5rem;
          gap: 0.25rem;
        }
      `}</style>
    </>
  );
};
const UserArticle = () => {
  //columns中有Article Title、Submit Time、Status
  const columns = [
    {
      title: 'Article Title',
      dataIndex: 'articleTitle',
      key: 'articleTitle'
    },
    {
      title: 'Submit Time',
      dataIndex: 'submitTime',
      key: 'submitTime'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
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
      <div>
        <div className="flex justify-between">
          <div>
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
      <style jsx>{`
        .month-border {
          background: #0D0COF;
          border: 1px solid #29282f;
          border-radius: 8px;
          padding: 0.5rem 1.5rem;
          gap: 0.25rem;
        }
      `}</style>
    </>
  );
};
export { Table2, Table1, TableUserOverview, UserArticle };
