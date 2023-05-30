import React, { memo, ReactNode } from 'react';
import Link from 'next/link';

interface MyProps {
  children?: ReactNode;
  flag: boolean;
  path: string;
}

const LinkComponents = (props: MyProps) => {
  const { children, flag, path } = props;
  return <>{flag ? <Link href={`/${path}`}>{children}</Link> : { props }}</>;
};

export default memo(LinkComponents);
