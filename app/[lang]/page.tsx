'use client';
import React, { memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import '@/styles/home.css';

import decorate from '@/assets/homeSvg/decorate.svg';
import img from '@/assets/homeSvg/img.svg';
import bg from '@/assets/homeSvg/bg.svg';
import ArrowRight from '@/components/icons/arrowRight';
import Ellipse from '@/components/icons/ellipse';

import { Button } from '@/components/button';
import Toast from '@/components/toast/toast';
import Modalprop from '@/components/modal/modal';

import { getCurrentTime } from '@/utils/time';

import { useUserStore } from '@/store';

const Index = memo((props: any) => {
  const { isRegister, setIsRegister, isLogin } = useUserStore();
  const [month, daysLeft] = getCurrentTime();
  const onClickError = useCallback(() => {
    Toast.error('You have already signed up and cannot click', {
      duration: 4000
    });
  }, []);
  const onClickSuccess = useCallback(() => {
    Toast.success('Enrollment success', {
      duration: 4000
    });
  }, []);
  //一个判断函数：判断是否已经报名
  const onJudge = () => {
    if (isLogin) {
      if (isRegister) {
        onClickError();
      } else {
        if (daysLeft < 10) {
          showModal();
        } else {
          onClickSuccess();
          setIsRegister(true);
        }
      }
    } else {
      Toast.error('Please login first', {
        duration: 4000
      });
    }
  };
  const resizeListener = () => {
    // 定义设计图的尺寸
    const designSize = 1070;
    // 获取 html 元素
    const html = document.documentElement;
    // 定义窗口的宽度
    const clientW = html.clientWidth;
    const clienH = html.clientHeight;
    // html 的fontsize 大小
    const htmlRem = (clientW * 12) / designSize;
    html.style.fontSize = htmlRem + 'px';
    // console.log(clientW);
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('resize', resizeListener);
      window.dispatchEvent(new Event('resize')); // trigger resize on first mount
      return () => {
        window.removeEventListener('resize', resizeListener);
      };
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    onClickSuccess();
    setIsRegister(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        className={`page h-[120rem] max-w-[90rem] overflow-hidden bg-[#1e1e1e]`}
      >
        <Modalprop
          ModalMaxWidth={360}
          BodyMaxWidth={360}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          locate="home"
        />
        <div className="relative bottom-[108px] flex h-[200rem] w-full flex-col items-center bg-black">
          <div className="absolute top-[16.69rem] flex h-[54.06rem] w-[90rem] flex-col items-center self-center font-medium">
            <Image src={bg} alt="" />
            <span className="relative mt-[35.13rem] h-[3.19rem] max-w-[89.25rem] overflow-hidden text-ellipsis whitespace-pre text-left text-[2.13rem] leading-[3.19rem] text-white">
              Event Rules
            </span>
            <span className="relative mt-2 h-[1.69rem] max-w-[89.25rem] overflow-hidden text-ellipsis whitespace-nowrap text-left text-[1.13rem] leading-[1.69rem] text-[#d36cff]">
              由概要、内容要求、输出格式三部分
            </span>
          </div>
          <div className="absolute top-[33.31rem] h-12 w-[24.13rem] self-center" />
          <Button
            className={`group absolute left-[23.5rem] top-[38.31rem] z-[9] mr-2 flex h-[3.94rem] w-[19.44rem] items-center justify-center self-center whitespace-pre rounded-[2.88rem] border-[0.06rem] border-solid border-[rgba(51,51,53,1)] bg-black text-[1.13rem] font-medium leading-[1.13rem] before:content-['📣'] hover:border-[none] hover:bg-[#6e62ee] hover:before:invisible`}
            onClick={onJudge}
          >
            I want to register
            <div
              className="mt-[-0.13rem] block h-6 w-6 group-hover:invisible"
              style={{ marginLeft: '0.5rem' }}
            >
              <ArrowRight />
            </div>
          </Button>
          <Link href="/home">
            <Button
              className={`group absolute right-[23.5rem] top-[38.31rem] z-[9] mr-2 flex h-[3.94rem] w-[19.44rem] items-center justify-center self-center whitespace-pre rounded-[2.88rem] border-[0.06rem]  border-solid border-[rgba(51,51,53,1)] bg-black text-[1.13rem] font-medium leading-[1.13rem] before:mb-[2px] before:content-['👀'] hover:border-[none] hover:bg-[#6e62ee] hover:before:invisible`}
            >
              Past event articles
              <div
                className="mt-[-0.13rem] block h-6 w-6 group-hover:invisible"
                style={{ marginLeft: '0.5rem' }}
              >
                <ArrowRight />
              </div>
            </Button>
          </Link>
          <span className="absolute right-[18.44rem] top-[16.69rem] break-words text-center text-[6.25rem] leading-[108%] text-white">
            Cognitive <br />
            Locust Program
          </span>
          <Image
            className="absolute right-[9.13rem] top-[11.31rem] h-[32.31rem] w-[68.44rem]"
            src={img}
            alt=""
          />
          <Image
            className="relative top-48 h-[33.75rem] w-[72.44rem]"
            src={decorate}
            alt=""
          />
          {/*报名倒计时*/}
          <div
            className="z-[9] h-12 w-[1000px] items-center whitespace-nowrap bg-white
                        bg-gradient-to-b from-white via-[#fff] to-[#343434] bg-clip-text text-center
                        text-[32px] font-medium capitalize not-italic leading-[48px] tracking-[12.5px] text-transparent"
          >
            {month}月蝗虫倒计时
            <span className="bg-white bg-gradient-to-b from-white to-[#6E62EE] bg-clip-text tracking-[0px] text-transparent">
              {daysLeft}
            </span>{' '}
            天
          </div>
          <div className="relative top-[13vw] flex flex-col items-center">
            <p
              className="text-[34px] font-semibold"
              style={{ fontFamily: 'sans-serif' }}
            >
              Event Rules
            </p>
            <p className="mt-[1vw] text-[18px] text-[#D36CFF] ">
              由概要、内容要求、输出格式三部分
            </p>
          </div>
          <div className="relative mt-[13.94rem] flex h-[25.88rem] w-[73.25rem] flex-col items-start rounded-[2.88rem] border-[0.13rem] border-solid border-neutral-800 hover:border-[#6e62ee]">
            <div className="absolute left-[58vw] top-[7.2vw]">
              <Ellipse />
            </div>
            <Button
              className="relative ml-8 mt-8 box-border flex h-[2.38rem] cursor-default items-center whitespace-nowrap rounded-3xl px-6 text-xs font-medium leading-3"
              color="secondary"
            >
              Outline
            </Button>
            <span className="relative ml-8 mt-7 h-6 max-w-[69rem] overflow-hidden text-ellipsis whitespace-nowrap text-justify text-base font-medium leading-6 text-[#64c7ff]">
              1.Points
            </span>
            <span className="relative ml-8 mt-1 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis whitespace-pre text-left text-xs leading-[1.13rem] text-white">
              Each piece of content will be rewarded with 2 points (to be viewed
              when the BuidlerDAO economic model is released)
            </span>
            <span className="relative ml-8 mt-3 h-6 max-w-[69rem] overflow-hidden text-ellipsis whitespace-nowrap text-justify text-base font-medium leading-6 text-[#64c7ff]">
              2.Mechanism
            </span>
            <span className="relative ml-8 mt-1 h-9 w-[69rem] overflow-hidden text-ellipsis whitespace-normal text-left text-xs leading-9 text-white">
              Adopt betting + POW mining, locust members pledge 100 RMB per
              month, bet on 12 pieces of quality content to complete, monthly
              settlement punch card, the winner according to the POW division
              Pool.-Pool: The accumulated amount of all bets failed Locust &
              BuidlerDAO extra incentive 200 RMB/month
            </span>
            <span className="relative ml-8 mt-[1.13rem] h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis whitespace-pre text-left text-xs leading-[1.13rem] text-white">
              Bug 1:9 / Betting failure Deduct 100
            </span>
            <span className="relative ml-8 mt-3 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis whitespace-pre text-left text-xs leading-[1.13rem] text-white">
              Bug 2:8 / Betting failure Deduct 100
            </span>
            <span className="relative ml-8 mt-3 h-9 w-[18.75rem] overflow-hidden text-ellipsis whitespace-normal text-left text-xs text-white">
              Bug 3:16 / Betting success Retained 100.Additional 16-12=4;
              (4/6)*200=133.3 reward
            </span>
            <span className="relative ml-8 mt-3 h-9 w-72 overflow-hidden text-ellipsis whitespace-normal text-left text-xs text-white">
              Bug 4:14 / Betting success Keep 100, get 14-12=2 extra;
              (2/6)*200=66.7 reward
            </span>
          </div>
          <div className="relative mt-[2.13rem] flex h-[18.25rem] w-[73.25rem] flex-col items-start rounded-[2.88rem] border-[0.13rem] border-solid border-neutral-800 hover:border-[#6e62ee]">
            <div className="absolute left-[58vw] top-[-1.3vw]">
              <Ellipse />
            </div>
            <Button
              className="relative ml-8 mt-8 box-border flex h-[2.38rem] cursor-default items-center whitespace-pre rounded-3xl px-6 text-xs font-medium leading-3"
              color="secondary"
            >
              Content requirements
            </Button>
            <span className="relative ml-8 mt-7 h-6 max-w-[69rem] overflow-hidden text-ellipsis whitespace-nowrap text-justify text-base font-medium leading-6 text-[#64c7ff]">
              1.Quantity
            </span>
            <span className="relative ml-8 mt-1 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis whitespace-pre text-left text-xs leading-[1.13rem] text-white">
              At least 3 articles per week and at least 12 articles per month;
            </span>
            <span className="relative ml-8 mt-3 h-6 max-w-[69rem] overflow-hidden text-ellipsis whitespace-nowrap text-justify text-base font-medium leading-6 text-[#64c7ff]">
              2.Quality
            </span>
            <span className="mt-1; relative ml-8 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis whitespace-pre text-left text-xs leading-[1.13rem] text-white">
              invalidate the number of consecutive posts at the end of the
              month; prohibit copy and paste without thinking;
            </span>
            <span className="relative ml-8 mt-3 h-6 max-w-[69rem] overflow-hidden text-ellipsis whitespace-nowrap text-justify text-base font-medium leading-6 text-[#64c7ff]">
              3.Audit
            </span>
            <span className="relative ml-8 mt-1 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis whitespace-pre text-left text-xs leading-[1.13rem] text-white">
              no complaints will be accepted for the time being if the content
              quality is not up to par/plagiarized;
            </span>
          </div>
          <div className="relative mt-[2.13rem] flex h-[19rem] w-[73.25rem] flex-col items-start whitespace-pre rounded-[2.88rem] border-[0.13rem] border-solid border-neutral-800 leading-[1.13rem] hover:border-[#6e62ee]">
            <div className="absolute left-[58vw]">
              <Ellipse />
            </div>
            <Button
              className="rounded-3xl; relative ml-8 mt-8 box-border flex h-[2.38rem] cursor-default items-center px-6 text-xs font-medium leading-3"
              color="secondary"
            >
              Output format
            </Button>
            <span className="relative ml-8 mt-7 h-6 max-w-[69rem] overflow-hidden text-ellipsis text-justify text-base font-medium leading-6 text-[#64c7ff]">
              1.Output by
            </span>
            <span className="relative ml-8 mt-3 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis whitespace-nowrap text-left text-xs text-white">
              Subject
            </span>
            <span className="relative ml-8 mt-3 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis text-left text-xs text-white">
              Output by
            </span>
            <span className="relative ml-8 mt-3 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis text-left text-xs text-white">
              Core Content Introduction
            </span>
            <span className="relative ml-8 mt-3 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis text-left text-xs text-white">
              Personal Reflections
            </span>
            <span className="relative ml-8 mt-3 h-[1.13rem] max-w-[69rem] overflow-hidden text-ellipsis text-left text-xs text-white">
              Related Links
            </span>
          </div>
        </div>
      </div>
    </>
  );
});

Index.displayName = 'Index';

export default Index;
