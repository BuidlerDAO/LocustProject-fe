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
  try {
    res.setHeader('Set-Cookie', [
      cookie.serialize('address', String(''), {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }),
      cookie.serialize('token', String(''), {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
    ]);
    return res.status(200).json({
      code: 0,
      message: 'Success'
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({
      code: 500,
      message: 'Error'
    });
  }
}
