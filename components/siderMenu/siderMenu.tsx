'use client';
import React, { use, useEffect, useState } from 'react';

import Logo from '../icons/logo';
import { AppstoreOutlined, RiseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSiderStore, useUserStore } from '@/store';
import toast from '../toast/toast';
import { LogoIconTop } from '../icons';

const SideMenu = (props: any) => {
  const router = useRouter();
  const {
    isExplore,
    setIsExplore,
    isDataView,
    setIsDataView,
    isPost,
    setIsPost
  } = useSiderStore();
  const { isAdmin, isLogin, isSignUp } = useUserStore();
  const pathname = usePathname();
  const flag = pathname == '/zh-CN' || pathname == '/en';
  const onJudge = () => {
    console.log('click');
    if (!isLogin) {
      toast.error('Please login first');
      return;
    } else {
      if (!isSignUp) {
        toast.error('Please sign up first');
        return;
      } else {
        router.push('/home/post');
      }
    }
  };
  useEffect(() => {
    console.log(pathname);
    if (pathname === '/en/home' || pathname === '/zh-CN/home') {
      setIsExplore(true);
      setIsDataView(false);
      setIsPost(false);
    } else if (
      pathname === '/en/home/dataV' ||
      pathname === '/zh-CN/home/dataV'
    ) {
      setIsExplore(false);
      setIsDataView(true);
      setIsPost(false);
    } else if (
      pathname === '/en/home/post' ||
      pathname === '/zh-CN/home/post'
    ) {
      setIsExplore(false);
      setIsDataView(false);
      setIsPost(true);
    }
  }, [pathname]);
  return (
    <>
      {/* <div
          style={{ borderColor: '#000' }}
          className={`${'relative bottom-[1px]  w-[18.9vw] border-t-[14px] z-[-1]'}`}
        ></div> */}
      <div className={`side-menu-side-menu ${props.rootClassName}`}>
        {/* logo部分 */}
        <div className="width-[18rem] ml-[30px] flex h-[100px] items-center justify-center">
          <div
            className={`mr-[-5px] mt-[-18px]
                            ${!flag && 'mr-[6px] mt-[0.2px]'}
            } `}
          >
            {flag ? <LogoIconTop /> : <Logo />}
          </div>
        </div>
        <div className="side-menu-frame1171274769 ">
          <div className="side-menu-menu">
            {/* explore 按钮 */}
            <div
              className="side-menu-frame1029"
              onClick={() => {
                setIsExplore(true);
                setIsDataView(false);
                setIsPost(false);
              }}
              style={{ color: isExplore ? 'rgba(109, 98, 238, 1)' : '' }}
            >
              <Link href="/home/">
                <div className="side-menu-frame1013">
                  <span>
                    <AppstoreOutlined />
                  </span>
                  <span className="side-menu-text">
                    <span>Explore</span>
                  </span>
                </div>
              </Link>
              <div
                className="side-menu-rectangle1"
                style={{
                  backgroundColor: isExplore ? 'rgba(109, 98, 238, 1)' : ''
                }}
              />
            </div>
            {/* data view 按钮,根据isAdmin判断有无 */}
            {isAdmin ? (
              <div
                className="side-menu-frame"
                onClick={() => {
                  setIsExplore(false);
                  setIsDataView(true);
                  setIsPost(false);
                }}
                style={{
                  color: isDataView ? 'rgba(109, 98, 238, 1)' : ''
                }}
              >
                <Link href="/home/dataV">
                  <div className="side-menu-frame1021">
                    <RiseOutlined />
                    <span className="side-menu-text2">
                      <span>Data View</span>
                    </span>
                  </div>
                </Link>
                <div
                  className="side-menu-rectangle1"
                  style={{
                    backgroundColor: isDataView ? 'rgba(109, 98, 238, 1)' : ''
                  }}
                />
              </div>
            ) : null}
          </div>
          {/* <Link href="/home/post"> */}
          {/* post按钮，封装了onjudge函数  */}
          <div
            className="side-menu-btn"
            onClick={() => {
              setIsExplore(false);
              setIsDataView(false);
              setIsPost(true);
              onJudge;
            }}
          >
            <div
              className="side-menu-frame10211"
              onClick={() => {
                setIsExplore(true);
                setIsDataView(false);
                setIsPost(false);
                onJudge();
              }}
            >
              <span className="side-menu-text4">
                <span>New Post</span>
              </span>
            </div>
          </div>
          {/* </Link> */}
        </div>
      </div>
      <style jsx>
        {`
          .side-menu-side-menu {
            width: 18rem;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            background-color: #000000;
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: #262626;
          }
          .side-menu-frame1171274769 {
            height: 100%;
            top: 100px;
            gap: 24px;
            left: 0px;
            width: 100%;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-direction: column;
          }
          .side-menu-menu {
            gap: 14px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .side-menu-frame1029 {
            width: 18rem;
            height: 52px;
            display: flex;
            position: relative;
            transition: 0.3s;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .side-menu-frame1029:hover {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
          }
          .side-menu-frame1013 {
            gap: 16px;
            top: 12px;
            left: 30px;
            width: 105px;
            display: flex;
            position: absolute;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .side-menu-category {
            width: 24px;
            height: 24px;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .side-menu-category1 {
            top: 0px;
            left: 0px;
            width: 24px;
            height: 24px;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 1;
          }
          .side-menu-vector {
            top: 2px;
            left: 2px;
            width: 8px;
            height: 8px;
            position: absolute;
          }
          .side-menu-vector1 {
            top: 2px;
            left: 14px;
            width: 8px;
            height: 8px;
            position: absolute;
          }
          .side-menu-vector2 {
            top: 14px;
            left: 14px;
            width: 8px;
            height: 8px;
            position: absolute;
          }
          .side-menu-vector3 {
            top: 14px;
            left: 2px;
            width: 8px;
            height: 8px;
            position: absolute;
          }
          .side-menu-text {
            height: auto;
            font-size: 18px;
            font-style: Medium;
            text-align: left;
            font-family: Poppins;
            font-weight: 500;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .side-menu-rectangle1 {
            top: 16px;
            left: 0px;
            width: 4px;
            height: 18px;
            position: absolute;
            border-radius: 3px;
          }
          .side-menu-frame {
            gap: 4px;
            width: 18rem;
            height: 52px;
            display: flex;
            padding: 4px 8px 4px 0;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            border-radius: 8px;
          }
          .side-menu-frame:hover {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
          }
          .side-menu-frame1021 {
            gap: 16px;
            top: 12px;
            left: 30px;
            width: 133px;
            display: flex;
            position: absolute;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .side-menu-frame1 {
            width: 24px;
            height: 24px;
          }
          .side-menu-text2 {
            height: auto;
            font-size: 18px;
            font-style: Medium;
            text-align: left;
            font-family: Poppins;
            font-weight: 500;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .side-menu-btn {
            gap: 4px;
            width: 100%;
            height: 52px;
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
            left: 1.5rem;
            width: 14.375rem;
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
            background: linear-gradient(180deg, #8377ff -67.27%, #504ef0 100%);
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
          .side-menu-logo {
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100px;
            display: flex;
            overflow: hidden;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .side-menu-logo1 {
            gap: 12px;
            top: 29px;
            left: 30px;
            width: 172px;
            display: flex;
            position: absolute;
            align-items: center;
            flex-shrink: 0;
          }
          .side-menu-logo2 {
            width: 18px;
            height: 34px;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 1;
          }
          .side-menu-vector4 {
            top: 0px;
            left: -0.000003814697265625px;
            width: 18px;
            height: 14px;
            position: absolute;
          }
          .side-menu-vector5 {
            top: 34px;
            left: -0.000003814697265625px;
            width: 18px;
            height: 14px;
            position: absolute;
          }
          .side-menu-text6 {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 34px;
            font-style: Bold;
            text-align: left;
            font-family: Helvetica Neue;
            font-weight: 700;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .side-menu-root-class-name {
            top: 0px;
            left: 0px;
            position: absolute;
          }
        `}
      </style>
    </>
  );
};

export default SideMenu;
