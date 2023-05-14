'use client';
import React from 'react';

import PropTypes from 'prop-types';
import Logo from '../icons/logo';
import { AppstoreOutlined, DownOutlined, RiseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Dropdown, Space, ConfigProvider, Table, MenuProps } from 'antd';

const Table1 = (props: {
 
}) => {
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

 const items: MenuProps['items'] = [
   {
     label: (
       <a
         target="_blank"
         rel="noopener noreferrer"
         href="https://www.antgroup.com"
       >
         1st menu item
       </a>
     ),
     key: '0'
   },
   {
     label: (
       <a
         target="_blank"
         rel="noopener noreferrer"
         href="https://www.aliyun.com"
       >
         2nd menu item
       </a>
     ),
     key: '1'
   },
   {
     type: 'divider'
   },
   {
     label: '3rd menu item（disabled）',
     key: '3',
     disabled: true
   }
 ];

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>Schedule</div>
          <div className="">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  March
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
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
        .ant-pagination .ant-pagination-item a {
          color: white;
        }
        .ant-pagination .ant-pagination-item a:hover {
          color: white;
        }
        .ant-pagination .ant-pagination-item-active {
          border-color: #29282f;
        }
        .ant-pagination .ant-pagination-item-active:hover {
          background-color: #0d0c0f;
          border-color: #29282f;
        }
        .ant-pagination .ant-pagination-disabled .ant-pagination-item-link {
          color: white;
        }
      `}</style>
    </>
  );
};

export default Table1;
