'use client';

import { ComponentProps, forwardRef, HTMLAttributes, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

import { ClassName } from '@/types/components/theme';

import { Button } from '@/components/button';
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
import ClientOnly from '@/components/clientOnly';
// import { apiLogin } from '@/apis/login';

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

export type WalletProps = ComponentProps<'div'>;

const WalletConnect = forwardRef<HTMLDivElement, WalletProps>(
  ({ className, ...rest }, ref) => {
    // State / Props
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: ensName } = useEnsName({ address });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showManageProfile, setShowManageProfile] = useState(false);

    const handleOpen = () => {
      setDialogOpen(true);
    };

    const handleLogin = async () => {
      // const adds = await getWeb3Account();
      // // const address = checkAddress(adds[0]);
      // const address = adds[0];
      // const msg = 'nicetomeetyou';
      // const sig = await getWeb3SignMessage(msg);
      // if (!sig) return;
      // const res: any = await apiLogin(address, sig, msg);
      // if (res.token) {
      //   setDialogOpen(false);
      // }
    };

    const handleData = async (type: number, data: any) => {
      // if (type) {
      //   setDialogOpen(false);
      // }
      // handleLogin();
    };

    // Render
    return (
      <div {...rest} ref={ref} className={className}>
        <ClientOnly>
          {!isConnected ? (
            <div>
              <Button
                color="primary"
                onClick={() => handleOpen()}
                className="text-[16px] hover:border-[#6E62EE] "
              >
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div>
              <Typography
                variant="paragraph"
                onClick={() => setShowManageProfile(!showManageProfile)}
                className="relative cursor-default"
              >
                {ensName
                  ? ensName
                  : address
                  ? address.replace(/(\w{4})\w+(\w{4})/, '$1...$2')
                  : ''}
                {showManageProfile && (
                  <div
                    className="absolute left-0 top-11 -translate-x-1/2 rounded-2xl bg-[#191A27] p-2"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      boxShadow:
                        '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 8px 1px rgba(0, 0, 0, 0.12)'
                    }}
                  >
                    <a
                      href="/profile"
                      className="flex h-10 w-52 cursor-default items-center rounded-xl hover:cursor-default hover:bg-[#30313d]"
                    >
                      <Profile className="ml-3" />
                      <span className="ml-2 text-base font-semibold text-white">
                        Profile
                      </span>
                    </a>
                    <div className="mx-1 my-2 h-px bg-[#30313d]"></div>
                    <div
                      className="flex h-10 w-52 cursor-default items-center rounded-xl hover:bg-[#30313d]"
                      onClick={() => {
                        disconnect();
                        setShowManageProfile(false);
                      }}
                    >
                      <Disconnect className="ml-3" />
                      <span className="ml-2 text-base font-semibold text-white">
                        Disconnect
                      </span>
                    </div>
                  </div>
                )}
              </Typography>
            </div>
          )}
          <Dialog
            open={dialogOpen}
            handler={(e: any) => setDialogOpen(e)}
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
              <CoinbaseConnect
                onData={handleData}
                className="mt-[14px] whitespace-nowrap"
              />
            </div>
          </Dialog>
        </ClientOnly>
      </div>
    );
  }
);

WalletConnect.displayName = 'WalletConnect';

export default WalletConnect;
