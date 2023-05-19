'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function ClientOnly({ children }: { children: ReactNode }) {
  // State / Props
  const [hasMounted, setHasMounted] = useState(false);

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;

  return <div>{children}</div>;
}
