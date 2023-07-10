'use client';
import React, { use, useEffect, useState } from 'react';

import Logo from '../icons/logo';
import { AppstoreOutlined, RiseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSiderStore, useUserStore } from '@/store';
import toast from '../toast/toast';
import { LogoIconTop } from '../icons';
import { SideData } from '../icons/sideData';
import { SideExplore } from '../icons/sideExplore';
import { apiFinishCampaign } from '@/apis/Campaign';
import './index.css';

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
  //console.log(isAdmin);
  const pathname = usePathname();
  const flag = pathname == '/zh-CN' || pathname == '/en';
  const onJudge = () => {
    //console.log('click');
    if (!isLogin) {
      toast.error('Please login first');
      return;
    } else {
      if (!isSignUp) {
        toast.error(
          'Error! You cannot post without signing up for the activity first.'
        );
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
      <div className={`side-menu-side-menu ${props.rootClassName}`}>
        {/* logo部分 */}
        <div className="width-[18rem] ml-[30px] flex h-[100px] items-center justify-center">
          <div
            className={`mr-[-5px] mt-[-18px] h-[36px] cursor-pointer
                            ${!flag && 'mr-[6px] mt-[0.2px]'}
            } `}
            onClick={() => window.location.reload()}
          >
            <LogoIconTop />
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
                    <AppstoreOutlined
                      style={{
                        fontSize: '125%'
                      }}
                    />
                  </span>
                  <span className="side-menu-text">
                    <span style={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                      Explore
                    </span>
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
            <div
              // data view 按钮,根据isAdmin判断有无

              className="side-menu-frame"
              onClick={() => {
                setIsExplore(false);
                setIsDataView(true);
                setIsPost(false);
              }}
              style={{
                display: isAdmin ? 'block' : 'none',
                color: isDataView ? 'rgba(109, 98, 238, 1)' : ''
              }}
            >
              <Link href="/home/dataV">
                <div className="side-menu-frame1021">
                  <RiseOutlined
                    style={{
                      fontSize: '125%'
                    }}
                  />
                  <span className="side-menu-text2">
                    <span style={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                      Data View
                    </span>
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
            {/* <div
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
              <Link
                href="/home/participate"
                style={{
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '21px'
                }}
                className="ml-[32px] font-medium"
              >
                Event Participation
              </Link>
              <div
                className="side-menu-rectangle1"
                style={{
                  backgroundColor: isDataView ? 'rgba(109, 98, 238, 1)' : ''
                }}
              />
            </div> */}
            {/* data view 按钮,根据isAdmin判断有无 */}
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
                <span style={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                  New Post
                </span>
              </span>
            </div>
          </div>
          {/* {isAdmin ? (
            <div
              className="side-menu-btn"
              onClick={() => {
                console.log();
              }}
            >
              <div
                className="side-menu-frame10211"
                onClick={() => {
                  console.log();
                }}
              >
                <span className="side-menu-text4">
                  <span style={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                    结束并创建
                  </span>
                </span>
              </div>
            </div>
          ) : (
            ''
          )} */}
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
