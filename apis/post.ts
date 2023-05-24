import toast from '@/components/toast/toast';
import axios from 'axios';
import { deleteCookie } from '@/utils/cookie';
import { usePostStore } from '@/store';

/**
 * @description post post data
 * @params post data
 * @api https://test-locust-api.buidlerdao.xyz/api/post
 */
export const apiPostData = async (data: any) => {
  try {
    const response = await axios.post(
      'https://test-locust-api.buidlerdao.xyz/api/post',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const result = response.data;
    console.log(result);
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
