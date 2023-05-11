'use client';

import { Typography } from '@/components/typography';
import LogoIconTop from '@/components/icons/logoIconTop';
import Logo from '@/components/icons/logo';
import { WalletConnect } from '@/components/wallet';
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const path = usePathname();
  const flag = path == '/zh-CN' || path == 'en';
  return (
    <div
      className={`relative z-50 flex h-[6rem] w-full flex-wrap items-center bg-black`}
    >
      <div className="sticky inset-0 z-10 flex h-full w-full max-w-full items-center px-8 py-2 lg:px-10 lg:py-4">
        <div className="text-blue-gray-900 dark:text-blue-gray-100 flex w-full items-center justify-between">
          <div className="flex items-center justify-center">
            {/*首页logo只有上半部分*/}
            <div className="mr-[-5px] mt-[-18px]">
              {flag ? <LogoIconTop /> : <Logo />}
            </div>
            <Typography
              variant="h1"
              className="ml-1  py-1.5 text-[30px] leading-[30px] dark:text-white"
            >
              Locusts
            </Typography>
          </div>
          <div className="flex">
            <div className="ml-12">
              <WalletConnect />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
