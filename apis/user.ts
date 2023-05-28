import toast from '@/components/toast/toast';
import request from '@/utils/request';
import { deleteCookie } from '@/utils/cookie';

interface TwitterObject {
  oauthToken: string;
  oauthTokenSecret: string;
  verifier: string;
}
interface userInfo {
  avatar: string;
  name: string;
  twitter: TwitterObject;
}
/**
 * @description auth twitter
 * @params authorizationCode
 * @params redirectUri
 * @api https://test-growlight-api.buidlerdao.xyz/api/twitter-bind
 */
export const apiUserAuthTwitter = async (
  authorizationCode: string,
  redirectUri: string
) => {
  const res: any = await request(
    `/api/twitter-bind?AuthorizationCode=${authorizationCode}&RedirectUri=${redirectUri}`
  );

  if (res.code === 0) {
    return res.data;
  } else {
    if (+res.code === 401) {
      deleteCookie('token');
      deleteCookie('address');
      window.location.href = '/';
    }
    toast.error(`${res.message}`, { id: `${res.message}` });
    return '';
  }
};
export const apiUserInfo = async () => {
  const res: any = await request(`/api/user/profile`);
  if (res.code === 0) {
    return res.data;
  } else {
    if (+res.code === 401) {
      deleteCookie('token');
      deleteCookie('address');
      window.location.href = '/';
    }
    toast.error(`${res.message}`, { id: `${res.message}` });
    return '';
  }
};

export const apiTwitterToken = async (url: string) => {
  const res: any = await request(`/api/twitter/oauth-token?callbackUrl=${url}`);
  if (res.code === 0) {
    return res.data;
  } else {
    if (+res.code === 401) {
      deleteCookie('token');
      deleteCookie('address');
      window.location.href = '/';
    }
    console.log(res);
    toast.error(`${res.message}`, { id: `${res.message}` });
    return '';
  }
};
export const apiPutUserInfo = async (data: userInfo) => {
  const res: any = await request(`/api/user/profile`, {
    method: 'PUT',
    body: data
  });
  if (res.code === 0) {
    console.log('000 --> ', res);
    return res.data;
  } else {
    if (+res.code === 401) {
      deleteCookie('token');
      deleteCookie('address');
      window.location.href = '/';
    }
    console.log('!!!!000 --> ', res);
    toast.error(`${res.message}`, { id: `${res.message}` });
    return '';
  }
};
