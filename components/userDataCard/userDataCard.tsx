import React from 'react';
import '@/styles/font.css';
import { DollarCircleOutlined } from '@ant-design/icons';
import { DollarIcon } from '../icons';
import { apiGetPostData } from '@/apis/post';
import toast from '../toast/toast';
import { claimReward } from '@/utils/callContract';
import Toast from '../toast/toast';
import { apiGetCampaignInfo, apiPostClaim } from '@/apis/Campaign';
const UserDataCard = () => {
  const [countPoints, setCountPoints] = React.useState<number>(0);
  const [Awarded, setAwarded] = React.useState<string>('0');
  const [Pending, setPending] = React.useState<string>('0');

  const getCountPoints = async () => {
    Promise.all([apiGetPostData('/api/campaign/my-bonus')])
      .then((values: any) => {
        console.log(values);
        //const newData = values[0].count * 2;
        //setCountPoints(newData);
        // console.log(newData);
        setCountPoints(values[0].claimedBonus);
        setAwarded(values[0].totalBonus);
        setPending(values[0].pendingBonus);
      })
      .catch((err) => {
        toast.error('Failed to get data', {
          duration: 4000
        });
        console.log(err);
      });
  };

  const handleClaimOnclick = async () => {
    const { id, contractAddress, tokenAddress, requiredPledgedAmount, hashId } =
      await apiGetCampaignInfo();
    const data = await apiPostClaim();
    const { nonce, signature } = data.items[0];
    console.log(nonce, signature);
    const campaignIdHash = `0x${hashId}`;
    await claimReward(
      contractAddress,
      // '0x8140b5163d0352Bbdda5aBF474Bf18cD1899Ce98', // 奖金池合约
      campaignIdHash,
      [
        {
          tokenType: 1,
          tokenAddress,
          // tokenAddress: '0xaD693A7f67f59e70BE8e6CE201aF1541BFb821f2', // 代币合约
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
  };
  React.useEffect(() => {
    getCountPoints();
    // getAwarded();
    // getPending();
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
            {Awarded ? Awarded + ' U' : '0 U'}
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
            {Awarded ? Awarded + ' U' : '0 U'}
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
