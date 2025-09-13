import { WalletConnect } from "@/components/WalletConnect";
import { MarketStats } from "@/components/MarketStats";
import { BondCard } from "@/components/BondCard";
import { Portfolio } from "@/components/Portfolio";
import { Shield, Lock, TrendingUp } from "lucide-react";
import { useState } from "react";

const sampleBonds = [
  {
    id: "BOND-001",
    issuer: "Tesla Inc.",
    maturity: "2027-12-15",
    coupon: "4.25%",
    rating: "BBB+",
    encryptedPrice: "0x4f7a...92b1",
    yield: "4.18%",
    volume: "$2.4M",
  },
  {
    id: "BOND-002",
    issuer: "Apple Corp.",
    maturity: "2029-06-30",
    coupon: "3.85%",
    rating: "AAA",
    encryptedPrice: "0x8c3d...45e7",
    yield: "3.92%",
    volume: "$5.1M",
  },
  {
    id: "BOND-003",
    issuer: "Microsoft Inc.",
    maturity: "2026-03-20",
    coupon: "5.10%",
    rating: "AA+",
    encryptedPrice: "0x2a9f...18c6",
    yield: "4.95%",
    volume: "$3.8M",
  },
  {
    id: "BOND-004",
    issuer: "Amazon.com",
    maturity: "2030-09-15",
    coupon: "4.75%",
    rating: "AA",
    encryptedPrice: "0x6b4e...73d2",
    yield: "4.82%",
    volume: "$4.2M",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"market" | "portfolio">("market");

  return (
    <div className="min-h-screen bg-trading-bg">
      {/* Header */}
      <header className="border-b border-trading-surface bg-trading-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500">
                <svg className="h-6 w-6 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4L8 8V16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16V8L16 4Z" 
                        fill="white" 
                        stroke="#1e40af" 
                        strokeWidth="1.5"/>
                  <path d="M12 10H16C17.1046 10 18 10.8954 18 12V14C18 15.1046 17.1046 16 16 16H12V20H10V10H12ZM12 12V14H16V12H12Z" 
                        fill="#1e40af"/>
                  <circle cx="20" cy="20" r="3" fill="#1e40af"/>
                  <path d="M19 19V18C19 17.4477 19.4477 17 20 17C20.5523 17 21 17.4477 21 18V19H19Z" 
                        fill="white"/>
                  <rect x="18.5" y="19" width="3" height="2" rx="0.5" fill="white"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-trading-text-primary">
                  Vault Bond Trader
                </h1>
                <p className="text-sm text-trading-text-secondary flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Powered by FHE
                </p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-trading-surface bg-trading-card/30">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("market")}
              className={`py-4 px-2 border-b-2 transition-all ${
                activeTab === "market"
                  ? "border-trading-accent text-trading-accent"
                  : "border-transparent text-trading-text-secondary hover:text-trading-text-primary"
              }`}
            >
              Market
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`py-4 px-2 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "portfolio"
                  ? "border-trading-accent text-trading-accent"
                  : "border-transparent text-trading-text-secondary hover:text-trading-text-primary"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === "market" ? (
          <>
            {/* Market Stats */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-trading-text-primary mb-6">Market Overview</h2>
              <MarketStats />
            </section>

            {/* Bond Listings */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-trading-text-primary">Available Bonds</h2>
                <div className="flex items-center gap-2 text-sm text-trading-text-secondary">
                  <Shield className="h-4 w-4 text-trading-accent" />
                  <span>All prices encrypted with FHE</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sampleBonds.map((bond) => (
                  <BondCard key={bond.id} {...bond} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section>
            <h2 className="text-2xl font-bold text-trading-text-primary mb-6">My Portfolio</h2>
            <Portfolio />
          </section>
        )}

        {/* Footer Info */}
        <section className="mt-12 p-6 bg-trading-card/30 rounded-lg border border-trading-surface">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-trading-accent" />
            <h3 className="text-lg font-semibold text-trading-text-primary">
              Fully Homomorphic Encryption (FHE) Protection
            </h3>
          </div>
          <p className="text-trading-text-secondary leading-relaxed">
            All bond prices and trading data are encrypted using advanced FHE technology, preventing 
            front-running and ensuring confidential trading. Market participants can execute trades 
            without revealing sensitive pricing information to competitors.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;