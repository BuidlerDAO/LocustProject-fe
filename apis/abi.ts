export const abi = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_campaignId',
        type: 'bytes32'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenType',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        internalType: 'struct GrowlightVault.TokenInfo[]',
        name: '_tokens',
        type: 'tuple[]'
      },
      {
        internalType: 'bool',
        name: '_createIfNotExists',
        type: 'bool'
      }
    ],
    name: 'addReward',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_campaignId',
        type: 'bytes32'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenType',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        internalType: 'struct GrowlightVault.TokenInfo[]',
        name: '_tokens',
        type: 'tuple[]'
      },
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      }
    ],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sp ender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
