import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Button } from '@/components/button';

interface MyProps {
  children?: ReactNode;
}
const SignUpCard: FC<MyProps> = () => {
  return (
    <div>
      <Button color={'secondary'} className="h-[38px] w-[92px] rounded-[24px]">
        Outline
      </Button>
      <div className="flex  h-screen">SignUpCard</div>
    </div>
  );
};

export default memo(SignUpCard);
