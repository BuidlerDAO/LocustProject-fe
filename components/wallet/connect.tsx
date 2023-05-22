'use client';

import React, {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  useState
} from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

import { ClassName } from '@/types/components/theme';

import { Button } from '@/components/button';
import ClientOnly from '@/components/clientOnly';
import { Typography } from '@/components/typography';
import { Dialog, DialogHeader } from '@/components/dialog';
import {
  ArrowRight,
  CoinbaseIcon,
  MetamaskIcon,
  WalletConnectIcon
} from '@/components/icons';
import Profile from '../icons/profile';
import Disconnect from '../icons/disconnect';
import { getWeb3Account, getWeb3SignMessage } from '@/utils/web3';
import { apiLogin } from '@/apis/login';
import { Dropdown, MenuProps, Space } from 'antd';
import Link from 'next/link';
import DownOutlined from '@/components/icons/downOutLined';

interface ConnectProps extends HTMLAttributes<HTMLElement> {
  className?: ClassName;
  onData?: (type: number, data: any) => void;
}

export const MetaMaskConnect = ({
  onData = () => null,
  className,
  ...reset
}: ConnectProps) => {
  const connector = new MetaMaskConnector();
  const { connect } = useConnect({
    connector: connector,
    onSuccess: (e) => onData(1, e),
    onError: (e) => onData(0, e)
  });

  return (
    <Button
      color="primary"
      className={`flex justify-between rounded-[10px] px-6 hover:bg-[#27272A] active:bg-[#27272A] ${className}`}
      onClick={() => connect()}
    >
      <div className="flex items-center">
        <MetamaskIcon className="mr-3" />
        <Typography>MetaMask</Typography>
      </div>
      <ArrowRight />
    </Button>
  );
};

export const WalletConnectBtn = ({
  onData = () => null,
  className,
  ...reset
}: ConnectProps) => {
  // const connector = new WalletConnectConnector({
  //   options: {
  //     projectId: '59bace3301d123aff8edddca836506a2'
  //   }
  // });
  const connector = new InjectedConnector();
  const { connect } = useConnect({
    connector: connector,
    onSuccess: (e) => onData(1, e),
    onError: (e) => onData(0, e)
  });

  return (
    <Button
      color="primary"
      className={`flex justify-between rounded-[10px] px-6 hover:bg-[#27272A] active:bg-[#27272A] ${className}`}
      onClick={() => connect()}
    >
      <div className="flex items-center">
        <WalletConnectIcon className="mr-3" />
        <Typography>WalletConnect</Typography>
      </div>
      <ArrowRight />
    </Button>
  );
};

export const CoinbaseConnect = ({
  onData = () => null,
  className,
  ...reset
}: ConnectProps) => {
  const connector = new CoinbaseWalletConnector({
    options: {
      appName: 'MindSeed'
      // jsonRpcUrl: 'https://ethereum.publicnode.com'
    }
  });
  const { connect } = useConnect({
    connector: connector,
    onSuccess: (e) => onData(1, e),
    onError: (e) => onData(0, e)
  });

  return (
    <Button
      color="primary"
      className={`flex justify-between rounded-[10px] px-6 hover:bg-[#27272A] active:bg-[#27272A] ${className}`}
      onClick={() => connect()}
    >
      <div className="flex items-center">
        <CoinbaseIcon className="mr-3" />
        <Typography>Coinbase Wallet</Typography>
      </div>
      <ArrowRight />
    </Button>
  );
};

export interface WalletProps extends ComponentProps<'div'> {
  className?: ClassName;
}

const WalletConnect = forwardRef<HTMLDivElement, WalletProps>(
  ({ className, ...rest }, ref) => {
    // 下拉框
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <Link href="/home/profile" style={{ color: 'white' }}>
            My Profile
          </Link>
        )
      },
      {
        key: '2',
        label: (
          <Link
            href="/home/participate"
            style={{ color: 'white', whiteSpace: 'nowrap' }}
          >
            Event Participation
          </Link>
        )
      },
      {
        key: '3',
        label: (
          <p
            style={{ color: 'white' }}
            onClick={() => {
              disconnect();
              setShowManageProfile(false);
            }}
          >
            Disconnect
          </p>
        )
      }
    ];
    // 下拉框样式
    const menuStyle = {
      backgroundColor: '#1A1A1A',
      borderRadius: '12px'
    };

    // State / Props
    // 以太坊网络地址 & 是否链接
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    //  获取 ENS 名称
    const { data: ensName } = useEnsName({ address });

    //  弹窗 & Profile
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showManageProfile, setShowManageProfile] = useState(false);

    //  弹窗
    const handleOpen = () => {
      setDialogOpen(true);
    };

    //  登录
    const handleLogin = async () => {
      const adds = await getWeb3Account();
      // const address = checkAddress(adds[0]);
      const address = adds[0];
      const msg = 'Nice to meet you';
      const sig = await getWeb3SignMessage(msg);
      if (!sig) return;
      const res: any = await apiLogin(address, sig, msg);
      if (res.token) {
        setDialogOpen(false);
      }
    };

    //  根据 type 的 0/1 判断是否登录成功
    const handleData = async (type: number, data: any) => {
      if (type) {
        setDialogOpen(false);
      }
      handleLogin();
    };

    // Render
    return (
      <div {...rest} ref={ref} className={className}>
        <ClientOnly>
          <Button
            color="primary"
            className={`w-[240px] whitespace-nowrap px-10 py-2 text-[16px] font-semibold ${
              isConnected
                ? 'border-black bg-[#1A1A1A]'
                : 'hover:border-[#6E62EE]'
            }`}
            onClick={() => handleOpen()}
          >
            {!isConnected ? (
              // 未连接
              <div>
                <p style={{ fontFamily: 'Outfit', fontWeight: '600' }}>
                  Connect Wallet
                </p>
              </div>
            ) : (
              //  已链接
              <Dropdown
                menu={{ items }}
                placement="bottom"
                overlayStyle={{
                  paddingTop: '14px',
                  width: '240px',
                  height: '136px'
                }}
                dropdownRender={(menu) => (
                  <div>
                    {React.cloneElement(menu as React.ReactElement, {
                      style: menuStyle
                    })}
                  </div>
                )}
              >
                <div>
                  <a
                    onClick={(e) => e.preventDefault()}
                    className="flex justify-between"
                  >
                    <Space>0x4c....3333</Space>
                    <div className="ml-[0.8vw] mt-[8px]">
                      <DownOutlined />
                    </div>
                  </a>
                </div>
              </Dropdown>

              // 原代码抽取功能
              // <div>
              //   <Typography
              //     variant="paragraph"
              //     onClick={() => setShowManageProfile(!showManageProfile)}
              //     className="relative cursor-default"
              //   >
              //     {/*ensName 简写*/}
              //     {ensName
              //       ? ensName
              //       : address
              //       ? address.replace(/(\w{4})\w+(\w{4})/, '$1...$2')
              //       : ''}
              //     {showManageProfile && (
              //       <div
              //         className="absolute left-0 top-11 -translate-x-1/2 rounded-2xl bg-[#191A27] p-2"
              //         style={{
              //           border: '1px solid rgba(255, 255, 255, 0.16)',
              //           boxShadow:
              //             '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 8px 1px rgba(0, 0, 0, 0.12)'
              //         }}
              //       >
              //         <a
              //           href="/profile"
              //           className="flex h-10 w-52 cursor-default items-center rounded-xl hover:cursor-default hover:bg-[#30313d]"
              //         >
              //           <Profile className="ml-3" />
              //           <span className="ml-2 text-base font-semibold text-white">
              //             Profile
              //           </span>
              //         </a>
              //         <div className="mx-1 my-2 h-px bg-[#30313d]"></div>
              //         <div
              //           className="flex h-10 w-52 cursor-default items-center rounded-xl hover:bg-[#30313d]"
              //           onClick={() => {
              //             disconnect();
              //             setShowManageProfile(false);
              //           }}
              //         >
              //           <Disconnect className="ml-3" />
              //           <span className="ml-2 text-base font-semibold text-white">
              //             Disconnect
              //           </span>
              //         </div>
              //       </div>
              //     )}
              //   </Typography>
              // </div>
            )}
            {/*弹窗组件以及三个钱包*/}
            <Dialog
              open={dialogOpen}
              handler={(e) => setDialogOpen(e)}
              size="sm"
            >
              <DialogHeader
                subTitle="More wallet support is on the way"
                title="Choose your wallet"
                showClose={true}
                onClose={setDialogOpen}
              />
              <div className="mx-9 mb-8 mt-3">
                <MetaMaskConnect onData={handleData} className="mt-[14px]" />
                <WalletConnectBtn onData={handleData} className="mt-[14px]" />
                <CoinbaseConnect onData={handleData} className="mt-[14px]" />
              </div>
            </Dialog>
          </Button>
        </ClientOnly>
      </div>
    );
  }
);

WalletConnect.displayName = 'WalletConnect';

export default WalletConnect;
