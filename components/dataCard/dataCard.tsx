import React, { HTMLAttributes, useEffect, useState } from 'react';

import { CopyOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import toast from '../toast/toast';
import { getCookie } from '@/utils/cookie';
import './index.css';
import { apiGetCampaignInfo } from '@/apis/Campaign';

interface DataCardProps extends HTMLAttributes<HTMLElement> {
  address: string;
  balance: string;
}

const DataCard = ({ address, balance }: DataCardProps) => {
  const onCopy = () => {
    const value = address;
    navigator.clipboard
      .writeText(value)
      .then(() =>
        toast.success('Copy success', {
          duration: 4000
        })
      )
      .catch((err) => console.error('failed to copy', err));
  };

  return (
    <>
      <div className={`component2-container `}>
        <span className="component2-text">
          <span>Contracts</span>
        </span>
        <div className="flex">
          <div className="component2-frame">
            <span className="component2-frame1">
              <CopyOutlined style={{ fontSize: '150%' }} onClick={onCopy} />
            </span>
            <span className="component2-text02">
              <span>Address</span>
            </span>
            <span className="component2-text04">
              <span className="flex w-9/12">{address}</span>
            </span>
          </div>
          <div className="component2-frame2">
            <span className="component2-text06">
              <span>Balance:</span>
            </span>
            <span className="component2-text08 H2">
              <span>${balance}</span>
            </span>
            <span className="component2-currency-circle-dollar">
              <DollarCircleOutlined style={{ fontSize: '150%' }} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataCard;
