import request from '@/utils/request';
import toast from '@/components/toast/toast';

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
  sig: string,
  avatar: string
) => {
  const res: any = await request(`/api/v1/user/login`, {
    method: 'POST',
    body: {
      address,
      sig,
      avatar
    }
  });

  if (res.code === 0) {
    // 这里直接塞localStorage。不需要在业务塞了
    localStorage.setItem(
      'token',
      JSON.stringify({
        data: res.data.token,
        time: new Date().getTime()
      })
    );
    localStorage.setItem('address', address);
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
  const res: any = await request(`/api/v1/sts/token`);
  if (res.code === 0) {
    return res.data;
  } else {
    if (+res.code === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('address');
      window.location.href = '/home';
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
