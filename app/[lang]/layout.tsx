import '@/styles/index.css';
import RootLayoutClient from '@/components/layout';
import { Toaster } from '@/components/toast/toast';
import Navbar from '@/components/navbar';
import { Metadata } from 'next/types';
import { DefaultMetadata } from '@/components/theme/metadata';
import { WalletConfigWrapper } from '@/components/wallet';
import { i18n } from '@/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...DefaultMetadata,
    title: '蝗虫产品',
    description: '蝗虫产品'
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
// function flexible(window:any, document:any) {
//   const docEl = document.documentElement;
//   const dpr = window.devicePixelRatio || 1;
//
//   function setBodyFontSize() {
//     if (document.body) {
//       document.body.style.fontSize = 12 * dpr + 'px';
//     } else {
//       document.addEventListener('DOMContentLoaded', setBodyFontSize);
//     }
//   }
//
//   // set 1rem = viewWidth / 10
//   function setRemUnit() {
//     if (docEl.clientWidth > 1280) {
//       // const rem = docEl.clientWidth / 10;
//       const rem = (docEl.clientWidth / 1440) * 16;
//       docEl.style.fontSize = rem + 'px';
//     }
//   }
//
//   // adjust body font size
//   setBodyFontSize();
//
//   setRemUnit();
//
//   // reset rem unit on page resize
//   window.addEventListener('resize', setRemUnit);
//   window.addEventListener('pageshow', function (e:any) {
//     if (e.persisted) {
//       setRemUnit();
//     }
//   });
//
//   // detect 0.5px supports
//   if (dpr >= 2) {
//     const fakeBody = document.createElement('body');
//     const testElement = document.createElement('div');
//     testElement.style.border = '.5px solid transparent';
//     fakeBody.appendChild(testElement);
//     docEl.appendChild(fakeBody);
//     if (testElement.offsetHeight === 1) {
//       docEl.classList.add('hairlines');
//     }
//     docEl.removeChild(fakeBody);
//   }
// }
// flexible(window, document);
export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className="dark">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Toaster />
        <WalletConfigWrapper>
          <RootLayoutClient>
            <Navbar />
            {children}
          </RootLayoutClient>
        </WalletConfigWrapper>
      </body>
    </html>
  );
}
