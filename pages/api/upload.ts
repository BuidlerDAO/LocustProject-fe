import type { NextApiRequest, NextApiResponse } from 'next';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';

interface StsTokenResponse {
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
}

async function apiGetStsToken(): Promise<StsTokenResponse> {
  const response = await fetch(`${process.env.BACKEND_URL}/api/sts/s3`);

  if (!response.ok) {
    throw new Error('Failed to fetch STS token');
  }

  const res = await response.json();

  if (res.code !== 0) {
    throw new Error(res.msg);
  }

  return res.data;
}

async function getS3Client() {
  const tokenData = await apiGetStsToken();

  return {
    client: new S3Client({
      region: tokenData.region,
      credentials: {
        accessKeyId: tokenData.credential.accessKeyId,
        secretAccessKey: tokenData.credential.secretAccessKey,
        sessionToken: tokenData.credential.sessionToken
      }
    }),
    config: tokenData
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({ error: 'Internal Server Error' });
  } else if (req.method === 'POST') {
    try {
      const uniqueKey = uuidv4();
      const finalKey = `${uniqueKey}.${new Date().getTime()}`;

      const { client, config } = await getS3Client();

      // Create a new PutObjectCommand
      const command = new PutObjectCommand({
        Bucket: config.bucket,
        Key: `${config.objectPrefix}/${finalKey}`,
        Body: req.body,
        ContentType: req.body.type // set ContentType
      });

      // Upload the object to S3
      await client.send(command);

      // Generate the URL of the uploaded file
      const fileUrl = `${config.host}/${config.bucket}/${config.objectPrefix}/${finalKey}`;

      // Return the URL
      res.status(200).json({ url: fileUrl });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
