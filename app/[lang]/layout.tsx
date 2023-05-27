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
            <footer className="mb-[-100px] h-[100px] w-full bg-black" />
          </RootLayoutClient>
        </WalletConfigWrapper>
      </body>
    </html>
  );
}
