import toast from '@/components/toast/toast';
import request from '@/utils/request';
import { deleteCookie } from '@/utils/cookie';

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

/**
 * @description discord
 * @params authorizationCode
 * @params redirectUri
 */
export const apiUserAuthDiscord = async (
  authorizationCode: string,
  redirectUri: string
) => {
  const res: any = await request(
    `/api/v1/oauth/discord-user?authorizationCode=${authorizationCode}&redirectUri=${redirectUri}`
  );

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
 * @description org discord
 * @params authorizationCode
 * @params redirectUri
 */
export const apiOrgAuthDiscord = async (
  authorizationCode: string,
  redirectUri: string
) => {
  const res: any = await request(
    `/api/v1/oauth/discord-admin-guild?authorizationCode=${authorizationCode}&redirectUri=${redirectUri}`
  );

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
