/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useState } from 'react';

import { Button, ConfigProvider, Form, Input } from 'antd';
import { usePostStore } from '@/store';
import Link from 'next/link';
import './index.css';
import { useRouter } from 'next/navigation';
import { apiPostData } from '@/apis/post';
import { UUID } from '@/utils/uuid';

const { TextArea } = Input;

const postComponent = (props: { rootClassName: any }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isNull, setIsNull] = useState(true);
  const increase = usePostStore((state: any) => state.increase);
  const decrease = usePostStore((state: any) => state.decrease);
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
    campaignId: number;
    title: string;
    link: string;
    content: string;
    thought: string;
    time: string;
  }) => {
    e.time = getCurrentDate();
    e.campaignId = 0;
    //increase(e);
    apiPostData(e);
    router.push('/home');
  };
  const title = Form.useWatch('title', form);
  const link = Form.useWatch('link', form);
  const content = Form.useWatch('content', form);
  const thought = Form.useWatch('thought', form);
  //当title,time,material1,material2不为空时，isNull改变状态为false
  useEffect(() => {
    //console.log(title, link, OriginalText, PersonalThoughts);
    if (
      title !== undefined &&
      title !== '' &&
      link !== undefined &&
      link !== '' &&
      content !== undefined &&
      content !== '' &&
      thought !== undefined &&
      thought !== ''
    ) {
      setIsNull(false);
    } else {
      setIsNull(true);
    }
  }, [title, link, content, thought]);
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
                  // showCount
                  // maxLength={20}
                  className="absolute left-0 top-0 flex shrink-0 items-start rounded-lg  border-none text-white hover:border-solid"
                />
              </Form.Item>
            </ConfigProvider>
          </div>
          <div className="absolute left-0 top-[10vh] flex h-[7vh] w-[70vw] shrink-0 items-start bg-inherit">
            <ConfigProvider
              theme={{
                token: { colorBgContainer: '#0f0f0f' }
              }}
            >
              <Form.Item
                name="link"
                rules={[
                  { required: true, message: 'Link input error', type: 'url' }
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
                  <span
                    style={{ fontFamily: 'Inter', fontStyle: 'Medium' }}
                    className="h-auto text-center text-sm font-medium leading-6 text-[rgba(255,255,255,0.4000000059604645)] no-underline"
                  >
                    Submit
                  </span>
                </Button>
              ) : (
                <Button htmlType="submit" style={{ border: 'none', zIndex: 1 }}>
                  <span
                    style={{ fontFamily: 'Inter', fontStyle: 'Medium' }}
                    className="h-auto text-left text-sm font-medium leading-6 text-white no-underline"
                  >
                    Submit
                  </span>
                </Button>
              )}
            </div>
          </Form.Item>
          <div className="absolute left-0 top-[20vh] flex w-[70vw] flex-col items-start gap-[18px]">
            <span
              style={{ fontFamily: 'Inter', fontStyle: 'Medium' }}
              className="h-auto text-left text-xl font-medium leading-5 text-white no-underline"
            >
              <span>Original Summary</span>
            </span>
            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Please Enter The Core Content Of The Original Text'
                }
              ]}
            >
              <div className="relative flex h-[30vh] w-[70vw] shrink-0 items-start bg-inherit">
                <ConfigProvider
                  theme={{
                    token: { colorBgContainer: '#0f0f0f' }
                  }}
                >
                  <TextArea
                    showCount
                    maxLength={5000}
                    placeholder="Please enter the core content of the original text"
                    style={{
                      width: '70vw',
                      height: '30vh',
                      resize: 'none'
                    }}
                    className="absolute left-0 top-0 flex items-start rounded-lg  border-none text-white hover:border-solid"
                  />
                </ConfigProvider>
              </div>
            </Form.Item>
          </div>
          <div className="absolute bottom-[10vh] left-0 top-[58vh] flex w-[70vw] flex-col items-start gap-[18px]">
            <span
              style={{ fontFamily: 'Inter', fontStyle: 'Medium' }}
              className="h-auto text-left text-xl font-medium leading-5 text-white no-underline"
            >
              <span>Personal Thoughts</span>
            </span>
            <Form.Item
              name="thought"
              rules={[
                { required: true, message: 'Please Enter Personal Thoughts' }
              ]}
            >
              <div className="relative flex h-[30vh] w-[70vw] shrink-0 items-start bg-inherit">
                <ConfigProvider
                  theme={{
                    token: { colorBgContainer: '#0f0f0f' }
                  }}
                >
                  <TextArea
                    placeholder="Please enter Personal thoughts"
                    maxLength={5000}
                    showCount
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
            padding: 12px 64px;
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
          .component-frame15065 {
            top: 100vh;
            gap: 8px;
            left: 28vw;
            display: flex;
            padding: 12px 64px;
            position: absolute;
            align-items: flex-center;
            border-color: rgba(41, 40, 47, 1);
            border-style: solid;
            border-width: 2px;
            border-radius: 44px;
            background-color: var(--dl-color-maincolors-backgrounddark);
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
        `}
      </style>
    </>
  );
};

postComponent.defaultProps = {
  rootClassName: ''
};

export default postComponent;
