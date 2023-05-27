// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export const config = {
  api: {
    bodyParser: false
  }
};

type Data = {
  data?: {
    token: string;
    expire: string;
  };
  code: number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query.address || !req.query.signature || !req.query.message)
    return res.status(200).json({
      code: 400,
      message: 'Address is required'
    });
  try {
    const data: any = await fetch(`${process.env.BACKEND_URL}/api/user/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        address: req.query.address,
        signature: req.query.signature,
        message: Buffer.from(req.query.message as string, 'base64').toString(
          'ascii'
        )
      }),
      mode: 'cors',
      cache: 'no-cache'
    }).then((e) => e.json());
    console.log(data);
    if (data.code !== 0)
      return res.status(200).json({
        code: 500,
        message: data.message
      });
    res.setHeader('Set-Cookie', [
      cookie.serialize('address', String(req.query.address), {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }),
      cookie.serialize('token', String(data.data.token), {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
    ]);
    return res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({
      code: 500,
      message: 'Error'
    });
  }
}
