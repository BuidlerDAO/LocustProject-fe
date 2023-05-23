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
  try {
    const response = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.code === 10000) {
      return result.data;
    } else {
      if (+result.code === 401) {
        // deleteCookie('token');
        // deleteCookie('address');
        // window.location.href = '/';
        throw new Error('401');
      }
      toast.error(`${result.message}`, { id: `${result.message}` });
      return '';
    }
  } catch (error) {
    console.error(error);
  }
};
