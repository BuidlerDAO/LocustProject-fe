import request from '@/utils/request';
import Toast from '@/components/toast/toast';

export const apiGetCampaignInfo = async () => {
  const res = await request('/api/current=campaign');
  if (res.code === 0) {
    return res.data;
  } else {
    Toast.error(`${res.msg}`);
    return '';
  }
};
export const apiPostCampaign = async (campaignId: number) => {
  const res: any = await request(`/api/campaign/participant`, {
    method: 'POST',
    body: {
      campaignId
    }
  });
  if (res.code === 0) {
    Toast.success(`Sign up success`);
    return res.data;
  }
};
