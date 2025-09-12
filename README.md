# Vault Bond Trader

A confidential bond trading platform powered by Fully Homomorphic Encryption (FHE) technology, enabling secure and private bond transactions without revealing sensitive pricing information.

## Features

- **Confidential Trading**: All bond prices and trading data are encrypted using FHE technology
- **Secure Wallet Integration**: Connect with popular Web3 wallets including Rainbow, MetaMask, and more
- **Real-time Market Data**: Live bond market statistics and portfolio tracking
- **Privacy Protection**: Prevents front-running and ensures confidential trading
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Web3 Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: Fully Homomorphic Encryption (FHE)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for testing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aubg92/vault-bond-trader.git
cd vault-bond-trader
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Smart Contract

The platform uses FHE-enabled smart contracts for secure bond trading:

- **VaultBondTrader.sol**: Main contract handling bond creation, trading, and portfolio management
- **FHE Integration**: All sensitive data (prices, amounts, yields) are encrypted using FHE
- **Privacy Protection**: Market participants can trade without revealing pricing information

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

This project implements advanced cryptographic techniques to ensure the privacy and security of bond trading data. All sensitive information is encrypted using Fully Homomorphic Encryption, providing unprecedented privacy protection in decentralized finance.

## Support

For support and questions, please open an issue on GitHub or contact the development team.