/* eslint-disable prettier/prettier */
'use client';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Input } from 'antd';

const { TextArea } = Input;

const postComponent = (props: { rootClassName: any }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [material1, setMaterial1] = useState('');
  const [material2, setMaterial2] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('Title:', title);
    console.log('Time:', time);
    console.log('Material 1:', material1);
    console.log('Material 2:', material2);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`component-container ${props.rootClassName} `}>
          <div className="component-frame15062">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="+ Enter the article"
              style={{ width: '62.25rem', height: '4.125rem', border: 'none'}}
              className="w-62.25rem h-4.125rem absolute left-0 top-0 flex shrink-0 items-start rounded-lg  bg-inherit text-white"
            />
            {/* <span className="component-text">
            <span>+ Enter the article</span>
          </span> */}
            <span className="component-text02">
              <span>x/n</span>
            </span>
          </div>
          <div className="component-frame15063">
            <Input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Please enter the original link"
              style={{ width: '62.25rem', height: '4.125rem', border: 'none'}}
              className="w-62.25rem h-4.125rem absolute left-0 top-0 flex shrink-0 items-start rounded-lg  bg-inherit text-white"
            />
            {/* <span className="component-text04">
            <span>Please enter the original link</span>
          </span> */}
          </div>
          <div className="component-frame15065">
            <span className="component-text06">
              <button type="submit">Submit</button>
            </span>
          </div>
          <div className="component-frame1171274789">
            <span className="component-text08">
              <span>Original Summary</span>
            </span>
            <div className="component-frame15064">
              <TextArea
                value={material1}
                onChange={(e) => setMaterial1(e.target.value)}
                placeholder="Please enter the core content of the original text"
                style={{ width: '62.25rem', height: '16.5625rem', border: 'none'}}
              className="absolute left-0 top-0 flex items-start rounded-lg  bg-inherit text-white"
              />
              {/* <span className="component-text10">
                <span>please enter the core content of the original text</span>
              </span> */}
              <span className="component-text12">
                <span>x/n</span>
              </span>
            </div>
          </div>
          <div className="component-frame1171274790">
            <span className="component-text14">
              <span>Personal Thoughts</span>
            </span>

            <div className="component-frame15066">
              <TextArea
                value={material2}
                onChange={(e) => setMaterial2(e.target.value)}
                placeholder="Please enter Personal thoughts"
                style={{ width: '62.25rem', height: '16.5625rem', border: 'none'}}
              className=" absolute left-0 top-0 flex  items-start rounded-lg  bg-inherit text-white"
              />
              {/* <span className="component-text16">
                <span>please enter Personal thoughts</span>
              </span> */}
            </div>
          </div>
        </div>
      </form>
      <style jsx>
        {`
          .component-container {
            width: 62.25rem;
            height: 56.25rem;
            display: flex;
            position: relative;
            align-items: flex-start;
            background-color: var(--dl-color-gray-black);
          }
          .component-frame15062 {
            top: 0px;
            left: 0px;
            width: 62.25rem;
            height: 4.125rem;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: rgba(255, 255, 255, 0.05999999865889549);
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-color: rgba(255, 255, 255, 0.05999999865889549);
          }
          .component-text {
            top: 21px;
            left: 20px;
            color: rgba(255, 255, 255, 0.4000000059604645);
            height: auto;
            position: absolute;
            font-size: 16px;
            font-style: Regular;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 24px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-text02 {
            top: 26px;
            left: 60rem;
            color: rgba(89, 96, 105, 1);
            height: auto;
            position: absolute;
            font-size: 14px;
            font-style: Medium;
            text-align: right;
            font-family: Roboto;
            font-weight: 500;
            line-height: 14px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-frame15063 {
            top: 5.875rem;
            left: 0px;
            width: 62.25rem;
            height: 4.125rem;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: rgba(255, 255, 255, 0.05999999865889549);
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-color: rgba(255, 255, 255, 0.05999999865889549);
          }
          .component-text04 {
            top: 21px;
            left: 20px;
            color: rgba(255, 255, 255, 0.4000000059604645);
            height: auto;
            position: absolute;
            font-size: 16px;
            font-style: Regular;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 24px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-frame15065 {
            gap: 8px;
            left: 27.625rem;
            width: 11rem;
            bottom: 1rem;
            display: flex;
            padding: 0.75rem 4rem;
            position: absolute;
            align-items: flex-start;
            border-color: rgba(41, 40, 47, 1);
            border-style: solid;
            border-width: 1px;
            border-radius: 44px;
            background-color: var(--dl-color-maincolors-backgrounddark);
          }
          .component-text06 {
            color: rgba(255, 255, 255, 0.4000000059604645);
            height: auto;
            font-size: 14px;
            font-style: Medium;
            text-align: left;
            font-family: Inter;
            font-weight: 500;
            line-height: 24px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-frame1171274789 {
            gap: 18px;
            top: 11.75rem;
            left: 0px;
            width: 62.25rem;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-direction: column;
          }
          .component-text08 {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 20px;
            font-style: Medium;
            text-align: left;
            font-family: Inter;
            font-weight: 500;
            line-height: 20px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-frame15064 {
            width: 62.25rem;
            height: 16.5625rem;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: rgba(255, 255, 255, 0.05999999865889549);
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-color: rgba(255, 255, 255, 0.05999999865889549);
          }
          .component-text10 {
            top: 21px;
            left: 20px;
            color: rgba(255, 255, 255, 0.4000000059604645);
            height: auto;
            position: absolute;
            font-size: 16px;
            font-style: Regular;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 24px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-text12 {
            top: 233px;
            left: 60rem;
            color: rgba(89, 96, 105, 1);
            height: auto;
            position: absolute;
            font-size: 14px;
            font-style: Medium;
            text-align: right;
            font-family: Inter;
            font-weight: 500;
            line-height: 14px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-frame1171274790 {
            gap: 18px;
            left: 0px;
            width: 62.25rem;
            bottom: 5.6875rem;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-direction: column;
          }
          .component-text14 {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 20px;
            font-style: Medium;
            text-align: left;
            font-family: Inter;
            font-weight: 500;
            line-height: 20px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-frame15066 {
            width: 62.25rem;
            height: 16.5625rem;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: rgba(255, 255, 255, 0.05999999865889549);
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-color: rgba(255, 255, 255, 0.05999999865889549);
          }
          .component-text16 {
            top: 21px;
            left: 20px;
            color: rgba(255, 255, 255, 0.4000000059604645);
            height: auto;
            position: absolute;
            font-size: 16px;
            font-style: Regular;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 24px;
            font-stretch: normal;
            text-decoration: none;
          }
          .component-root-class-name {
            top: 8.625rem;
            left: 21.25rem;
            position: absolute;
          }
        `}
      </style>
    </>
  );
};

postComponent.defaultProps = {
  rootClassName: ''
};

postComponent.propTypes = {
  rootClassName: PropTypes.string
};

export default postComponent;
