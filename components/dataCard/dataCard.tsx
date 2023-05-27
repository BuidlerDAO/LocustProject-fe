import React, { use, useEffect } from 'react';

import { CopyOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import toast from '../toast/toast';
import { getCookie } from '@/utils/cookie';

const DataCard = (props: object) => {
  const [address, setAddress] = React.useState(''); // replace with the value you want to copy
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
  //从cookie中获取用户的地址
  useEffect(() => {
    const onAddress: string | undefined = getCookie('address');
    setAddress(onAddress || '');
  }, [setAddress]);

  useEffect(() => {
    console.log('address', address);
  }, [address]);
  return (
    <>
      <div className={`component2-container `}>
        <span className="component2-text">
          <span>Contracts</span>
        </span>
        <div className="flex">
          <div className="component2-frame">
            <span className="component2-frame1">
              <CopyOutlined style={{ fontSize: '125%' }} onClick={onCopy} />
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
              <span>$300</span>
            </span>
            <span className="component2-currency-circle-dollar">
              <DollarCircleOutlined style={{ fontSize: '125%' }} />
            </span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .component2-container {
            height: 174px;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .component2-text {
            margin-top: 0px;
            margin-left: 0px;
            color: rgba(255, 255, 255, 1);
            height: auto;

            font-size: 28px;
            font-style: Medium;
            text-align: left;
            font-family: Inter;
            font-weight: 500;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .component2-frame {
            flex-direction: column;
            margin-top: 1rem;
            margin-left: 0px;
            width: 50vw;
            height: 112px;
            display: flex;
            overflow: hidden;

            align-items: flex-start;
            flex-shrink: 0;
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-image: linear-gradient(
              142deg,
              rgba(255, 255, 255, 0.07999999821186066) 0%,
              rgba(255, 255, 255, 0) 100%
            );
          }
          .component2-text02 {
            margin-top: 24px;
            margin-left: 24px;
            color: rgba(116, 116, 116, 1);
            height: auto;
            font-size: 14px;
            font-style: Medium;
            text-align: left;
            font-family: Inter;
            font-weight: 500;
            line-height: 20px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component2-text04 {
            margin-top: 15px;
            margin-left: 24px;
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 17px;
            font-style: Medium;
            text-align: left;
            font-family: Inter;
            font-weight: 500;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
            width: 35vw;
          }
          .component2-frame1 {
            display: flex;
            width: 24px;
            height: 24px;
            margin-top: 12px;
            margin-left: 45vw;
            position: absolute;
          }
          .component2-frame2 {
            margin-top: 1rem;
            margin-left: 7rem;
            width: 15rem;
            height: 112px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: static;
            align-items: flex-start;
            flex-shrink: 0;
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-image: linear-gradient(
              142deg,
              rgba(255, 255, 255, 0.07999999821186066) 0%,
              rgba(255, 255, 255, 0) 100%
            );
          }
          .component2-text06 {
            margin-top: 24px;
            margin-left: 24px;
            color: rgba(116, 116, 116, 1);
            height: auto;
            font-size: 14px;
            font-style: Medium;
            text-align: left;
            font-family: Inter;
            font-weight: 500;
            line-height: 20px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component2-text08 {
            margin-top: 9px;
            margin-left: 24px;
            color: rgba(255, 255, 255, 1);
            height: auto;
            text-align: left;
            line-height: 36px;
          }
          .component2-currency-circle-dollar {
            margin-top: 12px;
            margin-left: 12rem;
            position: absolute;
            width: 24px;
            height: 24px;
          }
          .component2-root-class-name {
            top: 0px;
            left: 0px;
            position: absolute;
          }
          .component2-root-class-name1 {
            top: 0px;
            left: 0px;
            position: absolute;
          }
        `}
      </style>
    </>
  );
};

export default DataCard;
