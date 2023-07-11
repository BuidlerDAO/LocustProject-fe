'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Table1, Table2 } from '@/components/table/table';
import DataCard from '@/components/dataCard/dataCard';
import { useUserStore } from '@/store';
import { useRouter } from 'next/navigation';
import { apiConfirmCampaign } from '@/apis/post';
import { apiFinishCampaign, apiGetCampaignInfo } from '@/apis/Campaign';
import { getBalance, getERC20TokenInfo } from '@/utils/callContract';
import { ethers } from 'ethers';
import { switchWeb3ChainId } from '@/utils/web3';
import toast from '@/components/toast/toast';
import {
  convertHexToDecimalWithScale,
  convertStringToDecimalWithScale
} from '@/utils/16to10';

const DataV = () => {
  //奖金确认判断
  const onConfirmBonus = async () => {
    const res = await apiGetCampaignInfo();
    apiFinishCampaign(res.id).then(() => {
      Promise.all([apiConfirmCampaign(res.id)]).then((values: any) => {
        console.log(values);
      });
    });
  };

  const [address, setAddress] = useState(''); // replace with the value you want to copy
  const [balance, setBalance] = useState('');

  //从cookie中获取用户的地址
  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.getNetwork().then(async (network) => {
          if (network.chainId != 80001) {
            await switchWeb3ChainId('80001');
          }
        });
        getContractData(provider);
      } else {
        toast.warning('Please install MetaMask!');
      }
      firstLoad.current = false;
    }
  }, []);

  const getContractData = async (provider: ethers.providers.Web3Provider) => {
    try {
      const {
        id,
        contractAddress,
        tokenAddress,
        requiredPledgedAmount,
        hashId
      } = await apiGetCampaignInfo();
      setAddress(contractAddress);
      const balanceNum = await getBalance(
        provider,
        tokenAddress,
        contractAddress
      );
      const { symbol, decimals } = await getERC20TokenInfo(tokenAddress);
      setBalance(convertStringToDecimalWithScale(balanceNum, decimals));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="ml-[300px] mt-8 flex flex-col pb-40">
        <DataCard address={address} balance={balance} />
        <div>
          <div
            className="mt-7 text-[28px] font-medium leading-9 text-white"
            style={{ fontFamily: 'Inter' }}
          >
            Statistics
          </div>
          <Table1 />
          <Table2 />
        </div>
        <div
          className="mx-auto mt-6 flex cursor-pointer items-center justify-center rounded-[44px] bg-purple3 bg-gradient-to-b p-3 px-[64px] py-[12px] transition-all duration-200 ease-in-out hover:from-purple-500 hover:to-indigo-600"
          onClick={onConfirmBonus}
        >
          <span
            className="h-auto rounded-[44px] text-left text-sm font-medium leading-6 text-white no-underline "
            style={{ fontFamily: 'Inter' }}
          >
            <span>Bonus Confirmation</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default DataV;
