// export const abi = [
//   { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
//   {
//     inputs: [
//       { internalType: 'address', name: 'tokenAddress', type: 'address' },
//       { internalType: 'uint256', name: 'amount', type: 'uint256' }
//     ],
//     name: 'addToken',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [],
//     name: 'admin',
//     outputs: [{ internalType: 'address', name: '', type: 'address' }],
//     stateMutability: 'view',
//     type: 'function'
//   },
//   {
//     inputs: [],
//     name: 'claim',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'tokenAddress', type: 'address' }
//     ],
//     name: 'deleteToken',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'address', name: '', type: 'address' }],
//     name: 'hasClaimed',
//     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//     stateMutability: 'view',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'address', name: 'recipient', type: 'address' }],
//     name: 'mintFor',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'tokenAddress', type: 'address' },
//       { internalType: 'uint256', name: 'newAmount', type: 'uint256' }
//     ],
//     name: 'setTokenAmount',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'address', name: '', type: 'address' }],
//     name: 'tokenAmounts',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     name: 'tokens',
//     outputs: [{ internalType: 'address', name: '', type: 'address' }],
//     stateMutability: 'view',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'address', name: 'newAdmin', type: 'address' }],
//     name: 'transferAdmin',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   }
// ];
export const abi = [
  {
    input: [
      {
        //  目标地址
        name: '_to',
        type: 'address'
      },
      {
        //  金额
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        // 返回状态标志是否转账成功
        state: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
