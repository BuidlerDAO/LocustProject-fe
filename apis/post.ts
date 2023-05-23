import toast from '@/components/toast/toast';
import request from '@/utils/request';
import { deleteCookie } from '@/utils/cookie';
import { usePostStore } from '@/store';

/**
 * @description post post data
 * @params authorizationCode
 * @params redirectUri
 * @api https://test-locust-api.buidlerdao.xyz/api/post
 */
export const apiPostData = async (data: any) => {
  const headers = { 'Content-Type': 'application/json' };
  const res: any = await request(`/api/post`, {
    method: 'POST',
    headers,
    body: data
  });
  if (res.code === 10000) {
    return res.data;
  } else {
    if (+res.code === 401) {
      // deleteCookie('token');
      // deleteCookie('address');
      // window.location.href = '/';
      throw new Error('401');
    }
    toast.error(`${res.message}`, { id: `${res.message}` });
    return '';
  }
};
