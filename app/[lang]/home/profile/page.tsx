'use client';
import Link from 'next/link';
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  message,
  Space,
  Table,
  Tag
} from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import Twitter from '@/components/icons/twitter';
import { TwitterIcon } from '@/components/icons/campaignTwitter';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useRef, useState } from 'react';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import img3 from '@/assets/homeImg/img_3.png';
import Image from 'next/image';
import Upload from '@/components/icons/upload';
//import img404 from '@/assets/error.png'
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

// const PreviewImage = ({ imageUrl }: { imageUrl: string }) => {
//   const [isHovering, setIsHovering] = useState(false);
//   return (
//     <div
//       className="preview-container relative inline-block h-28 w-28"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {!isHovering && (
//         <img
//           src={imageUrl}
//           // alt="preview"
//           className="preview-image h-full w-full rounded-full object-cover"
//         />
//       )}
//       {/*{isHovering && (*/}
//       {/*  <div className="preview-overlay absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-full bg-black bg-opacity-60 text-lg font-bold text-white">*/}
//       {/*    Upload new*/}
//       {/*  </div>*/}
//       {/*)}*/}
//     </div>
//   );
// };
const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div style={{ backgroundColor: 'black', width: '100%', height: '100%' }}>
      {/*Profile字样*/}
      <div className="ml-[140px] text-[28px]">Profile</div>
      {/*头像部分*/}
      <div className="mt-[17px] flex flex-col items-center">
        <div className="size-[16px] mb-[14px] ml-[-263px]">Avatar</div>
        <div className=" flex items-center">
          <div
            className="rounded-full"
            style={{
              width: '64px',
              height: '64px',
              borderColor: 'white',
              borderWidth: '1px'
            }}
          >
            <div className="relative flex">
              <Image alt="" src={img3}></Image>
              <div className="absolute right-[-3.1px] top-[-1px] flex h-[64px] w-[70px] rounded-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50">
                <div
                  className="relative right-[-27px] top-[18px]"
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  <Upload />
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  style={{ borderColor: 'white', borderWidth: '1px' }}
                />
              </div>
            </div>
          </div>
          <span
            className="text-[#A1A1A9]"
            style={{
              color: 'white',
              marginLeft: '14px'
            }}
          >
            Support PNG、JPG、GIF,64×64
            <br />
            recommended,max size 5M
          </span>
        </div>
      </div>
      {/*UserName部分*/}
      <div className="flex flex-col items-center">
        <div className="mr-[233px] mt-[38px] text-[16px]">UserName</div>
        {/*输入框部分*/}
        <input
          type="text"
          className="mr-[-93px] mt-[14px] w-[401px] rounded-[6px] border-2 bg-black"
          style={{ borderColor: '#747474' }}
        />
      </div>
    </div>
  );
};

export default Profile;
