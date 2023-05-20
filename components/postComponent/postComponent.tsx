/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useState } from 'react';

import { Button, ConfigProvider, Form, Input } from 'antd';
import { usePostStore } from '@/store';
import Link from 'next/link';
import './index.css';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;

const postComponent = (props: { rootClassName: any }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isNull, setIsNull] = useState(true);
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
    time: string;
  }) => {
    console.log(getCurrentDate());
    //Object.assign(e, { time: getCurrentDate() });
    e.time = getCurrentDate();
    console.log(e);
    increase(e);
    console.log(usePostStore.getState());
    //跳转到/home/explore页
    router.push('/home');
  };
  const title = Form.useWatch('title', form);
  const link = Form.useWatch('link', form);
  const originalText = Form.useWatch('originalText', form);
  const personalThoughts = Form.useWatch('personalThoughts', form);
  //当title,time,material1,material2不为空时，isNull改变状态为false
  useEffect(() => {
    //console.log(title, link, OriginalText, PersonalThoughts);
    if (
      title !== undefined &&
      title !== '' &&
      link !== undefined &&
      link !== '' &&
      originalText !== undefined &&
      originalText !== '' &&
      personalThoughts !== undefined &&
      personalThoughts !== ''
    ) {
      setIsNull(false);
    } else {
      setIsNull(true);
    }
  }, [title, link, originalText, personalThoughts]);
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 34 }}
        onFinish={onFinish}
        form={form}
      >
        <div className={`component-container ${props.rootClassName} `}>
          <div className="component-frame15062">
            <ConfigProvider
              theme={{
                token: { colorBgContainer: '#0f0f0f' }
              }}
            >
              <Form.Item
                name="title"
                rules={[{ required: true, message: 'Enter The Article' }]}
              >
                <Input
                  type="text"
                  placeholder="+ Enter the article"
                  style={{
                    width: '70vw',
                    height: '7vh'
                  }}
                  showCount
                  maxLength={20}
                  className="absolute left-0 top-0 flex shrink-0 items-start rounded-lg  border-none text-white hover:border-solid"
                />
              </Form.Item>
            </ConfigProvider>

            {/* <span className="component-text">
            <span>+ Enter the article</span>
          </span> */}
          </div>
          <div className="component-frame15063">
            <ConfigProvider
              theme={{
                token: { colorBgContainer: '#0f0f0f' }
              }}
            >
              <Form.Item
                name="link"
                rules={[
                  { required: true, message: 'Please Enter The Original Link' }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Please enter the original link"
                  style={{
                    width: '70vw',
                    height: '7vh',
                    outline: 'none'
                  }}
                  className="absolute left-0 top-0 flex shrink-0 items-start rounded-lg  border-none text-white hover:border-solid"
                />
              </Form.Item>
            </ConfigProvider>
          </div>
          {/* 提交按钮 */}
          <Form.Item>
            <div
              className={
                isNull == true
                  ? 'component-frame15065'
                  : 'frame1171274791-frame1171274791'
              }
            >
              {isNull ? (
                <Button
                  htmlType="submit"
                  style={{ border: 'none', zIndex: 1 }}
                  disabled
                >
                  <span className="component-text06">Submit</span>
                </Button>
              ) : (
                <Button htmlType="submit" style={{ border: 'none', zIndex: 1 }}>
                  <span className="frame1171274791-text">Submit</span>
                </Button>
              )}
              {/* <div className="frame1171274791-frame1171274791">
                <span className="frame1171274791-text">
                  <span>Submit</span>
                </span>
              </div> */}
            </div>
          </Form.Item>
          <div className="component-frame1171274789">
            <span className="component-text08">
              <span>Original Summary</span>
            </span>
            <Form.Item
              name="originalText"
              rules={[
                {
                  required: true,
                  message: 'Please Enter The Core Content Of The Original Text'
                }
              ]}
            >
              <div className="component-frame15064">
                <ConfigProvider
                  theme={{
                    token: { colorBgContainer: '#0f0f0f' }
                  }}
                >
                  <TextArea
                    showCount
                    maxLength={100}
                    placeholder="Please enter the core content of the original text"
                    style={{
                      width: '70vw',
                      height: '30vh',
                      resize: 'none'
                    }}
                    className="absolute left-0 top-0 flex items-start rounded-lg  border-none text-white hover:border-solid"
                  />
                </ConfigProvider>
                {/* <span className="component-text10">
                <span>please enter the core content of the original text</span>
              </span> */}
              </div>
            </Form.Item>
          </div>
          <div className="component-frame1171274790">
            <span className="component-text14">
              <span>Personal Thoughts</span>
            </span>
            <Form.Item
              name="personalThoughts"
              rules={[
                { required: true, message: 'Please Enter Personal Thoughts' }
              ]}
            >
              <div className="component-frame15066">
                <ConfigProvider
                  theme={{
                    token: { colorBgContainer: '#0f0f0f' }
                  }}
                >
                  <TextArea
                    placeholder="Please enter Personal thoughts"
                    style={{
                      width: '70vw',
                      height: '30vh',
                      resize: 'none'
                    }}
                    className="absolute left-0 top-0 flex  items-start rounded-lg border-none text-white hover:border-solid"
                  />
                </ConfigProvider>
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
          .frame1171274791-frame1171274791 {
            top: 100vh;
            left: 28vw;
            display: flex;
            padding: 0.75rem 4rem;
            position: absolute;
            gap: 8px;
            height: auto;
            display: flex;
            align-items: flex-start;
            border-radius: 44px;
            background-image: linear-gradient(
              180deg,
              rgba(110, 98, 238, 1) 2%,
              rgba(63, 61, 250, 1) 100%
            );
            cursor: pointer;
          }
          .frame1171274791-text {
            color: rgba(255, 255, 255, 1);
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
          .component-container {
            top: 2vh;
            width: 73vw;
            height: 110vh;
            display: flex;
            position: relative;
            align-items: flex-start;
            background-color: var(--dl-color-gray-black);
          }
          .component-frame15062 {
            top: 0px;
            left: 0px;
            width: 70vw;
            height: 7vh;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
            border-none;
            background-color: inherit;
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
            top: 10vh;
            left: 0px;
            width: 70vw;
            height: 7vh;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
            border-none;
            background-color: inherit;
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
            top: 100vh;
            gap: 8px;
            left: 28vw;
            display: flex;
            padding: 0.75rem 4rem;
            position: absolute;
            align-items: flex-center;
            border-color: rgba(41, 40, 47, 1);
            border-style: solid;
            border-width: 2px;
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
            top: 20vh;
            left: 0px;
            width: 70vw;
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
            width: 70vw;
            height: 30vh;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            border-none;
            background-color: inherit;
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
            top: 58vh;
            gap: 18px;
            left: 0px;
            width: 70vw;
            bottom: 10vh;
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
            width: 70vw;
            height: 30vh;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
           border-none;
            background-color: inherit;
            
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

export default postComponent;
