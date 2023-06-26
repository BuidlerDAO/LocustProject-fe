import { UUID } from './uuid';
import { apiGetStsToken } from '@/apis/login';
import CryptoJS from 'crypto-js';

/**
 * @description 获取s3凭证
 */
export const s3Instance = async () => {
  const tokenData: {
    credential: {
      accessKeyId: string;
      expiration: string;
      secretAccessKey: string;
      sessionToken: string;
    };
    region: string;
    bucket: string;
    host: string;
    objectPrefix: string;
  } = await apiGetStsToken();
  return {
    accessKeyId: tokenData.credential.accessKeyId,
    secretAccessKey: tokenData.credential.secretAccessKey,
    sessionToken: tokenData.credential.sessionToken,
    expiration: tokenData.credential.expiration,
    region: 'us-east-1',
    bucket: tokenData.bucket,
    host: tokenData.host,
    objectPrefix: tokenData.objectPrefix
  };
};

export const upload = async (req: { key: string; body: any }) => {
  try {
    const instance = await s3Instance();
    return new Promise((resolve, reject) => {
      // 生成一个随机文件名
      const finalKey = `${
        instance.objectPrefix
      }/${UUID().toString()}.${new Date().getTime()}.${
        req.key.split('.')[req.key.split('.').length - 1]
      }`;

      // 获取密钥
      const form = s3_upload_form(instance, finalKey);

      // 新建一个formdata 对象
      const data = new FormData();

      // 为formdata 对象赋值
      data.append('acl', form['acl']);
      data.append('key', form['key']);
      data.append('Content-Type', req.body.type);
      data.append('policy', form['policy']);
      data.append('success_action_status', form['success_action_status']);
      data.append('x-amz-algorithm', form['x-amz-algorithm']);
      data.append('x-amz-credential', form['x-amz-credential']);
      data.append('x-amz-date', form['x-amz-date']);
      data.append('x-amz-signature', form['x-amz-signature']);
      data.append('x-amz-meta-tag', form['x-amz-meta-tag']);
      data.append('x-amz-meta-uuid', form['x-amz-meta-uuid']);
      data.append(
        'x-amz-server-side-encryption',
        form['x-amz-server-side-encryption']
      );
      data.append('x-amz-security-token', form['x-amz-security-token']);
      data.append('file', req.body);
      fetch(form.action, {
        body: data,
        method: 'POST'
      })
        .then((e) => {
          console.log(e);
          resolve({
            msg: e,
            host: instance.host,
            key: finalKey
          });
        })
        .catch((err) => reject(err));
    });
  } catch (error) {
    console.log(error);
  }
};

// 上传时需要用的密钥
const s3_upload_form = (
  instance: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    expiration?: string;
    region: string;
    bucket: string;
    host: string;
    objectPrefix: string;
  },
  finalKey: string
) => {
  // post form
  const form: any = {
    acl: 'public-read',
    success_action_status: '201',
    'x-amz-algorithm': 'AWS4-HMAC-SHA256',
    'x-amz-credential':
      instance.accessKeyId +
      '/' +
      getDate() +
      '/' +
      instance.region +
      '/s3/aws4_request',
    'x-amz-date': getDate() + 'T000000Z',
    'x-amz-meta-tag': '',
    'x-amz-meta-uuid': 14365123651274,
    'x-amz-server-side-encryption': 'AES256',
    'x-amz-security-token': instance.sessionToken
  };

  // post 策略
  // 参考 https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-HTTPPOSTConstructPolicy.html
  const policy: any = {
    conditions: [
      { bucket: instance.bucket },
      { acl: 'public-read' },
      ['content-length-range', 32, 10485760],
      { success_action_status: form['success_action_status'] },
      { 'x-amz-algorithm': form['x-amz-algorithm'] },
      { 'x-amz-credential': form['x-amz-credential'] },
      { 'x-amz-date': form['x-amz-date'] },
      { 'x-amz-meta-uuid': '14365123651274' },
      { 'x-amz-server-side-encryption': 'AES256' },
      {
        'x-amz-security-token': form['x-amz-security-token']
      },
      ['starts-with', '$Content-Type', ''],
      ['starts-with', '$x-amz-meta-tag', ''],
      [
        'starts-with',
        '$key',
        `${instance.objectPrefix ? instance.objectPrefix + '/' : ''}`
      ]
    ],
    expiration: instance.expiration ? instance.expiration : getExactDate()
  };

  form['action'] = 'https://' + instance.bucket + '.s3.amazonaws.com/';
  // form['action'] =
  //   'https://' + instance.bucket + '.s3-' + instance.region + '.amazonaws.com/';

  form['key'] = finalKey;

  policy['conditions'].push({ key: finalKey });

  // policy 要base64编码
  form['policy'] = utoa(JSON.stringify(policy));

  console.log(form['policy']);

  // x-amz-signature 最重要的签名值
  form['x-amz-signature'] = sign(
    instance.secretAccessKey,
    instance.region,
    's3',
    form['policy']
  );
  return form;
};

// base64编码方法,兼容中文
const utoa = (str: string) => {
  return window.btoa(decodeURIComponent(encodeURIComponent(str)));
};

// 签名函数
const sign = (key: string, region: string, service: string, msg: string) => {
  // const date = getDate();
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  // CryptoJS 提供的HmacSHA256 方法
  // 参考 https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-authentication-HTTPPOST.html
  const kDate = CryptoJS.HmacSHA256(date, 'AWS4' + key);
  const kRegion = CryptoJS.HmacSHA256(region, kDate);
  const kService = CryptoJS.HmacSHA256(service, kRegion);
  const kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
  return CryptoJS.HmacSHA256(msg, kSigning);
};

// 当前日期 返回20230618
const getDate = () => {
  // 获取当前日期
  const date = new Date();
  const nowYear: string = date.getFullYear().toString();
  // 获取当前月份
  let nowMonth: string = (date.getMonth() + 1).toString();
  // 获取当前是几号
  let nowDate: string = date.getDate().toString();
  // 对月份进行处理，1-9月在前面添加一个“0”
  if (+nowMonth >= 1 && +nowMonth <= 9) {
    nowMonth = '0' + nowMonth;
  }
  // 对月份进行处理，1-9号在前面添加一个“0”
  if (+nowDate >= 0 && +nowDate <= 9) {
    nowDate = '0' + nowDate;
  }
  // return '20230618'
  return nowYear + nowMonth + nowDate;
};

// 获取过期时间,精确到秒
const getExactDate = () => {
  const date = new Date();
  date.setTime(date.getTime() + 1 * 60 * 60 * 1000);

  const nowYear = date.getFullYear();

  // 获取当前月份
  let nowMonth: string = (date.getMonth() + 1).toString();

  // 获取当前是几号
  let nowDate: string = date.getDate().toString();

  let hour: string = date.getHours().toString(); //得到小时
  let minu: string = date.getMinutes().toString(); //得到分钟
  let sec: string = date.getSeconds().toString(); //得到秒
  if (+hour < 10) hour = '0' + hour;
  if (+minu < 10) minu = '0' + minu;
  if (+sec < 10) sec = '0' + sec;

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (+nowMonth >= 1 && +nowMonth <= 9) {
    nowMonth = '0' + nowMonth;
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (+nowDate >= 0 && +nowDate <= 9) {
    nowDate = '0' + nowDate;
  }
  // return '2023-06-18T12:26:18Z'
  return (
    nowYear +
    '-' +
    nowMonth +
    '-' +
    nowDate +
    'T' +
    hour +
    ':' +
    minu +
    ':' +
    sec +
    'Z'
  );
};
