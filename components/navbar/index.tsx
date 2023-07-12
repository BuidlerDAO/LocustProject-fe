'use client';

import LogoIconTop from '@/components/icons/logoIconTop';
import { WalletConnect } from '@/components/wallet';
import { usePathname } from 'next/navigation';
import { AutoComplete, ConfigProvider, Input, SelectProps } from 'antd';
import { SearchIcon } from '@/components/icons/search';
import Link from 'next/link';
import { useSearchStore, useUserStore } from '@/store';
import { useEffect, useState } from 'react';
import './index.css';
import { apiGetPostData, apiGetSearchData } from '@/apis/post';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const path = usePathname();
  const flag = path === '/zh-CN' || path === '/en';
  const { isSignUp, setIsLogin } = useUserStore();
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const [searchQuery, setSearchQuery] = useState('');

  //使用zustand创建optionsStore,实现实时更新options
  //const options = useSearchStore((state) => state.searchValue.options);
  //const setOptions = useSearchStore((state) => state.setOptions);

  const setSearchValue = useSearchStore((state) => state.setSearchValue);
  const searchResult = async (query: string) => {
    const res = await apiGetSearchData(query);
    const items = res.items;
    const result = items.map((item: any, idx: any) => {
      const category = `${item.id}`;
      const newData = {
        id: item.id,
        title: item.title,
        link: item.link,
        originalText: item.body,
        personalThoughts: item.thought,
        time: item.createdAt,
        avatar: item.creator.avatar,
        username: item.creator.name,
        twitter: item.creator.twitterUsername
      };
      console.log(` Found ${query} on ${item.title}`);
      return {
        id: `item-${item.id}-${idx}`,
        value: category,
        label: (
          <Link href={`/home/search/`} key={`item-${item.id}-${idx}`}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
              onClick={() => setSearchValue(newData)}
            >
              <span>
                Found ${query} on {item.title}
              </span>
            </div>
          </Link>
        )
      };
    });
    return result;
  };

  // useEffect if query is changed

  // useEffect(() => {
  //   if (searchQuery.trim() === '') {
  //     setOptions([]);
  //     return;
  //   }
  //   handleSearch(searchQuery);
  // }, [searchQuery]);

  const handleSearch = async (value: string) => {
    setOptions([]);
    if (value.trim() === '') {
      return;
    }
    setSearchQuery(value);
    const result = value ? await searchResult(value) : [];
    setOptions(result);
  };

  return (
    <>
      <div
        className={`absolute right-0 top-0 z-50 float-right flex h-[100px] flex-wrap items-center bg-[#04070B] px-8 py-2 lg:px-10 lg:py-4 ${
          !flag && 'custom-width left-[288px] border-b-[1px] border-b-lineGrey'
        } ${flag && 'left-0 w-full'}`}
      >
        <div className="text-blue-gray-900 dark:text-blue-gray-100 flex w-full items-center">
          {/*logo*/}
          <div className="absolute left-[40px] top-[32px]">
            {flag ? (
              <div
                className="z-100 flex h-[36px] cursor-pointer items-center"
                onClick={() => router.push('/home')}
              >
                <LogoIconTop />
              </div>
            ) : null}
          </div>
          {/*搜索框 & sign up 是否出现 */}
          {flag ? (
            <>
              <div className="ml-[10vw] flex h-[36px] grow"></div>
            </>
          ) : (
            <div className="flex w-full justify-between">
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
                  // onSelect={handleSearch}
                  // onSearch={handleSearch}
                  onChange={handleSearch}
                  popupClassName="ant-auto-complete-dropdown"
                  style={{
                    backgroundColor: '#1f1f1f',
                    borderColor: 'rgba(255, 255, 255, 0.16)'
                  }}
                  className="flex h-[52px] w-full min-w-[300px] max-w-md rounded-full border-[1px] border-solid bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
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
                <div className="m-auto grow"></div>
              ) : (
                <div className="relative right-[3.7vw] my-auto ml-auto whitespace-nowrap font-medium text-white hover:text-[#6E62EE]">
                  <Link
                    href="/"
                    style={{ fontFamily: 'Poppins', fontWeight: '500' }}
                  >
                    Sign Up for Locust
                  </Link>
                </div>
              )}
            </div>
          )}
          {/*WalletConnect*/}
          <div
            className={`${flag ? 'ml-[19vw]' : ''} flex items-center self-end`}
          >
            {/*<Wallet />*/}
            <WalletConnect />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
