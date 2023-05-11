/* eslint-disable prettier/prettier */
'use client';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import usePostStore from '@/store';

const { TextArea } = Input;

const postComponent = (props: { rootClassName: any }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [material1, setMaterial1] = useState('');
  const [material2, setMaterial2] = useState('');
  const increase = usePostStore((state) => state.increase);
  const decrease = usePostStore((state) => state.decrease);
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const onFinish = (e: {
    title: string;
    link: string;
    originalText: string;
    personalThoughts: string;
  }) => {
    console.log(getCurrentDate());

    Object.assign(e, { time: getCurrentDate() });
    console.log(e);
    increase(e);
    console.log(usePostStore.getState());
  };
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 34 }}
        initialValues={{ type: 1 }}
        onFinish={onFinish}
      >
        <div className={`component-container ${props.rootClassName} `}>
          <div className="component-frame15062">
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Enter The Article' }]}
            >
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="+ Enter the article"
                style={{
                  width: '62.25rem',
                  height: '4.125rem',
                  border: 'none'
                }}
                className="w-62.25rem h-4.125rem absolute left-0 top-0 flex shrink-0 items-start rounded-lg  bg-inherit text-white"
              />
            </Form.Item>
            {/* <span className="component-text">
            <span>+ Enter the article</span>
          </span> */}
            <span className="component-text02">
              <span>x/n</span>
            </span>
          </div>
          <div className="component-frame15063">
            <Form.Item
              name="Link"
              rules={[
                { required: true, message: 'Please Enter The Original Link' }
              ]}
            >
              <Input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Please enter the original link"
                style={{
                  width: '62.25rem',
                  height: '4.125rem',
                  border: 'none'
                }}
                className="w-62.25rem h-4.125rem absolute left-0 top-0 flex shrink-0 items-start rounded-lg  bg-inherit text-white"
              />
            </Form.Item>
            {/* <span className="component-text04">
            <span>Please enter the original link</span>
          </span> */}
          </div>
          <Form.Item>
            <div className="component-frame15065">
              <Button htmlType="submit" style={{border:'none',padding:'0'}}>
                <span className="component-text06">Submit</span>
              </Button>
            </div>
          </Form.Item>
          <div className="component-frame1171274789">
            <span className="component-text08">
              <span>Original Summary</span>
            </span>
            <Form.Item
              name="OriginalText"
              rules={[
                {
                  required: true,
                  message: 'Please Enter The Core Content Of The Original Text'
                }
              ]}
            >
              <div className="component-frame15064">
                <TextArea
                  value={material1}
                  onChange={(e) => setMaterial1(e.target.value)}
                  placeholder="Please enter the core content of the original text"
                  style={{
                    width: '62.25rem',
                    height: '16.5625rem',
                    border: 'none'
                  }}
                  className="absolute left-0 top-0 flex items-start rounded-lg  bg-inherit text-white"
                />

                {/* <span className="component-text10">
                <span>please enter the core content of the original text</span>
              </span> */}
                <span className="component-text12">
                  <span>x/n</span>
                </span>
              </div>
            </Form.Item>
          </div>
          <div className="component-frame1171274790">
            <span className="component-text14">
              <span>Personal Thoughts</span>
            </span>
            <Form.Item
              name="PersonalThoughts"
              rules={[
                { required: true, message: 'Please Enter Personal Thoughts' }
              ]}
            >
              <div className="component-frame15066">
                <TextArea
                  value={material2}
                  onChange={(e) => setMaterial2(e.target.value)}
                  placeholder="Please enter Personal thoughts"
                  style={{
                    width: '62.25rem',
                    height: '16.5625rem',
                    border: 'none'
                  }}
                  className=" absolute left-0 top-0 flex  items-start rounded-lg  bg-inherit text-white"
                />

                {/* <span className="component-text16">
                <span>please enter Personal thoughts</span>
              </span> */}
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
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
            border-color: #2c2c2c;
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-color: #2c2c2c;
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
            border-color: #2c2c2c;
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-color: #2c2c2c;
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
            top: 52rem;
            gap: 8px;
            left: 23.625rem;
            width: 10rem;
            display: flex;
            padding: 0.75rem 4rem;
            position: absolute;
            align-items: flex-center;
            border-color: rgba(41, 40, 47, 1);
            border-style: solid;
            border-width: 3px;
            border-radius: 44px;
            background-color: var(--dl-color-maincolors-backgrounddark);
          }
          .component-text06 {
            color: rgba(255, 255, 255, 0.4000000059604645);
            height: auto;
            font-size: 14px;
            font-style: Medium;
            text-align: center;
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
            top: 31.75rem;
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
