'use client';
import Link from 'next/link';
import Twitter from '@/components/icons/twitter';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useRef, useState } from 'react';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import defaultAvatar from '@/assets/profileSvg/defaultAvatar.svg';
import Image from 'next/image';
import Upload from '@/components/icons/upload';
import { Button } from '@/components/button';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

// const beforeUpload = (file: RcFile) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };

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
    <div
      style={{ backgroundColor: 'black', width: '100%', height: '100%' }}
      className="ml-[1.7vw] mt-[3.8vw]"
    >
      {/*Profile字样*/}
      <div className="ml-[1.6vw] text-[28px]">Profile</div>
      {/*头像部分*/}
      <div className="mt-[17px] flex flex-col items-center">
        <div className="mb-[14px] mr-[36.3vw] text-[16px]">Avatar</div>
        <div className=" mr-[20vw] flex items-center">
          <div
            className="rounded-full"
            style={{
              width: '64px',
              height: '64px',
              borderColor: 'white'
            }}
          >
            <div className="relative flex">
              <Image alt="" src={defaultAvatar}></Image>
              {/*hover层*/}
              <div className="absolute right-[-3.1px] top-[0.5px] flex h-[64px] w-[70px] rounded-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50">
                {/*上传图片*/}
                <div
                  className="relative right-[-25px] top-[19px] cursor-pointer"
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
      <div className="mr-[19vw] flex flex-col items-center">
        <div className="mr-[233px] mt-[38px] text-[16px]">UserName</div>
        {/*输入框部分*/}
        <input
          type="text"
          value="喵喵"
          className="mr-[-93px] mt-[14px] h-[37px] w-[401px] rounded-[6px] border-[1px] bg-black focus:outline-none"
          style={{ borderColor: '#1d1d1d', textIndent: '12px' }}
        />
      </div>
      {/*推特部分*/}
      <div className="relative mr-[19vw] flex flex-col items-center">
        <div className="mr-[260px] mt-[38px] text-[16px]">Twitter</div>
        {/*绑定框部分*/}
        <div
          className="item-center mr-[-93px] mt-[14px] flex h-[37px] w-[401px] justify-between rounded-[6px] border-[1px] bg-black"
          style={{ borderColor: '#1d1d1d' }}
        >
          <div className="flex-raw item-center ml-[12px] mt-[4px] flex justify-center">
            <Twitter />
            <span className="ml-[8px] mt-[1.2px]">Twitter</span>
          </div>
          <span className="mr-[12px] mt-[5.2px]" style={{ color: '#6E62EE' }}>
            Connect
          </span>
        </div>
        {/*Submit*/}
        <Button
          color="secondary"
          className="ml-[6.2vw] mt-[3.5vw] h-[2.5vw] w-[9vw] rounded-full text-[14px]"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Profile;
