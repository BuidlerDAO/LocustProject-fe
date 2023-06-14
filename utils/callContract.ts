import { abi, erc20TokenContractAbi } from '@/apis/abi';
import Toast from '@/components/toast/toast';
import { BigNumber, ethers } from 'ethers';
import { switchWeb3ChainId } from '@/utils/web3';

async function approveTokens(
  tokenAddress: string,
  targetSpenderAddress: string,
  approveAmount: string
) {
  // try {
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
  const amount = ethers.BigNumber.from(`0x${approveAmount}`);
  // const amount = `0x${ethers.BigNumber.from(approveAmount)}`
  // 发起调用
  const tx = await contract.approve(targetSpenderAddress, amount);
  // 等待交易被矿工打包到区块中，并获取交易回执
  const receipt = await tx.wait();
  console.log('approve Transaction successful with hash: ', tx.hash);
  console.log('approve Transaction receipt: ', receipt);
  Toast.success('Approval successful!');
  // }
  // catch (err) {
  //   Toast.error('approve Error!')
  //   console.error('approve Error: ', err);
  // }
}
async function addReward(
  contractAddress: string,
  campaignIdHash: string,
  tokens: Array<{ tokenType: number; tokenAddress: string; amount: string }>,
  maxTokenAmounts: string,
  createIfNotExists: boolean
) {
  // try {
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
    const tokenAmount = ethers.BigNumber.from(`0x${token.amount}`);
    return {
      tokenType: ethers.BigNumber.from(token.tokenType), // 0 is native token, 1 is ERC20, 2 is ERC721
      tokenAddress: token.tokenAddress,
      amount: tokenAmount
    };
  });
  const formatMaxTokens = ethers.BigNumber.from(`0x${maxTokenAmounts}`);
  // 发起调用
  const tx = await contract.addToken(
    campaignIdHash,
    formattedTokens,
    formatMaxTokens,
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
  // }
  // catch (err) {
  //   Toast.error('addReward Error!')
  //   console.error('addReward Error: ', err);
  // }
}
async function claimReward(
  contractAddress: string,
  campaignIdHash: string,
  tokens: Array<{ tokenType: number; tokenAddress: string; amount: number }>,
  nonce: string,
  signature: string
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
    const tx = await contract.claimToken(
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
    Toast.error('claimReward Error!');
    console.error('claimReward Error: ', err);
  }
}

export { approveTokens, addReward, claimReward };
