import toast from '@/components/toast/toast';
import axios from 'axios';
import request from '@/utils/request';
import { deleteCookie } from '@/utils/cookie';
import { PostData, usePostStore } from '@/store';
axios.defaults.baseURL = 'https://test-locust-api.buidlerdao.xyz';
/**
 * @description post post data
 * @params post data
 * @api https://test-locust-api.buidlerdao.xyz/api/post
 */
export const apiPostData = async (data: any) => {
  try {
    const response = await axios.post('/api/post', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
/**
 * @description GET Post List
 * @params data
 */
export const apiGetPostList = async (data: {
  offset?: number;
  limit?: number;
}) => {
  const res: any = await request(
    `/api/post?offset=${data.offset}&limit=${data.limit}`
  );
  if (res.code === 0) {
    const data: PostData = res.data;
    return data;
  } else {
    toast.error(`${res.message}`, { id: `${res.message}` });
    return '';
  }
};
