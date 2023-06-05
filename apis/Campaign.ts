import request from '@/utils/request';
import Toast from '@/components/toast/toast';

export const apiGetCampaignId = async () => {
  const res = await request('/api/campaign/hash');
  if (res.code === 0) {
    return res.data.hashID;
  } else {
    Toast.error(`${res.msg}`);
    return '';
  }
};
