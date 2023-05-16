import React from 'react';

import PropTypes from 'prop-types';

const UserDataCard = () => {
  return (
    <>
      <div className={`component3-container `}>
        <div className="component3-frame">
          <span className="component3-text 14Semibold3">
            <span>Awarded</span>
          </span>
          <span className="component3-text02 H24">
            <span>100 U</span>
          </span>
          <img
            src={props.CurrencyCircleDollar_src}
            alt={props.CurrencyCircleDollar_alt}
            className="component3-currency-circle-dollar"
          />
        </div>
        <div className="component3-frame1">
          <span className="component3-text04 14Semibold12">
            <span>Points Earned</span>
          </span>
          <span className="component3-text06 H24">
            <span>100</span>
          </span>
          <img
            src={props.CurrencyCircleDollar_src1}
            alt={props.CurrencyCircleDollar_alt1}
            className="component3-currency-circle-dollar1"
          />
        </div>
        <div className="component3-frame2">
          <span className="component3-text08 14Semibold12">
            <span>Pending bonuses</span>
          </span>
          <span className="component3-text10 H24">
            <span>20 U</span>
          </span>
          <img
            src={props.CurrencyCircleDollar_src2}
            alt={props.CurrencyCircleDollar_alt2}
            className="component3-currency-circle-dollar2"
          />
          <div className="component3-frame15065">
            <span className="component3-text12">
              <span>Claim</span>
            </span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .component3-container {
            width: 1060px;
            height: 113px;
            display: flex;
            position: relative;
            align-items: flex-start;
          }
          .component3-frame {
            top: 0px;
            left: 0px;
            width: 328px;
            height: 112px;
            display: flex;
            overflow: hidden;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
            border-radius: 16px;
            background-color: rgba(227, 245, 255, 1);
          }
          .component3-text {
            top: 24px;
            left: 24px;
            color: rgba(28, 28, 28, 1);
            height: auto;
            position: absolute;
            text-align: left;
            line-height: 20px;
          }
          .component3-text02 {
            top: 52px;
            left: 24px;
            color: rgba(28, 28, 28, 1);
            height: auto;
            position: absolute;
            text-align: left;
            line-height: 36px;
          }
          .component3-currency-circle-dollar {
            top: 22px;
            left: 280px;
            width: 24px;
            height: 24px;
            position: absolute;
          }
          .component3-frame1 {
            top: 1px;
            left: 366px;
            width: 328px;
            height: 112px;
            display: flex;
            overflow: hidden;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
            border-radius: 16px;
            background-color: rgba(229, 236, 246, 1);
          }
          .component3-text04 {
            top: 24px;
            left: 24px;
            color: rgba(28, 28, 28, 1);
            height: auto;
            position: absolute;
            text-align: left;
            line-height: 20px;
          }
          .component3-text06 {
            top: 52px;
            left: 24px;
            color: rgba(28, 28, 28, 1);
            height: auto;
            position: absolute;
            text-align: left;
            line-height: 36px;
          }
          .component3-currency-circle-dollar1 {
            top: 22px;
            left: 280px;
            width: 24px;
            height: 24px;
            position: absolute;
          }
          .component3-frame2 {
            top: 1px;
            right: 0px;
            width: 328px;
            height: 112px;
            display: flex;
            overflow: hidden;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
            border-radius: 16px;
            background-color: rgba(227, 245, 255, 1);
          }
          .component3-text08 {
            top: 24px;
            left: 24px;
            color: rgba(28, 28, 28, 1);
            height: auto;
            position: absolute;
            text-align: left;
            line-height: 20px;
          }
          .component3-text10 {
            top: 56px;
            left: 24px;
            color: rgba(28, 28, 28, 1);
            height: auto;
            position: absolute;
            text-align: left;
            line-height: 36px;
          }
          .component3-currency-circle-dollar2 {
            top: 22px;
            left: 280px;
            width: 24px;
            height: 24px;
            position: absolute;
          }
          .component3-frame15065 {
            gap: 8px;
            top: 60px;
            left: 223px;
            width: 81px;
            display: flex;
            padding: 8px 24px;
            position: absolute;
            align-items: flex-start;
            border-radius: 44px;
            background-image: linear-gradient(
              180deg,
              rgba(110, 98, 238, 1) 2%,
              rgba(63, 61, 250, 1) 100%
            );
          }
          .component3-text12 {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 12px;
            font-style: Medium;
            text-align: left;
            font-family: Inter;
            font-weight: 500;
            line-height: 12px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component3-root-class-name {
            top: 137px;
            left: 340px;
            position: absolute;
          }
        `}
      </style>
    </>
  );
};

export default UserDataCard;
