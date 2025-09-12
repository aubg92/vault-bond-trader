import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { VaultBondTrader } from '../lib/contracts';

export const useVaultBondTrader = () => {
  const { address } = useAccount();
  
  const contract = useContract({
    address: '0x...', // Contract address will be set after deployment
    abi: VaultBondTrader.abi,
  });

  return {
    contract,
    address,
  };
};

export const useBondInfo = (bondId: number) => {
  const { data, isLoading, error } = useContractRead({
    address: '0x...', // Contract address will be set after deployment
    abi: VaultBondTrader.abi,
    functionName: 'getBondInfo',
    args: [bondId],
  });

  return {
    bondInfo: data,
    isLoading,
    error,
  };
};

export const useMarketStats = () => {
  const { data, isLoading, error } = useContractRead({
    address: '0x...', // Contract address will be set after deployment
    abi: VaultBondTrader.abi,
    functionName: 'getMarketStats',
  });

  return {
    marketStats: data,
    isLoading,
    error,
  };
};

export const usePortfolio = () => {
  const { address } = useAccount();
  
  const { data, isLoading, error } = useContractRead({
    address: '0x...', // Contract address will be set after deployment
    abi: VaultBondTrader.abi,
    functionName: 'getPortfolioInfo',
    args: [address],
    enabled: !!address,
  });

  return {
    portfolio: data,
    isLoading,
    error,
  };
};

export const useCreateBond = () => {
  const { write, isLoading, error } = useContractWrite({
    address: '0x...', // Contract address will be set after deployment
    abi: VaultBondTrader.abi,
    functionName: 'createBond',
  });

  return {
    createBond: write,
    isLoading,
    error,
  };
};

export const useExecuteTrade = () => {
  const { write, isLoading, error } = useContractWrite({
    address: '0x...', // Contract address will be set after deployment
    abi: VaultBondTrader.abi,
    functionName: 'executeTrade',
  });

  return {
    executeTrade: write,
    isLoading,
    error,
  };
};
