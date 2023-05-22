import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store';

function withAuth<T extends object>(Component: React.ComponentType<T>) {
  const Router = useRouter();
  const { isAdmin } = useUserStore();
  console.log('isAdmin', isAdmin);
  if (isAdmin) {
    return Component;
  } else {
    Router.replace('/');
    return null;
  }
}

export default withAuth;
