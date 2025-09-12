import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useAccount } from 'wagmi';

export const WalletConnect = () => {
  const { isConnected, address } = useAccount();

  if (isConnected && address) {
    return (
      <Card className="flex items-center gap-3 p-3 bg-trading-surface border-trading-accent/20">
        <CheckCircle className="h-5 w-5 text-trading-success" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-trading-text-primary">Connected</span>
          <span className="text-xs text-trading-text-secondary">
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </span>
        </div>
      </Card>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-trading-accent/30 rounded-md text-sm font-medium text-trading-text-primary bg-transparent hover:bg-trading-accent/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trading-accent"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-trading-accent/30 rounded-md text-sm font-medium text-trading-text-primary bg-transparent hover:bg-trading-accent/10"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-trading-accent/30 rounded-md text-sm font-medium text-trading-text-primary bg-transparent hover:bg-trading-accent/10"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};