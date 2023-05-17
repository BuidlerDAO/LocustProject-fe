'use client';

import { Typography } from '@/components/typography';
import LogoIconTop from '@/components/icons/logoIconTop';
import Logo from '@/components/icons/logo';
import { WalletConnect } from '@/components/wallet';
import { usePathname } from 'next/navigation';
import { AutoComplete, ConfigProvider, Dropdown, Input, MenuProps, SelectProps, Space } from 'antd';
import { SearchIcon } from '@/components/icons/search';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
import { useLoginStore } from '@/store';
import { Button } from '../button';
import { useState } from 'react';

const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        )
      };
    });
    
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
      label: <Link href="/home/participate">Event Participation</Link>
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

   const [options, setOptions] = useState<SelectProps<object>['options']>([]);

   const handleSearch = (value: string) => {
     setOptions(value ? searchResult(value) : []);
   };

   const onSelect = (value: string) => {
     console.log('onSelect', value);
   };
  return (
    <div
      className={`relative z-50 flex h-[100px] w-full flex-wrap items-center bg-black`}
    >
      <div className="sticky inset-0 z-10 flex h-full w-full max-w-full items-center px-8 py-2 lg:px-10 lg:py-4">
        <div className="text-blue-gray-900 dark:text-blue-gray-100 flex w-full items-center">
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
          {flag ? (
            <>
              <div className="flex h-[52px] w-[50vw] ml-[10vw]"></div>
            </>
          ) : (
            <>
              {/*搜索框*/}
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
                <AutoComplete
                  options={options}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                  style={{
                    backgroundColor: '#1f1f1f',
                    borderColor: 'rgba(255, 255, 255, 0.16)'
                  }}
                  className="flex h-[52px] w-[30vw] ml-[12vw] rounded-full border-[1px] border-solid bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
                >
                  <Input
                    size="large"
                    placeholder="Search"
                    prefix={<SearchIcon />}
                    onPressEnter={() => {
                      return null;
                    }}
                    bordered={false}
                    className="flex h-[52px] w-full items-center rounded-full"
                  />
                </AutoComplete>
              </ConfigProvider>
              {/*Sign up for Locust*/}
              {isLoggedIn ? null : (
                <div className="ml-[5vw] flex text-white ">
                  <Link href="/">Sign up for Locust</Link>
                </div>
              )}
            </>
          )}
          {/*WalletConnect*/}
          <div>
            {isLoggedIn ? (
              <ConfigProvider
                theme={{
                  token: {
                    colorBgElevated: '#1A1A1A',
                    colorText: 'white'
                  }
                }}
              >
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()} className="text-white">
                    <div
                      color="primary"
                      className="text-[16px] hover:border-[#6E62EE] px-10 py-2 rounded-[40px]"
                      style={{ backgroundColor: '#1A1A1A' }}
                    >
                      <Space>
                        Hover me
                        <DownOutlined />
                      </Space>
                    </div>
                  </a>
                </Dropdown>
              </ConfigProvider>
            ) : (
              <span className="ml-[10vw] flex items-center">
                <WalletConnect />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
