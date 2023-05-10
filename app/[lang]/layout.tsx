import '@/styles/index.css';
import RootLayoutClient from '@/components/layout';
import { Flexible } from '@/components/theme/flexible';
import { Toaster } from '@/components/toast/toast';
import Navbar from '@/components/navbar';
import { Metadata } from 'next';
import { DefaultMetadata } from '@/components/theme/metadata';
import { i18n } from '@/i18n/config';
import { WalletConfigWrapper } from '@/components/wallet';

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
        <WalletConfigWrapper>
          <Toaster />
          <RootLayoutClient>
            <Navbar />
            {children}
          </RootLayoutClient>
        </WalletConfigWrapper>
      </body>
    </html>
  );
}
