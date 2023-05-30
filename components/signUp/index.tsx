import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { useUserStore } from '@/store';

import { callContract } from '@/utils/callContract';
interface MyProps {
  children?: ReactNode;
}
const SignUp: FC<MyProps> = () => {
  const { isSignUp } = useUserStore();
  const contractAddress = '0xB8d30C0246d67Dc1aD419596f68d7a0cDad09060';
  return (
    <button onClick={() => callContract(contractAddress)}>
      Sign Up for Locust
    </button>
  );
};

export default memo(SignUp);
