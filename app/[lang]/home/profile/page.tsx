'use client';

import Twitter from '@/components/icons/twitter';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Upload from '@/components/icons/upload';
import { Button } from '@/components/button';
import request from '@/utils/request';
import { apiPutUserInfo, apiTwitterToken, apiUserInfo } from '@/apis/user';
import { useUserStore } from '@/store';
import Modalprop from '@/components/modal/modal';
import ImgCrop from '@/components/imgCrop';
import Toast from '@/components/toast/toast';
import { blobToFile, dataURLtoBlob } from '@/utils/helpers';
import { getCookie } from '@/utils/cookie';
import { Dialog, DialogHeader } from '@/components/dialog';
import { upload } from '@/utils/aws';
import { useRouter, useSearchParams } from 'next/navigation';

const Profile: React.FC = () => {
  const {
    username,
    setUsername,
    avatar,
    setAvatar,
    isConnectTwitter,
    setIsConnectTwitter,
    isLogin
  } = useUserStore();
  const router = useRouter();
  //  页面重定向到个人页面时路径中带有 Twitter 返回的 oauth_token,oauth_verifier 去进行个人信息的修改
  const oauthToken = useSearchParams()?.get('oauth_token') as string;
  const verifier = useSearchParams()?.get('oauth_verifier') as string;
  //  防止 onchange 事件用户每输入一次如果就调 setUsername 会频繁调用 put 方法，因此先在页面内进行 useState 缓存再在 submit 时只调用一次
  const [userName, setUserName] = useState<string>(username);
  const [twitterName, setTwitterName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // 头像上传以及裁剪层
  const [uploadUrl, setUploadUrl] = useState<string>(avatar);
  const [showCrop, setShowCrop] = useState<boolean>(false);
  const [cropper, setCropper] = useState<any>();
  const [aspect, setAspect] = useState<number>(1 / 1);
  //  头像裁剪加验证
  const handleCrop = async (e: any) => {
    try {
      const file = e.target.files[0];
      const maxFileSize = 5 * 1024 * 1024;
      const filetype = ['.jpg', '.png', '.gif'];
      const extension = file.name.split('.').pop().toLowerCase();
      const flag = filetype.includes('.' + extension);
      if (file.size > maxFileSize || !flag) {
        Toast.error("File don't be allowed!");
        return;
      }
      const reader: any = new FileReader();
      reader.addEventListener('load', () => {
        setUploadUrl(reader.result.toString() || '');
        setShowCrop(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      console.log('handleCrop --> ', error);
      Toast.error('Upload error');
    }
  };
  //  头像上传
  const handleUpload = async () => {
    setShowCrop(false);
    const preview = cropper.getCroppedCanvas().toDataURL();
    try {
      const address = getCookie('address') || '';
      const bodyBlob = dataURLtoBlob(preview);
      const bodyFile = blobToFile(bodyBlob, address.slice(0, 8));
      console.log(bodyBlob);
      const res: any = await upload({
        key: address.slice(0, 8),
        body: bodyFile
      });
      console.log(res);
      setUploadUrl(`${res.host}/${res.key}`);
      Toast.success('upload success');
    } catch (error) {
      console.log('handleUpload --> ', error);
      Toast.error('upload error');
    }
  };
  //  名字+头像上传
  const handleUploadAll = async () => {
    try {
      const UserRes = await apiUserInfo();
      // console.log('UserRes-->',UserRes);
      if (userName !== '' && uploadUrl !== '') {
        //  单单修改用户信息不传推特
        if (UserRes.username === userName && UserRes.avatar === uploadUrl) {
          Toast.error("Don't upload the same info");
          return;
        }
        console.log(uploadUrl);
        const res = await apiPutUserInfo({
          avatar: uploadUrl,
          name: userName
        });
        if (res) {
          Toast.success('Modify message success!');
          // console.log(res);
          setUsername(res.username);
          setAvatar(res.avatar);
          //  测试是否成功更新数据
          // const testInfo = await apiUserInfo();
          // console.log(testInfo);
        }
      } else {
        Toast.error("Can't be empty!");
      }
    } catch (error) {
      Toast.error('Fail to Modify message!');
      console.log('handleUploadAll ---- >', error);
    }
  };
  //  推特登录 点击之后跳转至 Twitter 拿到授权,此时的 url 带有 oauthToken,verifier 参数,再执行页面的 useEffect 判断
  const handleTwitterConnect = async () => {
    if (!isConnectTwitter) {
      if (userName !== '' && uploadUrl !== '') {
        const UserRes = await apiUserInfo();
        if (UserRes.username !== userName || UserRes.avatar !== uploadUrl) {
          //  单单修改用户信息不传推特
          const res = await apiPutUserInfo({
            avatar: uploadUrl,
            name: userName
          });
          if (res) {
            Toast.success('Modify message success!');
            setUsername(res.username);
            setAvatar(res.avatar);
          }
        }
      }
      const res = await apiTwitterToken(
        'http://localhost:3000/zh-CN/home/profile'
      );
      window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${res.oauthToken}`;
      // updateTwitterInfo();
    } else {
      showModal();
    }
  };
  //  PUT 更新推特方法
  const updateTwitterInfo = async () => {
    const TwitterToken = await apiTwitterToken(
      'http://localhost:3000/zh-CN/home/profile'
    );
    const res = await apiPutUserInfo({
      twitter: {
        oauthToken,
        oauthTokenSecret: TwitterToken.oauthTokenSecret,
        verifier
      }
    });
    if (res.id) {
      console.log(res);
      Toast.success('Connect Success!');
      setIsConnectTwitter(true);
      setTwitterName(res.twitterUsername);
    } else {
      console.log(res);
      // Toast.error('Connect Error!');
    }
  };
  //  推特 退出登录
  const handleTwitterDisconnect = async () => {
    if (isConnectTwitter) {
      const res = await apiPutUserInfo({
        avatar: uploadUrl,
        name: userName,
        twitter: {
          oauthToken: '',
          oauthTokenSecret: '',
          verifier: ''
        }
      });
      console.log(res);
      // const testInfo = await apiUserInfo();
      // console.log('apiUserInfo --> ', testInfo);
      setIsConnectTwitter(false);
      Toast.success('Disconnect success!');
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
  //  获取个人信息
  const getUserInfo = async () => {
    try {
      const res = await apiUserInfo();
      console.log(res);
      if (res.avatar !== '') {
        setUploadUrl(res.avatar);
        setAvatar(res.avatar);
      }
      if (res.username !== '') {
        setUsername(res.username);
        setUserName(res.username);
        console.log('zustand-->', username);
        console.log('state-->', userName);
      }
      if (res.twitter !== '') {
        setTwitterName(res.twitter);
        console.log(res.twitter);
        console.log(isConnectTwitter);
        setIsConnectTwitter(true);
        console.log(isConnectTwitter);
      }
    } catch (error) {
      console.log(error);
      // router.replace('/');
    }
  };
  //  初始进行用户个人信息的获取
  useEffect(() => {
    getUserInfo();
  }, []);
  //  页面重定向回来的执行函数
  useEffect(() => {
    // console.log(isConnectTwitter);
    if (oauthToken !== null && !isConnectTwitter) {
      // console.log(1111);
      updateTwitterInfo();
      getUserInfo();
      // router.replace('/home/profile')
    }
  }, []);
  return (
    <div className="h-full w-full pt-[68px]">
      {/*Profile字样*/}
      <div className="ml-[40px] mt-[38px] text-[28px]">Profile</div>
      <div className="mx-auto w-[402px] items-start text-left">
        {/*头像部分*/}
        <div className="mt-[17px]">
          <div className="mb-[14px] w-full text-left text-[16px] font-[500]">
            Avatar
          </div>
          <div className="flex items-center">
            <div className="h-[64px] w-[64px] rounded-full">
              <div className="relative">
                <div className="m-0 h-[64px] w-[64px] rounded-full p-0">
                  <Image
                    alt=""
                    width="64"
                    height="64"
                    className="h-[100%] w-[100%] rounded-full"
                    src={uploadUrl}
                  />
                </div>
                <div className="flex flex-col items-center space-y-8 px-16 pt-9">
                  <Dialog
                    open={showCrop}
                    handler={(e) => setShowCrop(e)}
                    className="bg-[#191A27]"
                  >
                    <DialogHeader
                      title="Please choose your avatar"
                      showClose={true}
                      onClose={setShowCrop}
                    />
                    <ImgCrop
                      className="m-auto my-4 flex h-[400px] w-[400px] items-center justify-center"
                      imgsrc={uploadUrl}
                      onCrop={setCropper}
                      aspect={aspect}
                    />
                    <Button
                      className="mx-auto mb-[54px] w-[130px]"
                      color="primary"
                      onClick={handleUpload}
                    >
                      Confrim
                    </Button>
                  </Dialog>
                </div>
                {/* hover 层*/}
                <div
                  className="absolute left-0 top-[0.5px] flex h-[64px] w-[64px] cursor-pointer items-center justify-center rounded-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  {/*上传图片*/}
                  <Upload />
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".jpg, .gif, .png"
                    // size={5242880}
                    className="hidden"
                    style={{ borderColor: 'white', borderWidth: '1px' }}
                    onChange={handleCrop}
                  />
                </div>
              </div>
            </div>
            <span className="ml-[14px] h-[64px] text-[14px] text-[#A1A1A9]">
              Support PNG, JPG, GIF, 64 × 64
              <br />
              recommended,max size 5M
            </span>
          </div>
        </div>
        {/*UserName部分*/}
        <div className="flex flex-col items-start">
          <div className="mt-[38px] text-[16px] font-[500]">User Name</div>
          {/*输入框部分*/}
          <input
            type="text"
            value={userName}
            className="mt-[14px] h-[37px] w-[401px] rounded-[6px] border-[1px] bg-black focus:outline-none"
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
        <div className="relative flex flex-col items-start">
          <div className="mt-[38px] text-[16px] font-[500]">Twitter</div>
          {/*绑定框部分*/}
          <div
            className="item-center mr-[-93px] mt-[14px] flex h-[37px] w-[401px] justify-between rounded-[6px] border-[1px] bg-black"
            style={{ borderColor: '#1d1d1d' }}
          >
            <div className="flex-raw item-center ml-[12px] mt-[4px] flex justify-center">
              {/*{!isConnectTwitter ? <Twitter /> : <Upload />}*/}
              <Twitter />
              <div className="ml-[8px] mt-[1.2px]">
                {!isConnectTwitter ? (
                  'Twitter'
                ) : (
                  <a
                    href={`https://twitter.com/${twitterName}`}
                  >{`https://twitter.com/${twitterName}`}</a>
                )}
              </div>
            </div>
            <span
              className="mr-[12px] mt-[5.2px] cursor-pointer"
              style={{ color: '#6E62EE' }}
              onClick={handleTwitterConnect}
            >
              {!isConnectTwitter ? 'Connect' : 'Disconnect'}
            </span>
          </div>
          {/*Submit*/}
          <Button
            color="secondary"
            className="mx-auto mt-[58px] h-[48px] w-[176px] rounded-full text-[14px] "
            onClick={handleUploadAll}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
