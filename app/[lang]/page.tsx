'use client';
import React, { memo, useEffect } from 'react';
import Link from 'next/link';

import '@/styles/home.css';
import img0 from '@/assets/homeImg/img_0.png';
import img1 from '@/assets/homeImg/img_1.png';
import img2 from '@/assets/homeImg/img_2.png';
import img3 from '@/assets/homeImg/img_3.png';
import img4 from '@/assets/homeImg/img_4.png';
import img5 from '@/assets/homeImg/img_5.png';
import img6 from '@/assets/homeImg/img_6.png';
import img7 from '@/assets/homeImg/img_7.png';
import img8 from '@/assets/homeImg/img_8.png';
import img9 from '@/assets/homeImg/img_9.png';

import styles from './index.module.css';
import { url } from 'inspector';
import { redirect } from 'next/navigation';

const Home = memo((props: any) => {
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
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.group} >
          <img src={img9.src} alt="" />
          <span className={styles.eventRules}>Event Rules</span>
          <span className={styles.desc}>由概要、内容要求、输出格式三部分</span>
        </div>
        <img className={styles.item} src={img0.src} alt="" />
        <div className={styles.empty} />
          <Link className={styles.info} href='/home'>👀 View previous event articles</Link>
         
        <div className={styles.group1}>
          <span className={styles.wantRegister}>📣 I want to register</span>
          <img className={styles.iconRight} src={img1.src} alt=''/>
        </div>
        <span className={styles.info1}>Cognitive <br/>Locust Program</span>
        <img className={styles.banner} src={img2.src} />
        <img className={styles.picture} src={img3.src} />
        <div className={styles.header}>
          <div className={styles.view}>
            <img className={styles.iconPiece} src={img4.src} />
            <span className={styles.locusts}>Locusts</span>
          </div>
          <div className={styles.connetWalletWrapper}>
            <span className={styles.connetWallet}>Connet Wallet</span>
          </div>
        </div>
        <img className={styles.cover} src={img5.src} />
        <div className={styles.body}>
          <img className={styles.product} src={img6.src} />
          <div className={styles.outlineWrapper}>
            <span className={styles.outline}>Outline</span>
          </div>
          <span className={styles.points}>1.Points</span>
          <span className={styles.mechanismPrev}>
            Each piece of content will be rewarded with 2 points (to be viewed
            when the BuidlerDAO economic model is released)
          </span>
          <span className={styles.mechanism}>2.Mechanism</span>
          <span className={styles.article}>
            Adopt betting + POW mining, locust members pledge 100 RMB per month,
            bet on 12 pieces of quality content to complete, monthly settlement
            punch card, the winner according to the POW division Pool.-Pool: The
            accumulated amount of all bets failed Locust & BuidlerDAO extra
            incentive 200 RMB/month
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
          <img className={styles.item1} src={img7.src} />
          <div className={styles.contentRequirementsWrapper}>
            <span className={styles.contentRequirements}>
              Content requirements
            </span>
          </div>
          <span className={styles.quantity}>1.Quantity</span>
          <span className={styles.qualityPrev}>
            At least 3 articles per week and at least 12 articles per month;
          </span>
          <span className={styles.quality}>2.Quality</span>
          <span className={styles.auditPrev}>
            invalidate the number of consecutive posts at the end of the month;
            prohibit copy and paste without thinking;
          </span>
          <span className={styles.audit}>3.Audit</span>
          <span className={styles.summary}>
            no complaints will be accepted for the time being if the content
            quality is not up to par/plagiarized;
          </span>
        </div>
        <div className={styles.footer}>
          <img className={styles.product1} src={img8.src} />
          <div className={styles.outputFormatWrapper}>
            <span className={styles.outputFormat}>Output format</span>
          </div>
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
  );
});

export default Home;
