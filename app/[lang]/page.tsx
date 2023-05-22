'use client';
import React, { memo, useCallback, useEffect, useState } from 'react';

import '@/styles/home.css';

import decorate from '@/assets/homeSvg/decorate.svg';
import img from '@/assets/homeSvg/img.svg';
import bg from '@/assets/homeSvg/bg.svg';

import styles from './index.module.css';
import { url } from 'inspector';
import { Button } from '@/components/button';
import Toast from '@/components/toast/toast';
import Link from 'next/link';
import { getCurrentTime } from '@/utils/time';
import Modalprop from '@/components/modal/modal';
import ArrowRight from '@/components/icons/arrowRight';
import Ellipse from '@/components/icons/ellipse';
import Image from 'next/image';
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
      <div className={styles.page}>
        <Modalprop
          ModalMaxWidth={360}
          BodyMaxWidth={360}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          locate="home"
        />
        <div className={styles.wrapper}>
          <div className={styles.group}>
            <Image src={bg} alt="" />
            <span className={styles.eventRules}>Event Rules</span>
            <span className={styles.desc}>
              由概要、内容要求、输出格式三部分
            </span>
          </div>
          <div className={styles.empty} />
          <Button
            className={`${styles.group1} z-[9] mr-2 whitespace-pre text-[1.13rem] font-medium leading-[1.13rem]`}
            onClick={onJudge}
          >
            I want to register
            <div
              className={`${styles.iconRight}`}
              style={{ marginLeft: '0.5rem' }}
            >
              <ArrowRight />
            </div>
          </Button>
          <Link href="/home">
            <Button
              className={`${styles.group2}  z-[9] mr-2 whitespace-pre text-[1.13rem] font-medium leading-[1.13rem]`}
            >
              Past event articles
              <div
                className={`${styles.iconRight}`}
                style={{ marginLeft: '0.5rem' }}
              >
                <ArrowRight />
              </div>
            </Button>
          </Link>
          <span className={styles.info1}>
            Cognitive <br />
            Locust Program
          </span>
          <Image className={styles.banner} src={img} alt="" />
          <Image className={styles.cover} src={decorate} alt="" />
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
          <div className={styles.body}>
            <div className={styles.product}>
              <Ellipse />
            </div>
            <Button className={styles.outlineWrapper} color="secondary">
              Outline
            </Button>
            <span className={styles.points}>1.Points</span>
            <span className={styles.mechanismPrev}>
              Each piece of content will be rewarded with 2 points (to be viewed
              when the BuidlerDAO economic model is released)
            </span>
            <span className={styles.mechanism}>2.Mechanism</span>
            <span className={styles.article}>
              Adopt betting + POW mining, locust members pledge 100 RMB per
              month, bet on 12 pieces of quality content to complete, monthly
              settlement punch card, the winner according to the POW division
              Pool.-Pool: The accumulated amount of all bets failed Locust &
              BuidlerDAO extra incentive 200 RMB/month
            </span>
            <span className={styles.info2}>
              Bug 1:9 / Betting failure Deduct 100
            </span>
            <span className={styles.info3}>
              Bug 2:8 / Betting failure Deduct 100
            </span>
            <span className={styles.title}>
              Bug 3:16 / Betting success Retained 100.Additional 16-12=4;
              (4/6)*200=133.3 reward
            </span>
            <span className={styles.title1}>
              Bug 4:14 / Betting success Keep 100, get 14-12=2 extra;
              (2/6)*200=66.7 reward
            </span>
          </div>
          <div className={styles.main}>
            <div className={styles.item1}>
              <Ellipse />
            </div>
            <Button
              className={styles.contentRequirementsWrapper}
              color="secondary"
            >
              Content requirements
            </Button>
            <span className={styles.quantity}>1.Quantity</span>
            <span className={styles.qualityPrev}>
              At least 3 articles per week and at least 12 articles per month;
            </span>
            <span className={styles.quality}>2.Quality</span>
            <span className={styles.auditPrev}>
              invalidate the number of consecutive posts at the end of the
              month; prohibit copy and paste without thinking;
            </span>
            <span className={styles.audit}>3.Audit</span>
            <span className={styles.summary}>
              no complaints will be accepted for the time being if the content
              quality is not up to par/plagiarized;
            </span>
          </div>
          <div className={styles.footer}>
            <div className={styles.product1}>
              <Ellipse />
            </div>
            <Button className={styles.outputFormatWrapper} color="secondary">
              Output format
            </Button>
            <span className={styles.output}>1.Output by</span>
            <span className={styles.subject}>Subject</span>
            <span className={styles.output1}>Output by</span>
            <span className={styles.personalReflectionsPrev}>
              Core Content Introduction
            </span>
            <span className={styles.personalReflections}>
              Personal Reflections
            </span>
            <span className={styles.relatedLinks}>Related Links</span>
          </div>
        </div>
      </div>
    </>
  );
});

Index.displayName = 'Index';

export default Index;
