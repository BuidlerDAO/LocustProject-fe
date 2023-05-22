import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Button } from '@/components/button';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import toast from '@/components/toast/toast';
import DownOutlined from '@/components/icons/downOutLined';
import Link from 'next/link';
import { useUserStore } from '@/store';
interface MyProps {
  children?: ReactNode;
}

const Wallet: FC<MyProps> = (props) => {
  const { isLogin, setIsLogin } = useUserStore();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href="/home/profile" style={{ color: 'white' }}>
          My Profile
        </Link>
      )
    },
    {
      key: '2',
      label: (
        <Link
          href="/home/participate"
          style={{ color: 'white', whiteSpace: 'nowrap' }}
        >
          Event Participation
        </Link>
      )
    },
    {
      key: '3',
      label: (
        <p style={{ color: 'white' }} onClick={() => setIsLogin(false)}>
          Disconnect
        </p>
      )
    }
  ];

  const menuStyle = {
    backgroundColor: '#1A1A1A',
    borderRadius: '12px'
  };
  return (
    <>
      {/*<button className="w-[50px] h-[50px] bg-white text-black" onClick={loginTest}>模拟登录</button>*/}
      <Button
        color="primary"
        className={`w-[240px] whitespace-nowrap px-10 py-2 text-[16px] font-semibold ${
          isLogin ? 'border-black bg-[#1A1A1A]' : 'hover:border-[#6E62EE]'
        }`}
      >
        {isLogin ? (
          <Dropdown
            menu={{ items }}
            placement="bottom"
            overlayStyle={{
              paddingTop: '14px',
              width: '240px',
              height: '136px'
            }}
            dropdownRender={(menu) => (
              <div>
                {React.cloneElement(menu as React.ReactElement, {
                  style: menuStyle
                })}
              </div>
            )}
          >
            <div>
              <a
                onClick={(e) => e.preventDefault()}
                className="flex justify-between"
              >
                <Space>0x4c....3333</Space>
                <div className="ml-[0.8vw] mt-[8px]">
                  <DownOutlined />
                </div>
              </a>
            </div>
          </Dropdown>
        ) : (
          <p
            onClick={() => setIsLogin(true)}
            style={{ fontFamily: 'Outfit', fontWeight: '600' }}
          >
            Connect Wallet
          </p>
        )}
      </Button>
    </>
  );
};

export default memo(Wallet);
