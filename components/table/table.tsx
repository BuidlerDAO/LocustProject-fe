'use client';
import React from 'react';

import PropTypes from 'prop-types';
import Logo from '../icons/logo';
import { AppstoreOutlined, DownOutlined, RiseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Dropdown, Space, ConfigProvider, Table, MenuProps, Select } from 'antd';

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
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>Schedule</div>
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
        .month-border {
          background: #0D0COF;
          border: 1px solid #29282f;
          border-radius: 8px;
          padding: 0.5rem 1.5rem;
          gap: 0.25rem;
        }
        :global .ant-select .ant-select-arrow{
          color: white;!important
        }
      `}</style>
    </>
  );
};

export default Table1;
