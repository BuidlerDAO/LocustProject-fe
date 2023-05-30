import { getCookie } from '@/utils/cookie';
import { abi } from '@/apis/abi.json';
import Toast from '@/components/toast/toast';
import { ethers } from 'ethers';
import { switchWeb3ChainId } from '@/utils/web3';
export async function callContract() {
  const contractAddress = '0xB8d30C0246d67Dc1aD419596f68d7a0cDad09060';
  // 连接到以太坊测试网络
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.getNetwork().then(async (network) => {
    if (network.chainId != 5) {
      await switchWeb3ChainId('5');
    }
    //  创建 Contract 实例
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const signer = provider.getSigner();
    const cookieAddress = getCookie('address');
    //  如果地址为 null，或者 cookie 中没有存储地址，则通过 ethereum.request() 方法请求用户授权，并将授权后的地址作为签名者地址。
    if (signer._address == null || cookieAddress == undefined) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.log(error);
      }
    }
    const contractWithSigner = contract.connect(signer);
    try {
      await contractWithSigner.claim().then(() => {
        Toast.success('Enrollment success', {
          duration: 4000
        });
      });
    } catch (error: any) {
      const message = error.message;
      if (message.includes('execution reverted')) {
        const start = message.indexOf('execution reverted:') + 19;
        const end = message.indexOf(',', start);
        const errorMessage = message.slice(start, end - 1);
        Toast.error(errorMessage); // 这里会打印 "Address has already claimed tokens"
      }
    }
  });
}
