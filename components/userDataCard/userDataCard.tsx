import React from 'react';
import '@/styles/font.css';
import { DollarCircleOutlined } from '@ant-design/icons';
import { DollarIcon } from '../icons';

const UserDataCard = () => {
  return (
    <div
      className={`relative left-[5vw] mt-6 flex h-[113px] w-full items-start`}
    >
      {/* Awarded */}
      <div className="relative flex h-28 w-[21vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(227,245,255,1)]">
        <span className="absolute left-6 top-6 h-auto text-left font-semibold leading-5 text-[rgba(28,28,28,1)]">
          <span>Awarded</span>
        </span>
        <span className="absolute left-6 top-14 h-auto text-left leading-9 text-[rgba(28,28,28,1)]">
          <span className="text-2xl font-semibold">100 U</span>
        </span>
        <span className=" absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarCircleOutlined style={{ fontSize: '125%', color: 'black' }} />
        </span>
      </div>
      {/* Points Earned */}
      <div className=" relative ml-5 flex h-28 w-[23vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(229,236,246,1)]">
        <span className="absolute left-6 top-6 h-auto text-left font-semibold leading-5 text-[rgba(28,28,28,1)]">
          <span>Points Earned</span>
        </span>
        <span className="absolute left-6 top-14 h-auto text-left leading-9 text-[rgba(28,28,28,1)]">
          <span className="text-2xl font-semibold">100</span>
        </span>
        <span className="absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarIcon />
        </span>
      </div>
      {/* Pending bonuses */}
      <div className="relative ml-5 flex h-28 w-[23vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(227,245,255,1)]">
        <span className="absolute left-6 top-6 h-auto text-left font-semibold leading-5 text-[rgba(28,28,28,1)]">
          <span>Pending bonuses</span>
        </span>
        <span className="absolute left-6 top-14 h-auto text-left leading-9 text-[rgba(28,28,28,1)]">
          <span className="text-2xl font-semibold">20 U</span>
        </span>
        <span className="absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarCircleOutlined style={{ fontSize: '125%', color: 'black' }} />
        </span>
        <div className="absolute right-[2vw] top-14 flex w-[81px] items-start gap-2 rounded-[44px] bg-[linear-gradient(_180deg,rgba(110,98,238,1)_2%,rgba(63,61,250,1)_100%_)] px-6 py-2">
          <span className="text component3-text12 h-auto text-left text-xs font-medium leading-3 text-white no-underline">
            <button>Claim</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDataCard;
