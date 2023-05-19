'use client';
import React, { useState } from 'react';

// import PropTypes from 'prop-types';
import {
  DeleteOutlined,
  EllipsisOutlined,
  FieldTimeOutlined,
  LinkOutlined
} from '@ant-design/icons';
import {
  ConfigProvider,
  Divider,
  Dropdown,
  MenuProps,
  Modal,
  Tooltip
} from 'antd';
import { usePostStore } from '@/store';
import { on } from 'events';
import { Colors } from '../../types/components/theme';
import './index.css';
import Modalprop from '../modal/modal';

const Block = (props: {
  rootClassName: any;
  Frame_alt1: string | undefined;
  Frame_src1: string | undefined;
  Ellipse2_alt: string | undefined;
  Ellipse2_src: string | undefined;
  Frame_alt2: string | undefined;
  Frame_src2: string | undefined;
  Frame_alt: string | undefined;
  Frame_src: string | undefined;
  Line18_alt: string | undefined;
  Line18_src: string | undefined;
  data: {
    title: string;
    link: string;
    originalText: string;
    personalThoughts: string;
    time: string;
  };
}) => {
  const decrease = usePostStore((state) => state.decrease);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onDelete();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function onDelete() {
    console.log(props.data);
    decrease(props.data.title);
  }
  const text = () => (
    <button className="hover:text-red-600" onClick={showModal}>
      <DeleteOutlined />
      &nbsp;
      <span>Delete</span>
    </button>
  );
  return (
    <>
      <div className={`block-block ${props.rootClassName} `}>
        <Modalprop
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          locate="post"
        />
        <span className="block-text">
          <span>{props.data.title}</span>
        </span>
        <div className="block-frametab">
          <div className="block-frame">
            <div className="block-frame1 text-textGrey">
              <FieldTimeOutlined />
            </div>
            <span className="block-text02">
              <span>{props.data.time}</span>
            </span>
          </div>
          <div className="block-frame2">
            <div className="block-user-circle">
              <img
                alt={props.Ellipse2_alt}
                src={props.Ellipse2_src}
                className="block-ellipse2"
              />
            </div>
            <span className="block-text04">
              <span>@SCaesar</span>
            </span>
          </div>
          <div className="block-frame3">
            <span className="text-textGrey">
              <LinkOutlined />
            </span>
            <div className="block-text06">
              <a href={props.data.link} color="inherit">
                {props.data.link}
              </a>
            </div>
          </div>
        </div>
        <Tooltip title={text} placement="bottom">
          <span className="block-frame5">
            <span className="text-textGrey">
              <EllipsisOutlined />
            </span>
          </span>
        </Tooltip>
        <div className="flex flex-col">
          <div className="block-frame6">
            <span className="block-text10-1">
              <span>Original Summary</span>
            </span>
            <span className="block-text08">
              <span>{props.data.originalText}</span>
            </span>
          </div>
          <div className="block-line18" />
          <div className="block-frame1171274787">
            <span className="block-text10">
              <span>Personal Thoughts</span>
            </span>
            <div className="block-group1">
              <span className="block-text12">
                <span>{props.data.personalThoughts}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .block-block {
            gap: 0.5rem;
            width: 73vw;
            display: flex;
            padding: 12px 12px 8px 12px;
            overflow: hidden;
            position: relative;
            flex-grow: 1;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: rgba(255, 255, 255, 0.18000000715255737);
            border-style: solid;
            border-width: 1px;
            border-radius: 16px;
            background-color: #1a1a1a;
          }
          .block-text {
            top: 1.5rem;
            left: 1.5rem;
            color: rgba(255, 255, 255, 1);
            height: 24px;
            position: absolute;
            font-size: 22px;
            font-style: Semi Bold;
            text-align: left;
            font-family: Inter;
            font-weight: 700;
            line-height: 24px;
            font-stretch: normal;
            text-decoration: none;
          }
          .block-frametab {
            height: 1.5rem;
            gap: 1.125rem;
            top: 4.125rem;
            left: 1.5rem;

            display: flex;
            position: absolute;
            align-items: flex-center;
          }
          .block-frame {
            gap: 4px;
            display: flex;
            align-items: center;
          }
          .block-frame1 {
            // width: 24px;
            // height: 24px;
          }
          .block-text02 {
            color: rgba(116, 116, 116, 1);
            height: auto;
            font-size: 14px;
            font-style: Regular;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 18px;
            font-stretch: normal;
            text-decoration: none;
          }
          .block-frame2 {
            gap: 4px;
            display: flex;
            align-items: center;
          }
          .block-user-circle {
            width: 24px;
            height: 24px;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .block-ellipse2 {
            top: 0px;
            left: 0px;
            width: 24px;
            height: 24px;
            position: absolute;
          }
          .block-text04 {
            color: rgba(116, 116, 116, 1);
            height: auto;
            font-size: 14px;
            font-style: Regular;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 18px;
            font-stretch: normal;
            text-decoration: none;
          }
          .block-frame3 {
            gap: 4px;
            display: flex;
            align-items: center;
          }
          .block-frame4 {
            width: 24px;
            height: 24px;
          }
          .block-text06 {
            color: rgba(116, 116, 116, 1) !important;
            height: auto;
            font-size: 14px;
            font-style: Regular;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 18px;
            font-stretch: normal;
            text-decoration: none;
          }
          .block-frame5 {
            top: 27px;
            left: 71vw;
            width: 18px;
            height: 18px;
            position: absolute;
          }
          .block-frame6 {
            gap: 8px;
            margin-top: 6rem;
            text-align: center;

            display: flex;
            align-items: flex-start;
            flex-shrink: 0;
            flex-direction: column;
          }
          .block-text08 {
            color: rgba(116, 116, 116, 1);
            width: 71vw;
            height: auto;
            font-size: 14px;
            font-style: italic;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 30px;
            font-stretch: normal;
            text-decoration: none;
          }
          .block-frame1171274787 {
            gap: 8px;
            margin-top: 1rem;

            width: 62.25rem;
            display: flex;

            align-items: flex-center;
            flex-direction: column;
          }
          .block-text10 {
            color: rgba(255, 255, 255, 1);
            height: 1.75rem;
            font-size: 18px;
            font-style: Semi Bold;
            text-align: left;
            font-family: Inter;
            font-weight: 700;
            line-height: 28px;
            font-stretch: normal;
            text-decoration: none;
          }
          .block-text10-1 {
            color: rgba(255, 255, 255, 1);
            height: 1.75rem;
            font-size: 18px;
            font-style: Semi Bold;
            text-align: left;
            font-family: Inter;
            font-weight: 700;
            line-height: 28px;
            font-stretch: normal;
            text-decoration: none;
            font-style: italic;
          }
          .block-group1 {
            width: 71vw;

            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 1;
          }
          .block-text12 {
            color: rgba(165, 165, 165, 1);

            height: auto;

            font-size: 14px;
            font-style: Regular;
            text-align: left;
            font-family: Inter;
            font-weight: 400;
            line-height: 30px;
            font-stretch: normal;
            text-decoration: none;
          }
          .block-line18 {
            margin-top: 1rem;
            margin-left: -30px;
            position: relative;
            width: 110%;
            height: 1px;
            background-color: #434343;
          }
          .block-root-class-name {
            top: 8.625rem;
            left: 21.25rem;
            position: absolute;
          }
        `}
      </style>
    </>
  );
};

Block.defaultProps = {
  Frame_src: '/playground_assets/frame2577-hds.svg',
  Frame_alt: 'Frame2577',
  Line18_src: '/playground_assets/line186821-0cs.svg',
  Line18_alt: 'Line186821',
  Frame_src1: '/playground_assets/frame2513-7amg.svg',
  Frame_alt1: 'Frame2513',
  Frame_src2: '/playground_assets/frame2514-gmgk.svg',
  Frame_alt2: 'Frame2514',
  Ellipse2_src: '/playground_assets/ellipse22514-d6q-200h.png',
  Ellipse2_alt: 'Ellipse22514',
  rootClassName: ''
};

export default Block;
