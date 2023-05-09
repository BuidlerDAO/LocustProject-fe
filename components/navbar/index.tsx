'use client';
import LayoutLink from '@/components/layout/link';
import { Typography } from '@/components/typography';
import LogoIcon from '@/components/icons/logoIcon';
const Navbar = () => {
  return (
    // <>
    //   <div className="h-16">
    //     <div
    //       style={{ backdropFilter: 'saturate(180%) blur(5px)' }}
    //       className={`z-[100] flex h-16 w-screen items-center justify-between bg-[hsla(0,0%,100%,.8)] bg-white transition-opacity `}
    //     >
    //       navbar
    //     </div>
    //   </div>
    // </>
    <div className={`fixed z-50 flex h-[80px] w-full flex-wrap items-center`}>
      <div className="sticky inset-0 z-10 flex h-full w-full max-w-full items-center px-8 py-2 lg:px-10 lg:py-4">
        <div className="text-blue-gray-900 dark:text-blue-gray-100 flex w-full items-center justify-between">
          {/*<LayoutLink href="/" className="flex items-center justify-center">*/}
          <LogoIcon />
          <Typography
            variant="h1"
            className="ml-2 cursor-pointer py-1.5 text-[30px] leading-[30px] dark:text-white"
          >
            MindSeed
          </Typography>
          {/*</LayoutLink>*/}
          <div className="flex">
            <div className="ml-12">{/*<WalletConnect />*/}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
