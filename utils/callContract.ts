import { abi, erc20TokenContractAbi } from '@/apis/abi';
import Toast from '@/components/toast/toast';
import { ethers } from 'ethers';
import { switchWeb3ChainId } from '@/utils/web3';

// export async function callContract(type: string) {
//   //  addReward 合约地址
//   const contractAddress = '0x8140b5163d0352Bbdda5aBF474Bf18cD1899Ce98';
//   // 连接到以太坊测试网络
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   provider.getNetwork().then(async (network) => {
//     if (network.chainId != 80001) {
//       await switchWeb3ChainId('80001');
//     }
//     //  创建 Contract
//     const contract = new ethers.Contract(contractAddress, abi, provider);
//     const signer = provider.getSigner();
//     const cookieAddress = getCookie('address');
//     //  如果地址为 null，或者 cookie 中没有存储地址，则通过 ethereum.request() 方法请求用户授权，并将授权后的地址作为签名者地址。
//     if (signer._address === null || cookieAddress === undefined) {
//       try {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     const contractWithSigner = contract.connect(signer);
//     console.log(111);
//     try {
//       //  两个合约都所需的信息
//       //  代币合约地址及数量
//       const campaignId = await apiGetCampaignId();
//       console.log(campaignId);
//       const spender = '0xaD693A7f67f59e70BE8e6CE201aF1541BFb821f2';
//       const tokenType = 1;
//       // const addRewardAmount = '';
//       const approveAmount = ethers.utils.parseUnits('0.001', 18);
//       const tokens = [
//         {
//           tokenType: tokenType,
//           tokenAddress: spender,
//           amount: approveAmount
//         }
//       ];
//       if (type === 'addReward') {
//         console.log(222);
//         //  addReward 所需参数
//         const createIfNotExists = true;
//         await contractWithSigner
//           .approve(spender, approveAmount, { gasLimit: 100000 })
//           .then(async (res: boolean) => {
//             console.log('approve-->', res);
//             if (res) {
//               await contractWithSigner
//                 .addReward(campaignId, tokens, createIfNotExists)
//                 .then((res: any) => {
//                   console.log('addReward-->', res);
//                   Toast.success('Enrollment success', {
//                     duration: 4000
//                   });
//                 })
//                 .catch(() => {
//                   Toast.error('Fail to Enrollment ', {
//                     duration: 4000
//                   });
//                 });
//             } else {
//               Toast.error('Fail to Enrollment ', {
//                 duration: 4000
//               });
//             }
//           });
//       } else {
//         const nonce = '';
//         const signature = '';
//         const params = [
//           {
//             campaignId: campaignId,
//             tokens: tokens,
//             nonce: nonce,
//             signature: signature
//           }
//         ];
//         await contractWithSigner.batchClaimReward(params).then(() => {
//           Toast.success('Claim success', {
//             duration: 4000
//           });
//         });
//       }
//     } catch (error: any) {
//       console.log(error);
//       const message = error.message;
//       // console.log(message);
//       if (message.includes('execution reverted')) {
//         const start = message.indexOf('execution reverted:') + 19;
//         const end = message.indexOf(',', start);
//         const errorMessage = message.slice(start, end - 1);
//         Toast.error(errorMessage); // 这里会打印 "Address has already claimed tokens"
//       }
//     }
//   });
// }
interface CampaignInfo {
  campaignId: number;
  nonce: number;
}
async function getCampaignIdHash(info: CampaignInfo): Promise<string> {
  // 设置 nonce 的默认值为 0
  if (!info.nonce) {
    info.nonce = 0;
  }

  // 使用 ethers 的 solidityKeccak256 函数生成哈希
  return ethers.utils.solidityKeccak256(
    ['uint256', 'uint256'],
    [info.campaignId, info.nonce]
  );
}
async function approveTokens(
  tokenAddress: string,
  targetSpenderAddress: string,
  approveAmount: number
) {
  try {
    // 连接到以太坊
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then(async (network) => {
      if (network.chainId != 80001) {
        await switchWeb3ChainId('80001');
      }
    });
    const signer = provider.getSigner();
    // 创建合约实例
    const contract = new ethers.Contract(
      tokenAddress,
      erc20TokenContractAbi,
      signer
    );
    const amount = ethers.utils.parseUnits(approveAmount.toString(), 18);
    // 发起调用
    const tx = await contract.approve(targetSpenderAddress, amount);
    // 等待交易被矿工打包到区块中，并获取交易回执
    const receipt = await tx.wait();
    console.log('approve Transaction successful with hash: ', tx.hash);
    console.log('approve Transaction receipt: ', receipt);
    Toast.success('Approval successful!');
  } catch (err) {
    console.error('approve Error: ', err);
  }
}
async function addReward(
  contractAddress: string,
  campaignIdHash: string,
  tokens: Array<{ tokenType: number; tokenAddress: string; amount: number }>,
  createIfNotExists: boolean
) {
  try {
    // 连接到以太坊
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then(async (network) => {
      if (network.chainId != 80001) {
        await switchWeb3ChainId('80001');
      }
    });
    const signer = provider.getSigner();
    // 创建合约实例
    const contract = new ethers.Contract(contractAddress, abi, signer);
    // 格式化输入参数
    const formattedTokens = tokens.map((token) => {
      const tokenAmount = ethers.utils.parseUnits(token.amount.toString(), 18);
      return {
        tokenType: ethers.BigNumber.from(token.tokenType), // 0 is native token, 1 is ERC20, 2 is ERC721
        tokenAddress: token.tokenAddress,
        amount: tokenAmount
      };
    });
    // 发起调用
    const tx = await contract.addReward(
      campaignIdHash,
      formattedTokens,
      createIfNotExists,
      {
        gasLimit: ethers.utils.hexlify(1000000) // 100万 gas
      }
    );
    // 等待交易被矿工打包到区块中，并获取交易回执
    const receipt = await tx.wait();
    console.log('addReward Transaction successful with hash: ', tx.hash);
    console.log('addReward Transaction receipt: ', receipt);
    Toast.success('addReward successful!');
  } catch (err) {
    console.error('addReward Error: ', err);
  }
}
async function claimReward(
  contractAddress: string,
  campaignIdHash: string,
  nonce: string,
  signature: string,
  tokens: Array<{ tokenType: number; tokenAddress: string; amount: string }>
) {
  try {
    // 连接到以太坊
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then(async (network) => {
      if (network.chainId != 80001) {
        await switchWeb3ChainId('80001');
      }
    });
    const signer = provider.getSigner();
    // 创建合约实例
    const contract = new ethers.Contract(contractAddress, abi, signer);
    // 发起调用
    const tx = await contract.batchClaimReward(
      campaignIdHash,
      tokens,
      nonce,
      signature,
      {
        gasLimit: ethers.utils.hexlify(1000000) // 100万 gas
      }
    );
    // 等待交易被矿工打包到区块中，并获取交易回执
    const receipt = await tx.wait();
    console.log('claimReward Transaction successful with hash: ', tx.hash);
    console.log('claimReward Transaction receipt: ', receipt);
    Toast.success('claimReward successful!');
  } catch (err) {
    console.error('claimReward Error: ', err);
  }
}

export { approveTokens, addReward, claimReward };
