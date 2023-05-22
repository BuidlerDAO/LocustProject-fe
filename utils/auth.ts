import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store';

function withAuth<T extends object>(Component: React.ComponentType<T>) {
  const Router = useRouter();
  const { isAdmin } = useUserStore();
  const AuthedComponent = (props: T) => {
    // 在这里进行用户鉴权
    const user = isAdmin;
    if (!user) {
      Router.replace('/login');
      return null;
    }
    // 鉴权通过，返回改装后的子组件
    //const returnCompnent = <Component {...props} />:;
    return Component;
  };
  return AuthedComponent;
}

export default withAuth;
