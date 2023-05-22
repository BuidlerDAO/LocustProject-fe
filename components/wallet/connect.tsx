'use client';

import React, {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  memo,
  useEffect,
  useState
} from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useSignMessage
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
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
import { apiLogin, apiLogout } from '@/services/login';
import { deleteCookie, getCookie } from '@/utils/cookie';
import { Dropdown, MenuProps, Space } from 'antd';
import Link from 'next/link';
import DownOutlined from '@/components/icons/downOutLined';
import { useRouter } from 'next/navigation';
import Toast from '@/components/toast/toast';
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
  const { disconnect } = useDisconnect();
  return (
    <Button
      color="primary"
      className={`flex justify-between rounded-[10px] px-6 hover:bg-[#27272A] active:bg-[#27272A] ${className}`}
      onClick={() => {
        disconnect();
        setTimeout(() => {
          connect();
        }, 4);
      }}
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
  const { disconnect } = useDisconnect();
  return (
    <Button
      color="primary"
      className={`flex justify-between rounded-[10px] px-6 hover:bg-[#27272A] active:bg-[#27272A] ${className}`}
      onClick={() => {
        disconnect();
        setTimeout(() => {
          connect();
        }, 4);
      }}
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
      appName: 'Locust'
      // jsonRpcUrl: 'https://ethereum.publicnode.com'
    }
  });
  const { connect } = useConnect({
    connector: connector,
    onSuccess: (e) => onData(1, e),
    onError: (e) => onData(0, e)
  });
  const { disconnect } = useDisconnect();
  return (
    <Button
      color="primary"
      className={`flex justify-between rounded-[10px] px-6 hover:bg-[#27272A] active:bg-[#27272A] ${className}`}
      onClick={() => {
        disconnect();
        setTimeout(() => {
          connect();
        }, 4);
      }}
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
    const router = useRouter();
    // State / Props
    // 以太坊网络地址 & 是否链接
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    //  组件内缓存地址
    const [currentAddress, setCurrentAddress] = useState('');
    //  获取 ENS 名称
    const { data: ensName } = useEnsName({
      address: currentAddress as `0x${string}`
    });
    // TODO: 接口修改签名信息格式
    const [msg, setMsg] = useState(
      `Welcome to this. \n\nTimestamp: ${Math.ceil(
        new Date().getTime()
      )}\nnonce: ${Math.ceil(Math.random() * 1000000000000)}`
    );

    const {
      data: msgData,
      isSuccess,
      signMessage
    } = useSignMessage({
      message: msg as any
    });

    //  弹窗 & Profile
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showManageProfile, setShowManageProfile] = useState(false);
    //  弹窗
    const handleOpen = () => {
      setDialogOpen(true);
    };
    //  根据 type 0/1 打开/关闭 弹窗
    const handleData = (type: number, data: any) => {
      console.log(type, data);
      if (type) {
        setDialogOpen(false);
      }
    };
    // 退出登录 & 清空 state
    const handleDisconnect = async () => {
      await apiLogout();
      disconnect();
      setCurrentAddress('');
      setShowManageProfile(false);
    };
    // 登录
    const handleLogin = async () => {
      try {
        const res = await apiLogin({
          address: address as string,
          sig: msgData as string,
          message: msg as any
        });
        if (res.code === 0) {
          setCurrentAddress(address || '');
          router.refresh();
        } else {
          Toast.error(res.message);
          disconnect();
        }
        console.log(res);
      } catch (error) {
        Toast.error('login error');
        disconnect();
      }
    };

    const handleSign = () => {
      try {
        // TODO: 接口修改签名信息格式
        const msg = `Weblocom to this, \n\nTimestamp: ${Math.ceil(
          new Date().getTime()
        )}`;
        setMsg(msg);
        signMessage({
          message: msg
        });
      } catch (error) {
        disconnect();
      }
    };
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
          <p style={{ color: 'white' }} onClick={handleDisconnect}>
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

    useEffect(() => {
      console.log('isSuccess', isSuccess);
      if (isSuccess) {
        handleLogin();
      }
    }, [isSuccess]);

    useEffect(() => {
      if (isConnected && !getCookie('token') && address) {
        handleSign();
      }
      if (getCookie('token') && getCookie('address')) {
        setCurrentAddress(getCookie('address') || '');
      }
    }, [address]);

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

export default memo(WalletConnect);
