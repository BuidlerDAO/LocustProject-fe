import { LoginReqType, LoginResType, ResType } from '@/types/api';
import request from '@/utils/request';
/**
 * @description 获取
 */
export const apiUploadS3 = async (data: any) => {
  console.log(88888);
  const res: any = await fetch(`/api/upload`, {
    method: 'GET'
  });
  // const res: LoginResType = await request(`/api/upload`, {
  //   method: 'POST',
  //   body: data
  // });
  console.log(666, res);
  return res;
};
