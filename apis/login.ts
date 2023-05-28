import request from '@/utils/request';
import { deleteCookie, setCookie } from '@/utils/cookie';
import Toast from '@/components/toast/toast';

/**
 * @description GET 获取签名
 * @params address 地址
 */
export const apiGetSig = async (address: string) => {
  const res: any = await request(`/api/v1/user/sig-message?address=${address}`);
  if (res.code === 0) {
    return res.data.message;
  } else {
    Toast.error(`${res.msg}`);
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
    Toast.success(`Login success`);
    return res.data;
  } else {
    Toast.error(`${res.msg}`);
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
  console.log(res);
  if (res.code === 0) {
    console.log(111);
    return res.data;
  } else {
    console.log(222);
    if (+res.code === 401) {
      deleteCookie('token');
      deleteCookie('address');
      window.location.href = '/login';
    }
    Toast.error(`${res.msg}`);
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
    Toast.error(`${res.msg}`, { id: `${res.msg}` });
    return '';
  }
};
