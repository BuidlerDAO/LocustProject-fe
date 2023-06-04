import { apiGetStsToken } from '@/apis/login';
import { UUID } from './uuid';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { S3Client } from '@aws-sdk/client-s3';

/**
 * @description 获取client3实例
 */
export const s3Instance = async () => {
  //const { S3Client } = await import('@aws-sdk/client-s3');
  const tokenData: {
    credential: {
      accessKeyId: string;
      expiration: Date;
      secretAccessKey: string;
      sessionToken: string;
    };
    region: string;
    bucket: string;
    host: string;
    objectPrefix: string;
  } = await apiGetStsToken();
  return {
    AWS: new S3Client({
      credentials: {
        accessKeyId: tokenData.credential.accessKeyId,
        secretAccessKey: tokenData.credential.secretAccessKey,
        sessionToken: tokenData.credential.sessionToken,
        expiration: tokenData.credential.expiration
      },
      region: tokenData.region
    }),
    config: tokenData
  };
};

/**
 * @description 上传方法
 */
export const upload = async (req: { key: string; body: any }) => {
  // const { PutObjectCommand } = await import('@aws-sdk/client-s3');
  try {
    const instance = await s3Instance();
    return new Promise((resolve) => {
      const finalKey = `${instance.config.objectPrefix}/${UUID(
        18,
        4
      ).toString()}.${new Date().getTime()}.${
        req.key.split('.')[req.key.split('.').length - 1]
      }`;
      instance.AWS.send(
        new PutObjectCommand({
          Bucket: instance.config.bucket,
          Key: finalKey,
          Body: req.body,
          ContentType: req.body.type
        })
      ).then((e) =>
        resolve({
          msg: e,
          host: instance.config.host,
          key: finalKey
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
