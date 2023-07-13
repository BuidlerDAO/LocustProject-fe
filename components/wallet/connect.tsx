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
import { apiLogin } from '@/apis/login';
import { deleteCookie, getCookie } from '@/utils/cookie';
import { Dropdown, MenuProps, Space } from 'antd';
import Link from 'next/link';
import DownOutlined from '@/components/icons/downOutLined';
import { usePathname, useRouter } from 'next/navigation';
import Toast from '@/components/toast/toast';
import { useUserStore } from '@/store';
import { apiUserInfo } from '@/apis/user';
import { apiGetCampaignInfo } from '@/apis/Campaign';
interface ConnectProps extends HTMLAttributes<HTMLElement> {
  className?: ClassName;
  onData?: (type: number, data: any) => void;
}

const MetaMaskConnect = ({
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
  const router = useRouter();
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

const WalletConnectBtn = ({
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
  const router = useRouter();
  return (
    <Button
      color="primary"
      className={`flex justify-between rounded-[10px] px-6 hover:bg-[#27272A] active:bg-[#27272A] ${className}`}
      onClick={() => {
        disconnect();
        setTimeout(() => {
          connect();
        }, 4);
        router.push('/home');
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

const CoinbaseConnect = ({
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
  const router = useRouter();
  return (
    <Button
      color="primary"
      className={`flex justify-between rounded-[10px] px-6 hover:bg-[#27272A] active:bg-[#27272A] ${className}`}
      onClick={() => {
        disconnect();
        setTimeout(() => {
          connect();
        }, 4);
        router.push('/home');
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
    const path = usePathname();
    const hasAuth =
      path === '/zh-CN/home/participate' ||
      path === '/zh-CN/home/profile' ||
      path === '/en/home/participate' ||
      path === '/en/home/profile';
    const router = useRouter();
    const {
      setIsAdmin,
      isSignUp,
      isParticipant,
      setIsParticipant,
      setUsername,
      setAvatar,
      setTwitter,
      setIsLogin,
      setIsSignUp,
      resetState
    } = useUserStore();
    // State / Props
    const [updateState, setUpdateState] = useState(0);
    const [loginState, setLoginState] = useState(false);
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
    //  flag 在未登录时是 false，这时点击外部 Button 才会出现弹窗，
    const flag = !!currentAddress;
    //  弹窗 & Profile
    const [dialogOpen, setDialogOpen] = useState(false);
    //  弹窗
    const handleOpen = (flag: boolean) => {
      !flag && setDialogOpen(true);
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
      disconnect();
      deleteCookie('token');
      deleteCookie('address');
      setCurrentAddress('');
      resetState();
      router.push('/home');
    };
    // 登录
    const handleLogin = async () => {
      try {
        const res = await apiLogin(
          address as string,
          msgData as string,
          msg as any
        );
        if (res.token) {
          setCurrentAddress(address || '');
          setLoginState(true);
          setIsLogin(true);
        } else {
          Toast.error('Something Error!');
          disconnect();
        }
        console.log(res);
      } catch (error) {
        Toast.error('login error');
        disconnect();
        router.push('/home');
      }
    };
    //  设置签名
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
        router.push('/home');
      }
    };
    // 下拉框
    const showItems: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <Link
            href="/home/profile"
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              fontWeight: '500',
              fontSize: '16px',
              lineHeight: '21px'
            }}
            className="ml-[32px] font-medium"
          >
            My Profile
          </Link>
        )
      },
      {
        key: '2',
        label: (
          <Link
            href="/home/participate"
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              fontWeight: '500',
              fontSize: '16px',
              lineHeight: '21px'
            }}
            className="ml-[32px] font-medium"
          >
            Event Participation
          </Link>
        )
      },
      {
        key: '3',
        label: (
          <div
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              fontWeight: '500',
              fontSize: '16px',
              lineHeight: '21px'
            }}
            className="ml-[32px] font-medium"
            onClick={handleDisconnect}
          >
            Disconnect
          </div>
        )
      }
    ];
    //  是否报名来渲染参与活动页面
    const items: MenuProps['items'] = isParticipant
      ? showItems
      : showItems.filter((item: any) => item.key === '1' || item.key === '3');
    // 下拉框样式
    const menuStyle = {
      marginTop: '19px',
      backgroundColor: '#1A1A1A',
      border: '1px solid rgba(255, 255, 255, 0.16)',
      borderRadius: '12px'
    };
    const handleAccountChange = (...args: any[]) => {
      const accounts = args[0];
      if (accounts.length === 0) {
        console.log('Please connect to metamask');
      } else if (accounts[0] !== getCookie('address')) {
        Toast.success('Account changed! Please verify account on metamask!');
        setTimeout(() => {
          setUpdateState(updateState + 1);
        }, 2500);
      }
    };
    const setSignUp = () => {
      apiGetCampaignInfo().then((res) => {
        console.log(res);
        if (res.participants.includes(getCookie('address'))) {
          setIsSignUp(true);
          console.log(isSignUp);
        } else {
          setIsSignUp(false);
          console.log(isSignUp);
        }
      });
    };
    //  执行登录
    useEffect(() => {
      console.log('isSuccess', isSuccess);
      if (isSuccess) {
        handleLogin().then(() => {
          setSignUp();
        });
      }
    }, [isSuccess]);
    //  自己设置 token & address 无法通过这层验证
    useEffect(() => {
      if (isConnected && !getCookie('token') && address) {
        handleSign();
      }
      if (getCookie('token') && getCookie('address')) {
        apiUserInfo()
          .then((res) => {
            setCurrentAddress(getCookie('address') || '');
            setUsername(res.username);
            setAvatar(res.avatar);
            setTwitter(res.twitter);
            setIsLogin(true);
            setIsAdmin(res.isAdmin);
            setIsParticipant(res.isParticipant);
            setSignUp();
          })
          .catch((error) => {
            console.log(error);
            router.replace('/');
          });
      }
    }, [address, loginState]);
    //  切换账户
    useEffect(() => {
      if (window.ethereum) {
        window.ethereum.addListener('accountsChanged', handleAccountChange);
        return () => {
          window.ethereum.removeListener(
            'accountsChanged',
            handleAccountChange
          );
        };
      }
    }, []);
    // Render
    return (
      <div {...rest} ref={ref} className={className}>
        <ClientOnly>
          <Button
            color="primary"
            className={`w-[240px] whitespace-nowrap px-10 py-2 text-[16px] font-medium ${
              currentAddress
                ? 'border-[1px] border-solid border-[#434343] bg-[#1A1A1A]'
                : 'hover:border-[#6E62EE]'
            }`}
            style={{ fontFamily: 'Poppins' }}
            onClick={() => handleOpen(flag)}
          >
            {!currentAddress ? (
              // 未连接
              <div>
                <p style={{ fontFamily: 'Poppins', fontWeight: '600' }}>
                  Connect Wallet
                </p>
              </div>
            ) : (
              //  已连接
              <Dropdown
                menu={{ items }}
                placement="bottom"
                overlayStyle={{
                  width: '240px',
                  height: 'auto'
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
                    <Space>
                      {ensName
                        ? ensName
                        : currentAddress
                        ? currentAddress.replace(/(\w{4})\w+(\w{4})/, '$1...$2')
                        : ''}
                    </Space>
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
            <div className="z-[1]">
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
            </div>
          </Button>
        </ClientOnly>
      </div>
    );
  }
);

WalletConnect.displayName = 'WalletConnect';

export default WalletConnect;
