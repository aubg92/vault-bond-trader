export const VaultBondTrader = {
  address: '0x...', // Will be set after deployment
  abi: [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_verifier",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        }
      ],
      "name": "BondCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isVerified",
          "type": "bool"
        }
      ],
      "name": "BondVerified",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "totalVolume",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "activeBonds",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "totalTrades",
          "type": "uint32"
        }
      ],
      "name": "MarketStatsUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "reputation",
          "type": "uint32"
        }
      ],
      "name": "ReputationUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tradeId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "trader",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isBuy",
          "type": "bool"
        }
      ],
      "name": "TradeExecuted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        }
      ],
      "name": "calculateYield",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        }
      ],
      "name": "deactivateBond",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_issuer",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_faceValue",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_couponRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maturityDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_totalSupply",
          "type": "uint256"
        }
      ],
      "name": "createBond",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "amount",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "price",
          "type": "bytes"
        },
        {
          "internalType": "bool",
          "name": "isBuy",
          "type": "bool"
        },
        {
          "internalType": "bytes",
          "name": "inputProof",
          "type": "bytes"
        }
      ],
      "name": "executeTrade",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        }
      ],
      "name": "getBondInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "issuer",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "faceValue",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "couponRate",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "maturityDate",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "currentPrice",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "totalSupply",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "availableSupply",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isVerified",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "issuerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "creationTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        }
      ],
      "name": "getIssuerReputation",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMarketStats",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "totalVolume",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "activeBonds",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "totalTrades",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "averageYield",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "trader",
          "type": "address"
        }
      ],
      "name": "getPortfolioInfo",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "totalValue",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "totalYield",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "bondCount",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "trader",
          "type": "address"
        }
      ],
      "name": "getTraderReputation",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tradeId",
          "type": "uint256"
        }
      ],
      "name": "getTradeInfo",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "bondId",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "amount",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "price",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "trader",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isBuy",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "newPrice",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "inputProof",
          "type": "bytes"
        }
      ],
      "name": "updateBondPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "reputation",
          "type": "bytes"
        },
        {
          "internalType": "bool",
          "name": "isIssuer",
          "type": "bool"
        }
      ],
      "name": "updateReputation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bondId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isVerified",
          "type": "bool"
        }
      ],
      "name": "verifyBond",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
} as const;
