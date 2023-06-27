export const adminABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'campaignId',
        type: 'bytes32'
      }
    ],
    name: 'CampaignCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8'
      }
    ],
    name: 'Initialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'campaignId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'payer',
        type: 'address'
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
        indexed: false,
        internalType: 'struct GrowlightVault.TokenInfo[]',
        name: 'tokens',
        type: 'tuple[]'
      }
    ],
    name: 'TokenAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'campaignId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
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
        indexed: false,
        internalType: 'struct GrowlightVault.TokenInfo[]',
        name: 'tokens',
        type: 'tuple[]'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256'
      }
    ],
    name: 'TokenClaimed',
    type: 'event'
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
        internalType: 'uint256[]',
        name: '_maxTokenAmounts',
        type: 'uint256[]'
      },
      {
        internalType: 'bool',
        name: '_createIfNotExists',
        type: 'bool'
      }
    ],
    name: 'addToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'campaignId',
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
            name: 'tokens',
            type: 'tuple[]'
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes'
          }
        ],
        internalType: 'struct GrowlightVault.ClaimTokenParam[]',
        name: '_params',
        type: 'tuple[]'
      }
    ],
    name: 'batchClaimToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'campaigns',
    outputs: [
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
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
    name: 'claimToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'claimedHash',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_campaignId',
        type: 'bytes32'
      }
    ],
    name: 'existsCampaign',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
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
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      }
    ],
    name: 'getCampaignAccountToken',
    outputs: [
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
        internalType: 'struct GrowlightVault.TokenInfo',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
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
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      }
    ],
    name: 'getCampaignToken',
    outputs: [
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
        internalType: 'struct GrowlightVault.TokenInfo',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
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
        internalType: 'address payable',
        name: '_recipient',
        type: 'address'
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
      }
    ],
    name: 'refund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'uintToString',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  }
];

export const erc20TokenContractAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
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
