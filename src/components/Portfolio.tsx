import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, TrendingUp, Wallet } from "lucide-react";
import { usePortfolio } from "@/hooks/useContract";
import { useAccount } from "wagmi";

const portfolioData = [
  {
    issuer: "Tesla Inc.",
    id: "BOND-001",
    quantity: "50,000",
    value: "$49,250",
    yield: "4.18%",
    pnl: "+$1,250",
    pnlPercent: "+2.6%",
    isPositive: true,
  },
  {
    issuer: "Apple Corp.",
    id: "BOND-002", 
    quantity: "25,000",
    value: "$24,875",
    yield: "3.92%",
    pnl: "-$625",
    pnlPercent: "-2.4%",
    isPositive: false,
  },
];

export const Portfolio = () => {
  const { address } = useAccount();
  const { portfolio, isLoading, error } = usePortfolio();

  // Use contract data if available, otherwise fall back to static data
  const totalValue = portfolio ? `$${(portfolio[0] * 1000).toLocaleString()}` : "$74,125";
  const totalYield = portfolio ? `${portfolio[1]}%` : "4.05%";
  const bondCount = portfolio ? portfolio[2] : 2;
  const totalPnL = "+$625";
  const totalPnLPercent = "+0.85%";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-trading-card border-trading-surface">
          <div className="animate-pulse">
            <div className="h-6 bg-trading-surface rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-trading-surface rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="p-4 bg-trading-surface rounded-lg">
                  <div className="h-4 bg-trading-surface rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-trading-surface rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    console.error('Error loading portfolio:', error);
  }

  if (!address) {
    return (
      <Card className="p-6 bg-trading-card border-trading-surface">
        <div className="text-center">
          <Wallet className="h-12 w-12 text-trading-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-trading-text-primary mb-2">Connect Your Wallet</h3>
          <p className="text-trading-text-secondary">Connect your wallet to view your portfolio</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="p-6 bg-trading-card border-trading-surface">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-trading-accent/10">
              <Wallet className="h-5 w-5 text-trading-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-trading-text-primary">Portfolio Overview</h3>
              <p className="text-sm text-trading-text-secondary">Total Bond Holdings</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-trading-text-primary">{totalValue}</p>
            <div className="flex items-center gap-1 text-trading-success">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">{totalPnL} ({totalPnLPercent})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-trading-surface rounded-lg">
            <p className="text-sm text-trading-text-secondary">Active Positions</p>
            <p className="text-xl font-bold text-trading-text-primary">{bondCount}</p>
          </div>
          <div className="p-4 bg-trading-surface rounded-lg">
            <p className="text-sm text-trading-text-secondary">Avg. Yield</p>
            <p className="text-xl font-bold text-trading-success">{totalYield}</p>
          </div>
          <div className="p-4 bg-trading-surface rounded-lg">
            <p className="text-sm text-trading-text-secondary">Diversification</p>
            <p className="text-xl font-bold text-trading-accent">2 Issuers</p>
          </div>
        </div>
      </Card>

      {/* Holdings List */}
      <div className="space-y-4">
        {portfolioData.map((holding, index) => (
          <Card key={index} className="p-4 bg-trading-card border-trading-surface hover:border-trading-accent/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-trading-surface">
                  <PieChart className="h-4 w-4 text-trading-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-trading-text-primary">{holding.issuer}</h4>
                  <p className="text-sm text-trading-text-secondary">{holding.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-8 text-right">
                <div>
                  <p className="text-sm text-trading-text-secondary">Quantity</p>
                  <p className="font-medium text-trading-text-primary">{holding.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-trading-text-secondary">Value</p>
                  <p className="font-medium text-trading-text-primary">{holding.value}</p>
                </div>
                <div>
                  <p className="text-sm text-trading-text-secondary">Yield</p>
                  <p className="font-medium text-trading-success">{holding.yield}</p>
                </div>
                <div>
                  <p className="text-sm text-trading-text-secondary">P&L</p>
                  <div className="flex items-center gap-1">
                    <Badge 
                      variant={holding.isPositive ? "default" : "destructive"}
                      className={`text-xs ${
                        holding.isPositive 
                          ? "bg-trading-success/10 text-trading-success border-trading-success/20" 
                          : "bg-trading-danger/10 text-trading-danger border-trading-danger/20"
                      }`}
                    >
                      {holding.pnl} ({holding.pnlPercent})
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};