'use client';
// import Link from 'next/link';
import Twitter from '@/components/icons/twitter';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useRef, useState } from 'react';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import defaultAvatar from '@/assets/profileSvg/defaultAvatar.svg';
import Image from 'next/image';
import Upload from '@/components/icons/upload';
import { Button } from '@/components/button';
import request from '@/utils/request';
import { apiTwitterToken, apiUserInfo } from '@/apis/user';
import { useUserStore } from '@/store';
import Modalprop from '@/components/modal/modal';
import { toBase64 } from '@/utils/file';
import ImgCrop from '@/components/imgCrop';
import Toast from '@/components/toast/toast';
import { blobToFile, dataURLtoBlob, getStringWidth } from '@/utils/helpers';
import { getCookie } from '@/utils/cookie';

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
  const {
    username,
    setUsername,
    avatar,
    setAvatar,
    isConnectTwitter,
    setIsConnectTwitter
  } = useUserStore();
  const [uploadUrl, setUploadUrl] = useState<string>(avatar || '');
  //  防止 onchange 事件用户每输入一次如果就调 setUsername 会频繁调用 put 方法，因此先在页面内进行 useState 缓存再在 submit 时只调用一次
  const [userName, setUserName] = useState(username || '@StarMemory');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [cropType, setCropType] = useState(1);
  const [showCrop, setShowCrop] = useState(false);
  const [cropper, setCropper] = useState<any>();
  const [aspect, setAspect] = useState(1 / 1);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);

  const handleCrop = async (e: any, type: number) => {
    e.preventDefault();
    setCropType(type);
    if (type === 1) {
      setAspect(1 / 1);
    } else {
      // setAspect(1280 / 200);
      setAspect(1400 / 350);
    }
    const input: any = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg, .jpeg, .png';
    input.click();
    input.onchange = async () => {
      try {
        const reader: any = new FileReader();
        reader.addEventListener('load', () => {
          // setImgSrc(reader.result.toString() || '');
          setShowCrop(true);
        });
        reader.readAsDataURL(input.files[0]);
      } catch (error) {
        Toast.error('Upload error');
      }
    };
  };
  const handleUpload = async () => {
    setShowCrop(false);
    const preview = cropper.getCroppedCanvas().toDataURL();
    try {
      cropType === 1 ? setAvatarLoading(true) : setBannerLoading(true);
      const address = getCookie('address') || '';
      const bodyBlob = dataURLtoBlob(preview);
      const bodyFile = blobToFile(bodyBlob, address.slice(0, 8));
      console.log(bodyBlob);
      // const res: any = await upload({
      //   key: address.slice(0, 8),
      //   body: bodyFile
      // });
      // setValue('avatar', `${res.host}/${res.key}`);
      setAvatarLoading(false);
      Toast.success('upload success');
    } catch (error) {
      setAvatarLoading(false);
      setBannerLoading(false);
      Toast.error('upload error');
    }
  };
  //  头像上传
  const handleUploadAvatar = async (e: any) => {
    const file = e.target.files[0];
    const base64Url = await toBase64(file);
    setUploadUrl(base64Url || '');
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await request(`/user/profile`, {
      method: 'PUT',
      body: formData
    });
    if (res?.data) {
      //  此处为返回图片地址
      setAvatar(res.data.avatar);
    }
  };
  //  名字上传
  const handleUploadUserName = async () => {
    if (userName !== '@StarMemory') {
      const res = await request('api/user/profile', {
        method: 'PUT',
        body: {
          userName
        }
      });
      if (res?.data) {
        setUsername(username);
      }
    }
  };
  //  推特 登录
  const handleTwitterConnect = async () => {
    if (!isConnectTwitter) {
      const res = await apiTwitterToken(location.href);
      window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${res.oauthToken}`;
      setIsConnectTwitter(true);
    } else {
      showModal();
    }
  };
  //  推特 退出登录
  const handleTwitterDisconnect = () => {
    if (isConnectTwitter) {
      setIsConnectTwitter(false);
    }
  };

  //  二次弹窗
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleTwitterDisconnect();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getUserInfo = async () => {
    const res = await apiUserInfo();
    setUploadUrl(res.data.avatar);
    setUserName(res.data.username);
  };
  useEffect(() => {
    getUserInfo();
  });
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
              <Image
                alt=""
                src={uploadUrl ? uploadUrl : avatar ? avatar : defaultAvatar}
              ></Image>
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
                  onChange={handleUploadAvatar}
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
          value={userName}
          className="mr-[-93px] mt-[14px] h-[37px] w-[401px] rounded-[6px] border-[1px] bg-black focus:outline-none"
          style={{ borderColor: '#1d1d1d', textIndent: '12px' }}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {/*推特部分*/}
      <Modalprop
        ModalMaxWidth={350}
        BodyMaxWidth={300}
        cancelButtonMarginRight="0"
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        locate="twitter"
      />
      <div className="relative mr-[19vw] flex flex-col items-center">
        <div className="mr-[260px] mt-[38px] text-[16px]">Twitter</div>
        {/*绑定框部分*/}
        <div
          className="item-center mr-[-93px] mt-[14px] flex h-[37px] w-[401px] justify-between rounded-[6px] border-[1px] bg-black"
          style={{ borderColor: '#1d1d1d' }}
        >
          <div className="flex-raw item-center ml-[12px] mt-[4px] flex justify-center">
            {!isConnectTwitter ? <Twitter /> : <Upload />}
            <span className="ml-[8px] mt-[1.2px]">Twitter</span>
          </div>
          <span
            className="mr-[12px] mt-[5.2px] cursor-pointer"
            style={{ color: '#6E62EE' }}
            onClick={handleTwitterConnect}
          >
            {!isConnectTwitter ? 'Connect' : 'DisConnect'}
          </span>
        </div>
        {/*Submit*/}
        <Button
          color="secondary"
          className="ml-[6.2vw] mt-[3.5vw] h-[2.5vw] w-[9vw] rounded-full text-[14px] "
          onClick={handleUploadUserName}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Profile;
