import toast from '@/components/toast/toast';
import axios from 'axios';
import request from '@/utils/request';
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
    //console.log(result);
    if (response.code === 0) {
      toast.success('Submit Success');
      return 'success';
    } else {
      toast.error(`${response.message}`, { id: `${response.message}` });
      return '';
    }
  } catch (error) {
    toast.error(`${error}`, { id: `${error}` });
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
 * @description 获取数据，可更改路径
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
    toast.error(`${error}`, { id: `${error}` });
  }
};

/**
 * @description 删除post数据
 * @params id，url
 * @api https://test-locust-api.buidlerdao.xyz/api/admin/post
 * */
export const apiDeletePostData = async (id: number) => {
  try {
    const res = await request(`/api/post/?id=${id}`, {
      method: 'DELETE'
      //body: { : id }
    });
    if (res.code === 0) {
      toast.success('DELETE SUCCESS');
      return 'success';
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    toast.error(`${error}`, { id: `${error}` });
  }
};

/**
 * @description 获取搜索数据
 * @params url,data
 * @api https://test-locust-api.buidlerdao.xyz/api/post/search
 * */
export const apiGetSearchData = async (data: string) => {
  try {
    const res = await request(`/api/post/search/?title=${data}`, {
      method: 'GET'
    });
    if (res.code === 0) {
      return res.data;
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    toast.error(`${error}`, { id: `${error}` });
  }
};

/**
 * @description 获取活动数据
 * @params campaignId,includeRealBonus
 * @api
 * */
export const apiGetCampaign = async (data: {
  campaignId?: number;
  includeRealBonus?: boolean;
}) => {
  try {
    //当campaignId为空时,则不传campaignId
    const res = await request(
      `/api/campaign/participant?campaignId=${data.campaignId}&includeRealBonus=${data.includeRealBonus}`,
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
    toast.error(`${error}`, { id: `${error}` });
  }
};

/**
 * @description 获取活动数据
 * @params campaignId,includeRealBonus
 * @api
 * */
export const apiGetCurrentCampaign = async () => {
  try {
    const res = await request(`/api/current-campaigns`, {
      method: 'GET'
    });
    if (res.code === 0) {
      return res.data;
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    toast.error(`${error}`, { id: `${error}` });
  }
};

/**
 * @description 获取月份列表数据
 * @params data
 * @api https://test-locust-api.buidlerdao.xyz/api/campaign/search
 * */
export const apiGetMonthList = async (data: string) => {
  try {
    const res = await request(`/api/post/search/?title=${data}`, {
      method: 'GET'
    });
    if (res.code === 0) {
      return res.data;
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    toast.error(`${error}`, { id: `${error}` });
  }
};

/**
 * @description 管理员确认发放奖励
 * @api https://test-locust-api.buidlerdao.xyz/api/campaign/confirm
 * */
export const apiConfirmCampaign = async (id: number) => {
  try {
    const res = await request('/api/campaign/confirm', {
      method: 'POST',
      body: { id: id }
    });
    if (res.code === 0) {
      toast.success('Confirm Success');
      return 'success';
    } else {
      toast.error(`${res.message}`, { id: `${res.message}` });
      return '';
    }
  } catch (error) {
    toast.error(`${error}`, { id: `${error}` });
  }
};
