import toast from '@/components/toast/toast';
import axios from 'axios';
import request from '@/utils/request';
import { deleteCookie } from '@/utils/cookie';
import { url } from 'inspector';
axios.defaults.baseURL = 'https://test-locust-api.buidlerdao.xyz';
/**
 * @description post post data
 * @params post data
 * @api https://test-locust-api.buidlerdao.xyz/api/post
 */
export const apiPostData = async (data: any) => {
  try {
    const response = await request('/api/post', {
      method: 'POST',
      body: { ...data }
    });
    const result = response.data;
    console.log(result);
    if (result.code === 10000) {
      return result.data;
    } else {
      if (+result.code === 401) {
        deleteCookie('token');
        deleteCookie('address');
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
    const data: any = res.data;
    return data;
  } else {
    toast.error(`${res.message}`, { id: `${res.message}` });
    return '';
  }
};

/**
 * @description 获取post数据，可更改路径
 * @params url,data
 * @api https://test-locust-api.buidlerdao.xyz/api/post
 * */
export const apiGetPostData = async (url: string) => {
  try {
    const res = await request(url, {
      method: 'GET'
    });
    if (res.code === 0) {
      return res.data;
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description 删除post数据
 * @params id，url
 * @api https://test-locust-api.buidlerdao.xyz/api/admin/post
 * */
export const apiDeletePostData = async (id: number) => {
  try {
    console.log(id);
    const res = await request(`/api/admin/post/`, {
      method: 'DELETE',
      body: id
    });
    if (res.code === 200) {
      toast.success('删除成功');
      return 'success';
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    toast.error(`${error}`, { id: `${error}` });
    console.error(error);
  }
};

/**
 * @description 获取搜索数据
 * @params url,data
 * @api https://test-locust-api.buidlerdao.xyz/api/post/search
 * */
export const apiGetSearchData = async (data: string) => {
  try {
    const res = await request(`/api/post/search/`, {
      method: 'GET',
      body: { data }
    });
    if (res.code === 0) {
      return res.data;
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description 获取某月数据
 * @params url,offset,limit,title
 * @api https://test-locust-api.buidlerdao.xyz/api/admin/campaign
 * */
export const apiGetMonthData = async (data: {
  offset?: number;
  limit?: number;
  title?: string;
}) => {
  try {
    const res = await request(
      `/api/admin/campaign?offset=${data.offset}&limit=${data.limit}&title=${data.title}`,
      {
        method: 'GET'
      }
    );
    if (res.code === 0) {
      return res.data;
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    console.error(error);
  }
};
