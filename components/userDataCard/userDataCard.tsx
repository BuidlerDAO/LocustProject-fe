import React from 'react';
import '@/styles/font.css';
import { DollarCircleOutlined } from '@ant-design/icons';

const UserDataCard = () => {
  return (
    <div
      className={`relative left-[3vw] mt-6 flex h-[113px] w-full items-start`}
    >
      {/* Awarded */}
      <div className="relative flex h-28 w-[21vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(227,245,255,1)] font-semibold">
        <span className="absolute left-6 top-6 h-auto text-left text-[14px] leading-5 text-[rgba(28,28,28,1)]">
          <span>Awarded</span>
        </span>
        <span className="absolute left-6 top-[52px] h-auto text-left text-[24px] leading-9 text-[rgba(28,28,28,1)]">
          <span>100 U</span>
        </span>
        <span className=" absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarCircleOutlined style={{ fontSize: '125%', color: 'black' }} />
        </span>
      </div>
      {/* Points Earned */}
      <div className=" relative ml-5 flex h-28 w-[23vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(229,236,246,1)] font-semibold">
        <span className="absolute left-6 top-6 h-auto text-left text-[14px] leading-5 text-[rgba(28,28,28,1)]">
          <span>Points Earned</span>
        </span>
        <span className="absolute left-6 top-[52px] h-auto text-left text-[24px] leading-9 text-[rgba(28,28,28,1)]">
          <span>100</span>
        </span>
        <span className="absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarCircleOutlined style={{ fontSize: '125%', color: 'black' }} />
        </span>
      </div>
      {/* Pending bonuses */}
      <div className="relative ml-5 flex h-28 w-[23vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(227,245,255,1)] font-semibold">
        <span className="absolute left-6 top-6 h-auto text-left text-[14px] leading-5 text-[rgba(28,28,28,1)]">
          <span>Pending bonuses</span>
        </span>
        <span className="absolute left-6 top-14 h-auto text-left text-[24px] leading-9 text-[rgba(28,28,28,1)]">
          <span>20 U</span>
        </span>
        <span className="absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarCircleOutlined style={{ fontSize: '125%', color: 'black' }} />
        </span>
        <div className="absolute right-[2vw] top-[60px] flex w-[81px] items-start gap-2 rounded-[44px] bg-[linear-gradient(_180deg,rgba(110,98,238,1)_2%,rgba(63,61,250,1)_100%_)] px-6 py-2">
          <span className="h-auto  text-left text-[12px]  font-medium leading-3 text-white no-underline">
            <span>Claim</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDataCard;
