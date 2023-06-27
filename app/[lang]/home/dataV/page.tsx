'use client';
import React, { useEffect } from 'react';
import { Table1, Table2 } from '@/components/table/table';
import DataCard from '@/components/dataCard/dataCard';
import { useUserStore } from '@/store';
import { useRouter } from 'next/navigation';
import { apiConfirmCampaign } from '@/apis/post';
import { apiFinishCampaign, apiGetCampaignInfo } from '@/apis/Campaign';

const dataV = () => {
  const router = useRouter();
  const { isAdmin } = useUserStore();

  //奖金确认判断
  const onConfirmBonus = async () => {
    const res = await apiGetCampaignInfo();
    apiFinishCampaign(res.id).then(() => {
      Promise.all([apiConfirmCampaign(res.id)]).then((values: any) => {
        console.log(values);
      });
    });
  };
  //进行判断，如果是则显示，否则跳转到首页/home
  // useEffect(() => {
  //   if (!isAdmin) {
  //     router.push('/');
  //   }
  // }, [isAdmin, router]);
  return (
    <>
      <div className="ml-[1vw] mt-[2vh] flex flex-col pb-[10vh]">
        <DataCard />
        <div>
          <div
            className="mt-[1.75rem] font-medium text-white"
            style={{
              fontFamily: 'Inter',
              fontSize: '28px',
              lineHeight: '34px'
            }}
          >
            Statistics
          </div>
          <Table1 />
          <Table2 />
        </div>
        <div className="relative ml-[25vw]  mt-[80px] flex shrink-0 cursor-pointer items-center gap-1 rounded-lg">
          <div className="side-menu-frame-dataV" onClick={onConfirmBonus}>
            <span
              className="h-auto text-left text-sm font-medium leading-6 text-white no-underline"
              style={{ fontFamily: 'Inter' }}
            >
              <span>Bonus Confirmation</span>
            </span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .side-menu-frame-dataV {
            gap: 8px;
            top: 0px;
            width: auto;
            left: 20px;
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
          .side-menu-frame-dataV:hover {
            background: linear-gradient(180deg, #8377ff -67.27%, #504ef0 100%);
          }
        `}
      </style>
    </>
  );
};

export default dataV;
