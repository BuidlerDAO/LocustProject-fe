import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Button } from '@/components/button';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import toast from '@/components/toast/toast';
import DownOutlined from '@/components/icons/downOutLined';
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
  const [isConnect, setIsconnect] = useState(true);
  return (
    <>
      <Button
        color="primary"
        className={`w-[144px] whitespace-nowrap px-10 py-2 text-[16px] font-semibold ${
          isConnect ? 'border-black bg-[#1A1A1A]' : 'hover:border-[#6E62EE]'
        }`}
      >
        {isConnect ? (
          <Dropdown menu={{ items, onClick }}>
            <a
              onClick={(e) => e.preventDefault()}
              className="flex justify-between"
            >
              <Space>0x4c....3333</Space>
              <div className="ml-[2px] mt-[8px]">
                <DownOutlined />
              </div>
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
