import { adminABI, erc20TokenContractAbi } from '@/apis/abi';
import Toast from '@/components/toast/toast';
import { BigNumber, ethers } from 'ethers';
import { switchWeb3ChainId } from '@/utils/web3';
import { setCookie } from './cookie';
import { apiPostClaimed } from '@/apis/Campaign';

function remove0x(str: string): string {
  if (str.startsWith('0x')) {
    return str.slice(2);
  }
  return str;
}

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
  // 连接到以太坊
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.getNetwork().then(async (network) => {
    if (network.chainId != 80001) {
      await switchWeb3ChainId('80001');
    }
  });
  const signer = provider.getSigner();
  // 创建合约实例
  const contract = new ethers.Contract(contractAddress, adminABI, signer);
  // 格式化输入参数
  const formattedTokens = tokens.map((token) => {
    const tokenAmount = ethers.BigNumber.from(`0x${token.amount}`);
    return {
      tokenType: ethers.BigNumber.from(token.tokenType), // 0 is native token, 1 is ERC20, 2 is ERC721
      tokenAddress: token.tokenAddress,
      amount: tokenAmount
    };
  });
  const formatMaxTokens = [ethers.BigNumber.from(`0x${maxTokenAmounts}`)];
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
}

export type Reward = {
  contractAddress: string;
  campaignIdHash: string;
  tokens: Array<{
    tokenType: number;
    tokenAddress: string;
    tokenAmount: number;
  }>;
  nonce: string;
  signature: string;
};

async function claimRewards(contractAddress: string, rewards: Reward[]) {
  // 连接到以太坊
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.getNetwork().then(async (network) => {
    if (network.chainId != 80001) {
      await switchWeb3ChainId('80001');
    }
  });
  const signer = provider.getSigner();

  // 批量创建 params
  const params = rewards.map((reward) => {
    const formattedTokens = reward.tokens.map((token) => {
      const thisTokenAmount = ethers.BigNumber.from(`0x${token.tokenAmount}`);
      return {
        tokenType: ethers.BigNumber.from(token.tokenType), // 0 is native token, 1 is ERC20, 2 is ERC721
        tokenAddress: token.tokenAddress,
        amount: thisTokenAmount
      };
    });

    return {
      campaignId: `0x${reward.campaignIdHash}`,
      tokens: formattedTokens,
      nonce: reward.nonce,
      signature: `0x${reward.signature}`
    };
  });

  // 创建合约实例
  const contract = new ethers.Contract(contractAddress, adminABI, signer);

  // 发起批量调用
  try {
    const tx = await contract.batchClaimToken(params, {
      gasLimit: ethers.utils.hexlify(1000000) // 100万 gas
    });

    // 等待交易被矿工打包到区块中，并获取交易回执
    const receipt = await tx.wait();
    console.log('claimReward Transaction successful with hash: ', tx.hash);
    console.log('claimReward Transaction receipt: ', receipt);
    Toast.success('claimReward successful!');
    await apiPostClaimed(remove0x(String(tx.hash)));
  } catch (error) {
    console.log(error);
  }
}

async function claimReward(
  contractAddress: string,
  campaignIdHash: string,
  tokens: Array<{
    tokenType: number;
    tokenAddress: string;
    tokenAmount: number;
  }>,
  nonce: string,
  signature: string
) {
  // 连接到以太坊
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.getNetwork().then(async (network) => {
    if (network.chainId != 80001) {
      await switchWeb3ChainId('80001');
    }
  });
  const signer = provider.getSigner();
  // 创建合约实例
  const contract = new ethers.Contract(contractAddress, adminABI, signer);
  const formattedTokens = tokens.map((token) => {
    const thisTokenAmount = ethers.BigNumber.from(`0x${token.tokenAmount}`);
    return {
      tokenType: ethers.BigNumber.from(token.tokenType), // 0 is native token, 1 is ERC20, 2 is ERC721
      tokenAddress: token.tokenAddress,
      amount: thisTokenAmount
    };
  });

  const params = [
    {
      campaignId: campaignIdHash,
      tokens: formattedTokens,
      nonce: nonce,
      signature: `0x${signature}`
    }
  ];
  // 发起调用
  const tx = await contract.batchClaimToken(params, {
    gasLimit: ethers.utils.hexlify(1000000) // 100万 gas
  });
  // 等待交易被矿工打包到区块中，并获取交易回执
  const receipt = await tx.wait();
  console.log('claimReward Transaction successful with hash: ', tx.hash);
  console.log('claimReward Transaction receipt: ', receipt);
  Toast.success('claimReward successful!');
}

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

  setCookie('tokenSymbol', symbol);
  setCookie('tokenDecimals', decimals.toString());

  return { symbol, decimals };
}

async function getBalance(
  provider: ethers.providers.Web3Provider,
  contractAddress: string,
  address: string
) {
  const signer = provider.getSigner();
  // 创建合约实例
  const contract = new ethers.Contract(
    contractAddress,
    erc20TokenContractAbi,
    signer
  );
  const balance = await contract.balanceOf(address);

  console.log(`The balance of address ${address} is: `, balance.toString());
  return balance.toString();
}

export {
  getERC20TokenInfo,
  approveTokens,
  addReward,
  claimReward,
  claimRewards,
  getBalance
};
