'use client';
import React from 'react';
import { Card, ConfigProvider, Dropdown, MenuProps, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import { Table2 } from '@/components/table/table';
import { Table1, Table2 } from '@/components/table/table';
import DataCard from '@/components/dataCard/dataCard';
import { useUserStore } from '@/store';

// const pagination = {
//   pageSize: 10,
//   showSizeChanger: true,
//   pageSizeOptions: ['10', '20', '30', '40'],
//   showTotal: (total: any, range: any[]) => `${range[0]}-${range[1]} of ${total} items`,
//   style: {
//     marginTop: 16,
//     color: '#ffffff',
//     backgroundColor: '#000000'
//   }
// };

const dataV = () => {
  const { isAdmin } = useUserStore();
  //进行判断，如果是则显示，否则跳转到首页/home
  if (isAdmin) {
    return (
      <>
        <div className="ml-[1vw] mt-[2vh] flex flex-col ">
          {/* <Table columns={columns} dataSource={data} /> */}
          <DataCard />
          <div>
            <div
              className="mt-[1.75rem] font-medium text-white"
              style={{
                fontFamily: 'Inter',
                fontSize: '28px',
                lineHeight: '34px'
              }}
            >
              Statistics
            </div>
            <Table1 />
            <Table2 />
          </div>
          <div className="side-menu-btn">
            <div className="side-menu-frame10211">
              <span className="side-menu-text4">
                <span>Bonus Confirmation</span>
              </span>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .side-menu-btn {
              gap: 4px;
              margin-top: 2vh;
              margin-left: 25vw;
              padding: 4px 8px 4px 0;
              position: relative;
              flex-shrink: 0;
              border-radius: 8px;
              cursor: pointer;
              display: flex;
              align-items: center;
            }
            .side-menu-frame10211 {
              gap: 8px;
              top: 0px;
              left: 20px;
              height: 52px;
              display: flex;
              padding: 0.75rem 4rem;
              position: absolute;
              align-items: center;
              flex-shrink: 0;
              border-radius: 44px;
              justify-content: center;
              background-image: linear-gradient(
                180deg,
                rgba(110, 98, 238, 1) 2%,
                rgba(63, 61, 250, 1) 100%
              );
            }
            .side-menu-frame10211:hover {
              background: linear-gradient(
                180deg,
                #8377ff -67.27%,
                #504ef0 100%
              );
            }
            .side-menu-text4 {
              color: rgba(255, 255, 255, 1);
              height: auto;
              font-size: 1.125rem;
              font-style: Medium;
              text-align: left;
              font-family: Poppins;
              font-weight: 500;
              line-height: normal;
              font-stretch: normal;
              text-decoration: none;
            }
          `}
        </style>
      </>
    );
  } else {
    return (
      <>
        <div className="ml-[1vw] mt-[2vh] flex flex-col text-5xl">
          你没有权限访问该页面
        </div>
      </>
    );
  }
};

export default dataV;
