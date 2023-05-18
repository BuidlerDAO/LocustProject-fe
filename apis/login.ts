import request from '@/utils/request';
import toast from '@/components/toast/toast';
import { setCookie } from '@/utils/cookie';

/**
 * @description GET 获取签名
 * @params address 地址
 */
export const apiGetSig = async (address: string) => {
  const res: any = await request(`/api/v1/user/sig-message?address=${address}`);
  if (res.code === 0) {
    return res.data.message;
  } else {
    toast.error(`${res.msg}`, { id: `${res.msg}` });
    return '';
  }
};

/**
 * @description POST 登陆
 * @params address 地址
 * @params sig 签名
 */
export const apiLogin = async (
  address: string,
  signature: string,
  message: string
) => {
  const res: any = await request(`/api/user/login`, {
    method: 'POST',
    body: {
      address,
      signature,
      message
    }
  });

  if (res.code === 0) {
    // 这里直接塞localStorage。不需要在业务塞了
    setCookie('token', res.data.token);
    setCookie('address', address);
    toast.success(`Login success`);
    return res.data;
  } else {
    toast.error(`${res.msg}`, { id: `${res.msg}` });
    return '';
  }
};

/**
 * @description POST 获取aws s3 token
 * @params address 地址
 * @params sig 签名
 */
export const apiGetStsToken = async () => {
  const res: any = await request(`/api/sts/s3`);
  if (res.code === 0) {
    return res.data;
  } else {
    if (+res.code === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('address');
      window.location.href = '/login';
    }
    toast.error(`${res.msg}`, { id: `${res.msg}` });
    return '';
  }
};

/**
 * @description POST Popup
 */
export const apiPopupPost = async () => {
  const res: any = await request(`/api/v1/user/popup`, {
    method: 'POST',
    body: {}
  });
  if (res.code === 0) {
    return res.data;
  } else {
    toast.error(`${res.msg}`, { id: `${res.msg}` });
    return '';
  }
};
