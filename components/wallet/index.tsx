import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Button } from '@/components/button';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import toast from '@/components/toast/toast';
import DownOutlined from '@/components/icons/downOutLined';
import Link from 'next/link';
import { useLoginStore } from '@/store';
interface MyProps {
  children?: ReactNode;
}

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
      <Link href="/home" style={{ color: 'white', whiteSpace: 'nowrap' }}>
        Event Participation
      </Link>
    )
  },
  {
    key: '3',
    label: <p style={{ color: 'white' }}>Disconnect</p>
  }
];

const Wallet: FC<MyProps> = (props) => {
  const { isLoggedIn } = useLoginStore();
  const loginTest = useLoginStore((state) => state.loginTest);
  const menuStyle = {
    backgroundColor: '#1A1A1A',
    borderRadius: '12px'
  };
  return (
    <>
      <Button
        color="primary"
        onClick={loginTest}
        className={`w-[144px] whitespace-nowrap px-10 py-2 text-[16px] font-semibold ${
          isLoggedIn ? 'border-black bg-[#1A1A1A]' : 'hover:border-[#6E62EE]'
        }`}
      >
        {isLoggedIn ? (
          <Dropdown
            menu={{ items }}
            placement="bottom"
            overlayStyle={{
              paddingTop: '14px',
              width: '144px',
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
                <div className="ml-[2px] mt-[8px]">
                  <DownOutlined />
                </div>
              </a>
            </div>
          </Dropdown>
        ) : (
          <>Connect Wallet</>
        )}
      </Button>
    </>
  );
};

export default memo(Wallet);
