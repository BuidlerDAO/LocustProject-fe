'use client';
import React, { useEffect, useState } from 'react';

// import PropTypes from 'prop-types';
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Post } from '@/store/PostStore';
import { usePostStore, useUserStore } from '@/store';
import './index.css';
import Modalprop from '../modal/modal';
import { LinkIcon, TimeIcon } from '../icons';
import TextMore from '../textMore';
import Image from 'next/image';
import { apiDeletePostData } from '@/apis/post';
import Link from 'next/link';

const Block = (props: { data: Post }) => {
  const decrease = usePostStore((state: any) => state.decrease);
  const isAdmin = useUserStore((state: any) => state.isAdmin);

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
    console.log(props.data.id);
    decrease(props.data.id);
    apiDeletePostData(props.data.id);
    // toast.success('Delete success', {
    //   duration: 4000
    // });
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
      <div className={`block-block `}>
        <Modalprop
          ModalMaxWidth={330}
          BodyMaxWidth={300}
          cancelButtonMarginRight="0"
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
              <TimeIcon />
            </div>
            <span className="block-text02">
              <span>{props.data.time}</span>
            </span>
          </div>
          <div className="block-frame2">
            <div className="block-user-circle">
              <Link href={`https://twitter.com/${props.data.twitter}`}>
                <Image
                  src={props.data.avatar}
                  width={24}
                  height={24}
                  className="rounded-full"
                  alt="#"
                />
              </Link>
            </div>
            <span className="block-text04">
              <span>{props.data.username}</span>
            </span>
          </div>
          <div className="block-frame3">
            <span className="text-textGrey">
              <LinkIcon />
            </span>
            <div className="block-text06">
              <a
                href={props.data.link}
                style={{ color: 'inherit' }}
                target="_blank"
                rel="noreferrer"
              >
                {props.data.link}
              </a>
            </div>
          </div>
        </div>
        <Tooltip title={text} placement="bottom">
          <span className="block-frame5">
            <span className="text-white">
              <EllipsisOutlined
                //当用户不是管理员时，不显示删除按钮
                style={{ display: isAdmin ? 'block' : 'none' }}
              />
            </span>
          </span>
        </Tooltip>
        <div className="flex flex-col">
          <div className="block-frame6">
            <span className="block-text10-1">
              <span>Original Summary</span>
            </span>
            <span className="block-text08">
              <TextMore text={props.data.originalText} maxLines={6} />
            </span>
          </div>
          <div className="block-line18" />
          <div className="block-frame1171274787">
            <span className="block-text10">
              <span>Personal Thoughts</span>
            </span>
            <div className="block-group1">
              <span className="block-text12">
                <TextMore text={props.data.personalThoughts} maxLines={8} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Block;
