import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface MyProps {
  children?: ReactNode;
}
const SignUp: FC<MyProps> = () => {
  return <>SignUp</>;
};

export default memo(SignUp);
