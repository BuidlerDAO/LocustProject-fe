import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Button } from '@/components/button';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import toast from '@/components/toast/toast';

interface MyProps {
  children?: ReactNode;
}

const onClick: MenuProps['onClick'] = ({ key }) => {
  toast.error(`Click on item ${key}`);
};

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1'
  },
  {
    label: '2nd menu item',
    key: '2'
  },
  {
    label: '3rd menu item',
    key: '3'
  }
];

const Wallet: FC<MyProps> = () => {
  const [isConnect, setIsconnect] = useState(false);
  return (
    <>
      <Button
        color="primary"
        className={`w-[144px] whitespace-nowrap px-10 py-2 text-[16px] font-semibold ${
          isConnect ? '' : 'hover:border-[#6E62EE]'
        }`}
      >
        {isConnect ? (
          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>Connect Wallet</Space>
            </a>
          </Dropdown>
        ) : (
          <>Connect Wallet</>
        )}
      </Button>
    </>
  );
};

export default memo(Wallet);
