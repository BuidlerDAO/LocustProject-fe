'use client';

import LogoIconTop from '@/components/icons/logoIconTop';
import { WalletConnect } from '@/components/wallet';
import { usePathname } from 'next/navigation';
import { AutoComplete, ConfigProvider, Input, SelectProps } from 'antd';
import { SearchIcon } from '@/components/icons/search';
import Link from 'next/link';
import { useSearchStore, useUserStore } from '@/store';
import { useState } from 'react';
import './index.css';
import { apiGetPostData, apiGetSearchData } from '@/apis/post';

const Navbar = () => {
  const path = usePathname();
  const flag = path === '/zh-CN' || path === '/en';
  const { isSignUp, setIsLogin } = useUserStore();
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  //const { setSearchValue, searchValue } = useSearchStore();
  const setSearchValue = useSearchStore((state) => state.setSearchValue);
  const searchResult = async (query: string) => {
    const res = await apiGetSearchData(query);
    const items = res.items;
    const result = items.map((item: any, idx: any) => {
      if (!item) {
        return {
          value: 'Not Found',
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Not Found</span>
              {/* <span>results</span> */}
            </div>
          )
        };
      }
      const category = `${item.title}`;
      const newData = {
        id: item.id,
        title: item.title,
        link: item.link,
        originalText: item.body,
        personalThoughts: item.thought,
        time: item.createdAt,
        avatar: item.avatar,
        username: item.username
      };
      return {
        value: category,
        label: (
          <Link href={`/home/search/`}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
              onClick={() => setSearchValue(newData)}
            >
              <span>
                Found {query} on {item.title}
              </span>
              {/* <span>results</span> */}
            </div>
          </Link>
        )
      };
    });
    return result;
  };

  const handleSearch = async (value: string) => {
    const result = value ? await searchResult(value) : [];
    setOptions(result);
  };

  const onSelect = (value: string) => {
    //console.log('onSelect', value);
    //const res = apiGetPostData('/api/post/search', value);
  };
  return (
    <>
      <div
        className={`absolute z-50 float-right flex h-[100px] flex-wrap items-center bg-[#04070B]
      ${
        !flag && 'custom-width left-[18rem] border-b-[1px] border-b-lineGrey'
      } ${flag && 'w-full'}`}
      >
        <div className="sticky inset-0 z-10 flex h-full  max-w-full items-center px-8 py-2 lg:px-10 lg:py-4">
          <div className="text-blue-gray-900 dark:text-blue-gray-100 flex w-full items-center">
            {/*logo*/}
            <div className="absolute left-[40px] top-[32px]">
              {flag ? (
                <div
                  className="z-100 flex h-[36px] cursor-pointer items-center"
                  onClick={() => window.location.reload()}
                >
                  <LogoIconTop />
                </div>
              ) : null}
            </div>
            {/*搜索框 & sign up 是否出现 */}
            {flag ? (
              <>
                <div className="ml-[10vw] flex h-[36px] w-[50vw]"></div>
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
                      colorIcon: '#ffffff',
                      colorTextPlaceholder: '#FFFFFF66',
                      colorPrimary: '#ffffff'
                    }
                  }}
                >
                  <AutoComplete
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    popupClassName="ant-auto-complete-dropdown"
                    style={{
                      backgroundColor: '#1f1f1f',
                      borderColor: 'rgba(255, 255, 255, 0.16)'
                    }}
                    className="flex h-[52px] w-[30vw] rounded-full border-[1px] border-solid bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
                  >
                    <Input
                      size="large"
                      placeholder="Search"
                      prefix={<SearchIcon />}
                      onPressEnter={() => {
                        return null;
                      }}
                      bordered={false}
                      className="flex h-[52px] w-fit items-center rounded-full"
                      style={{ fontFamily: 'Poppins', fontWeight: '400' }}
                    />
                  </AutoComplete>
                </ConfigProvider>
                {/*Sign up for Locust*/}
                {isSignUp ? (
                  <div className="ml-[25.2vw]"></div>
                ) : (
                  <div className="ml-[19.4vw] flex whitespace-nowrap font-medium text-white hover:text-[#6E62EE]">
                    <Link
                      href="/"
                      className="relative right-[3.7vw]"
                      style={{ fontFamily: 'Poppins', fontWeight: '500' }}
                    >
                      Sign Up for Locust
                    </Link>
                  </div>
                )}
              </>
            )}
            {/*WalletConnect*/}
            <div className={`${flag ? 'ml-[19vw]' : ''} flex items-center`}>
              {/*<Wallet />*/}
              <WalletConnect />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
