'use client';

import { Typography } from '@/components/typography';
import LogoIconTop from '@/components/icons/logoIconTop';
import Logo from '@/components/icons/logo';
import { WalletConnect } from '@/components/wallet';
import { usePathname } from 'next/navigation';
import { Dropdown, Input, MenuProps, Space } from 'antd';
import { SearchIcon } from '@/components/icons/search';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
import { useLoginStore } from '@/store';
import { Button } from '../button';

const Navbar = () => {
  const path = usePathname();
  const flag = path == '/zh-CN' || path == '/en';
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href="/home/profile">My Profile</Link>
    },
    {
      key: '2',
      label: <Link href="/home/profile">Event Participation</Link>
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Disconnect
        </a>
      )
    }
  ];
  const { isLoggedIn } = useLoginStore();

  return (
    <div
      className={`relative z-50 flex h-[100px] w-full flex-wrap items-center bg-black`}
    >
      <div className="sticky inset-0 z-10 flex h-full w-full max-w-full items-center px-8 py-2 lg:px-10 lg:py-4">
        <div className="text-blue-gray-900 dark:text-blue-gray-100 flex w-full items-center justify-between">
          <div className="flex items-center justify-center">
            {/*首页logo只有上半部分*/}
            <div
              className={`mr-[-5px] mt-[-18px]
                            ${!flag && 'mr-[6px] mt-[0.2px]'}
            } `}
            >
              {flag ? <LogoIconTop /> : <Logo />}
            </div>
            <Typography
              variant="h1"
              className="ml-1  py-1.5 text-[30px] leading-[30px] dark:text-white"
            >
              Locusts
            </Typography>
          </div>
          {/*搜索框 & sign up 是否出现 */}
          {flag ? null : (
            <>
              {/*搜索框*/}
              <Input
                size="large"
                placeholder="Search"
                prefix={<SearchIcon />}
                onPressEnter={() => {
                  return null;
                }}
                style={{
                  backgroundColor: '#1f1f1f',
                  borderColor: 'rgba(255, 255, 255, 0.16)'
                }}
                className="absolute left-[18rem] flex h-[52px] w-[448px] items-center rounded-full border-[1px] border-solid bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
              />
              {/*Sign up for Locust*/}
              {isLoggedIn ? null : (
                <div className="ml-[45rem] flex text-white absolute">
                  <Link href="/">Sign up for Locust</Link>
                </div>
              )}
            </>
          )}
          {/*WalletConnect*/}
          <div>
            {isLoggedIn ? (
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()} className="text-white">
                  <Button
                    color="primary"
                    className="text-[16px] hover:border-[#6E62EE] px-10 py-2 outline-none border:none"
                  >
                    <Space>
                      Hover me
                      <DownOutlined />
                    </Space>
                  </Button>
                </a>
              </Dropdown>
            ) : (
              <WalletConnect />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
