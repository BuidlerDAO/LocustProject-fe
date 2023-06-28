import React, { useEffect, useState } from 'react';
import '@/styles/font.css';
import { DollarCircleOutlined } from '@ant-design/icons';
import { DollarIcon } from '../icons';
import { apiGetPostData } from '@/apis/post';
import toast from '../toast/toast';
import { claimReward } from '@/utils/callContract';
import Toast from '../toast/toast';
import { apiGetCampaignInfo, apiPostClaim } from '@/apis/Campaign';
import {
  convertHexToDecimal,
  convertHexToDecimalWithScale
} from '@/utils/16to10';
import { ethers } from 'ethers';
import { erc20TokenContractAbi } from '@/apis/abi';
const UserDataCard = () => {
  // 合约相关数据
  const [id, setId] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [tokenAddress, setTokenAddress] = useState(null);
  const [requiredPledgedAmount, setRequiredPledgedAmount] = useState(0);
  const [hashId, setHashId] = useState(null);

  // 页面数据
  const [countPoints, setCountPoints] = useState<string>('0');
  const [Awarded, setAwarded] = useState<string>('0');
  const [Pending, setPending] = useState<string>('0');
  const [tokenSymbol, setTokenSymbol] = useState<string>('U');
  const [tokenDecimals, setTokenDecimals] = useState(0);

  const getCountPoints = async () => {
    const { id, contractAddress, tokenAddress, requiredPledgedAmount, hashId } =
      (await getCampaignInfo()) ?? {};
    const { symbol, decimals } = await getERC20TokenInfo(tokenAddress);
    setTokenSymbol(symbol);
    setTokenDecimals(decimals);
    Promise.all([apiGetPostData('/api/campaign/my-bonus')])
      .then((values: any) => {
        setCountPoints(
          convertHexToDecimalWithScale(values[0].claimedBonus, decimals)
        );
        setAwarded(
          convertHexToDecimalWithScale(values[0].totalBonus, decimals)
        );
        setPending(
          convertHexToDecimalWithScale(values[0].pendingBonus, decimals)
        );
      })
      .catch((err) => {
        toast.error('Failed to get data', {
          duration: 4000
        });
        console.log(err);
      });
  };

  async function getERC20TokenInfo(tokenAddress: string) {
    // 连接到测试网
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // 创建合约实例
    const contract = new ethers.Contract(
      tokenAddress,
      erc20TokenContractAbi,
      signer
    );
    const symbol = (await contract.symbol()) as string;
    const decimals = (await contract.decimals()) as number;

    return { symbol, decimals };
  }

  const getCampaignInfo = async () => {
    try {
      const {
        id,
        contractAddress,
        tokenAddress,
        requiredPledgedAmount,
        hashId
      } = await apiGetCampaignInfo();
      setId(id);
      setContractAddress(contractAddress);
      setTokenAddress(tokenAddress);
      setRequiredPledgedAmount(requiredPledgedAmount);
      setHashId(hashId);
      return {
        id,
        contractAddress,
        tokenAddress,
        requiredPledgedAmount,
        hashId
      };
    } catch (error) {
      console.error(error);
      toast.error(String(error));
    }
  };

  const handleClaimOnclick = async () => {
    const data = await apiPostClaim();

    if (requiredPledgedAmount == 0) {
      toast.warning('You have no bonus to claim');
      return;
    }
    const { nonce, signature } = data.items[0];
    const campaignIdHash = `0x${hashId}`;

    if (contractAddress != null && tokenAddress != null) {
      // '0x8140b5163d0352Bbdda5aBF474Bf18cD1899Ce98', // 奖金池合约
      // tokenAddress: '0xaD693A7f67f59e70BE8e6CE201aF1541BFb821f2', // 代币合约
      // console.log(
      //   contractAddress,
      //   campaignIdHash,
      //   [
      //     {
      //       tokenType: 1,
      //       tokenAddress,

      //       amount: requiredPledgedAmount
      //     }
      //   ],
      //   nonce,
      //   signature
      // );
      await claimReward(
        contractAddress,
        campaignIdHash,
        [
          {
            tokenType: 1,
            tokenAddress,

            amount: requiredPledgedAmount
          }
        ],
        nonce,
        signature
      )
        .then(() => {
          Toast.success('claimReward successful!');
        })
        .catch((e) => {
          Toast.error('claimReward Error!');
          console.log('claimReward Error', e);
        });
    } else {
      const tip = `id=${id}, contractAddress=${contractAddress}, tokenAddress=${tokenAddress}, requiredPledgedAmount=${requiredPledgedAmount}, hashId=${hashId}`;
      toast.warning(tip);
    }
  };

  useEffect(() => {
    getCountPoints();
  }, []);

  return (
    <div
      className={`relative left-[3vw] mt-6 flex h-[113px] w-full items-start`}
    >
      {/* Awarded */}
      <div className="relative flex h-28 w-[21vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(227,245,255,1)]">
        <span className="absolute left-6 top-6 h-auto text-left font-semibold leading-5 text-[rgba(28,28,28,1)]">
          <span>Awarded</span>
        </span>
        <span className="absolute left-6 top-14 h-auto text-left leading-9 text-[rgba(28,28,28,1)]">
          <span className="text-2xl font-semibold">
            {Awarded ? Awarded + ` ${tokenSymbol}` : '0'}
          </span>
        </span>
        <span className=" absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarCircleOutlined style={{ fontSize: '125%', color: 'black' }} />
        </span>
      </div>
      {/* Points Earned */}
      <div className=" relative ml-5 flex h-28 w-[23vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(229,236,246,1)]">
        <span className="absolute left-6 top-6 h-auto text-left font-semibold leading-5 text-[rgba(28,28,28,1)]">
          <span>Points Earned</span>
        </span>
        <span className="absolute left-6 top-14 h-auto text-left leading-9 text-[rgba(28,28,28,1)]">
          <span className="text-2xl font-semibold">{countPoints}</span>
        </span>
        <span className="absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarIcon />
        </span>
      </div>
      {/* Pending bonuses */}
      <div className="relative ml-5 flex h-28 w-[23vw] shrink-0 items-start overflow-hidden rounded-2xl bg-[rgba(227,245,255,1)]">
        <span className="absolute left-6 top-6 h-auto text-left font-semibold leading-5 text-[rgba(28,28,28,1)]">
          <span>Pending bonuses</span>
        </span>
        <span className="absolute left-6 top-14 h-auto text-left leading-9 text-[rgba(28,28,28,1)]">
          <span className="text-2xl font-semibold">
            {Awarded ? Awarded + ` ${tokenSymbol}` : '0'}
          </span>
        </span>
        <span className="absolute right-[2vw] top-[22px] h-6 w-6">
          <DollarCircleOutlined style={{ fontSize: '125%', color: 'black' }} />
        </span>
        <div className="absolute right-[2vw] top-14 flex w-[81px] items-start gap-2 rounded-[44px] bg-[linear-gradient(_180deg,rgba(110,98,238,1)_2%,rgba(63,61,250,1)_100%_)] px-6 py-2">
          <span className="text component3-text12 h-auto text-left text-xs font-medium leading-3 text-white no-underline">
            <button onClick={handleClaimOnclick}>Claim</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDataCard;
