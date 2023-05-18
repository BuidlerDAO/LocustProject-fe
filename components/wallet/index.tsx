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
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    )
  },
  {
    key: '3',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    )
  }
];

const Wallet: FC<MyProps> = () => {
  const [isConnect, setIsconnect] = useState(true);
  const menuStyle = {
    backgroundColor: 'red',
    color: 'white'
  };
  return (
    <>
      <Button
        color="primary"
        className={`w-[144px] whitespace-nowrap px-10 py-2 text-[16px] font-semibold ${
          isConnect ? 'border-black bg-[#1A1A1A]' : 'hover:border-[#6E62EE]'
        }`}
      >
        {isConnect ? (
          <Dropdown
            menu={{ items, onClick }}
            placement="bottom"
            overlayStyle={{
              paddingTop: '14px',
              width: '144px',
              height: '136px'
            }}
            dropdownRender={(menu) => (
              <div style={{ color: 'white' }}>
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
