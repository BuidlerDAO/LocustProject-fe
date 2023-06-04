import { getCookie } from '@/utils/cookie';
import { abi } from '@/apis/abi';
import Toast from '@/components/toast/toast';
import { ethers } from 'ethers';
import { switchWeb3ChainId } from '@/utils/web3';
import { useUserStore } from '@/store';

export async function callContract(type: string) {
  //  addReward 合约地址
  const contractAddress = '0x8140b5163d0352Bbdda5aBF474Bf18cD1899Ce98';
  // 连接到以太坊测试网络
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.getNetwork().then(async (network) => {
    if (network.chainId != 80001) {
      await switchWeb3ChainId('80001');
    }
    //  创建 Contract
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const signer = provider.getSigner();
    const cookieAddress = getCookie('address');
    //  如果地址为 null，或者 cookie 中没有存储地址，则通过 ethereum.request() 方法请求用户授权，并将授权后的地址作为签名者地址。
    if (signer._address === null || cookieAddress === undefined) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.log(error);
      }
    }
    const contractWithSigner = contract.connect(signer);
    try {
      //  两个合约都所需的信息
      //  代币合约地址及数量
      const campaignId = '';
      const spender = '0xaD693A7f67f59e70BE8e6CE201aF1541BFb821f2';
      const tokenType = 1;
      // const addRewardAmount = '';
      const approveAmount = ethers.utils.parseUnits('1', 18);
      const tokens = [
        {
          tokenType: tokenType,
          tokenAddress: spender,
          amount: approveAmount
        }
      ];
      if (type === 'addReward') {
        //  addReward 所需参数
        const createIfNotExists = true;
        await contractWithSigner
          .approve(spender, approveAmount)
          .then(async (res: boolean) => {
            if (res) {
              await contractWithSigner
                .addReward(campaignId, tokens, createIfNotExists)
                .then((res: any) => {
                  Toast.success('Enrollment success', {
                    duration: 4000
                  });
                })
                .catch(() => {
                  Toast.error('Fail to Enrollment ', {
                    duration: 4000
                  });
                });
            } else {
              Toast.error('Fail to Enrollment ', {
                duration: 4000
              });
            }
          });
      } else {
        const nonce = '';
        const signature = '';
        const params = [
          {
            campaignId: campaignId,
            tokens: tokens,
            nonce: nonce,
            signature: signature
          }
        ];
        await contractWithSigner.batchClaimReward(params).then(() => {
          Toast.success('Claim success', {
            duration: 4000
          });
        });
      }
    } catch (error: any) {
      const message = error.message;
      console.log(message);
      if (message.includes('execution reverted')) {
        const start = message.indexOf('execution reverted:') + 19;
        const end = message.indexOf(',', start);
        const errorMessage = message.slice(start, end - 1);
        Toast.error(errorMessage); // 这里会打印 "Address has already claimed tokens"
      }
    }
  });
}
