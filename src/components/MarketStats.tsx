import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { useMarketStats } from "@/hooks/useContract";

const stats = [
  {
    title: "Total Market Value",
    value: "$2.4B",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Bonds",
    value: "847",
    change: "+23",
    trend: "up",
    icon: Activity,
  },
  {
    title: "24h Volume",
    value: "$156M",
    change: "-3.2%",
    trend: "down",
    icon: TrendingUp,
  },
  {
    title: "Encrypted Trades",
    value: "1,204",
    change: "+8.7%",
    trend: "up",
    icon: TrendingDown,
  },
];

export const MarketStats = () => {
  const { marketStats, isLoading, error } = useMarketStats();

  // Use contract data if available, otherwise fall back to static data
  const displayStats = marketStats ? [
    {
      title: "Total Market Value",
      value: `$${(marketStats[0] * 1000000).toLocaleString()}M`, // Convert from contract value
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Bonds",
      value: marketStats[1].toString(),
      change: "+23",
      trend: "up",
      icon: Activity,
    },
    {
      title: "24h Volume",
      value: `$${(marketStats[0] * 100000).toLocaleString()}M`, // Convert from contract value
      change: "-3.2%",
      trend: "down",
      icon: TrendingUp,
    },
    {
      title: "Encrypted Trades",
      value: marketStats[2].toString(),
      change: "+8.7%",
      trend: "up",
      icon: TrendingDown,
    },
  ] : stats;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="p-6 bg-trading-card border-trading-surface">
            <div className="animate-pulse">
              <div className="h-4 bg-trading-surface rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-trading-surface rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Error loading market stats:', error);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayStats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";
        
        return (
          <Card key={index} className="p-6 bg-trading-card border-trading-surface hover:border-trading-accent/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-trading-accent/10">
                  <Icon className="h-5 w-5 text-trading-accent" />
                </div>
                <div>
                  <p className="text-sm text-trading-text-secondary">{stat.title}</p>
                  <p className="text-2xl font-bold text-trading-text-primary">{stat.value}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-trading-success' : 'text-trading-danger'}`}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};