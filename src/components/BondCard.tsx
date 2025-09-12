import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { BondTradeDialog } from "./BondTradeDialog";

interface BondCardProps {
  id: string;
  issuer: string;
  maturity: string;
  coupon: string;
  rating: string;
  encryptedPrice: string;
  yield: string;
  volume: string;
  isEncrypted?: boolean;
}

export const BondCard = ({
  id,
  issuer,
  maturity,
  coupon,
  rating,
  encryptedPrice,
  yield: bondYield,
  volume,
  isEncrypted = true,
}: BondCardProps) => {
  const [showPrice, setShowPrice] = useState(false);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [sellDialogOpen, setSellDialogOpen] = useState(false);

  const togglePriceVisibility = () => {
    setShowPrice(!showPrice);
  };

  return (
    <Card className="p-6 bg-trading-card border-trading-surface hover:border-trading-accent/30 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-trading-text-primary">{issuer}</h3>
          <p className="text-sm text-trading-text-secondary">Bond ID: {id}</p>
        </div>
        <div className="flex items-center gap-2">
          {isEncrypted && (
            <Badge variant="outline" className="border-trading-accent/30 text-trading-accent bg-trading-accent/10">
              <Shield className="h-3 w-3 mr-1" />
              FHE
            </Badge>
          )}
          <Badge variant="secondary" className="bg-trading-surface text-trading-text-primary">
            {rating}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-trading-text-secondary">Maturity</p>
          <p className="font-medium text-trading-text-primary">{maturity}</p>
        </div>
        <div>
          <p className="text-sm text-trading-text-secondary">Coupon</p>
          <p className="font-medium text-trading-text-primary">{coupon}</p>
        </div>
        <div>
          <p className="text-sm text-trading-text-secondary">Yield</p>
          <p className="font-medium text-trading-success">{bondYield}</p>
        </div>
        <div>
          <p className="text-sm text-trading-text-secondary">24h Volume</p>
          <p className="font-medium text-trading-text-primary">{volume}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 p-3 bg-trading-surface rounded-lg">
        <div className="flex items-center gap-2">
          <p className="text-sm text-trading-text-secondary">Encrypted Price:</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePriceVisibility}
            className="h-6 w-6 p-0 text-trading-text-secondary hover:text-trading-accent"
          >
            {showPrice ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </Button>
        </div>
        <p className="font-mono text-sm text-trading-text-primary">
          {showPrice ? "$98.45" : encryptedPrice}
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <Button 
          className="flex-1 bg-trading-accent hover:bg-trading-accent/90 text-trading-bg"
          onClick={() => setBuyDialogOpen(true)}
        >
          Buy Bond
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 border-trading-accent/30 text-trading-text-primary hover:bg-trading-accent/10"
          onClick={() => setSellDialogOpen(true)}
        >
          Sell Bond
        </Button>
      </div>

      <BondTradeDialog
        isOpen={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        bond={{
          id,
          issuer,
          coupon,
          rating,
          yield: bondYield,
        }}
        type="buy"
      />

      <BondTradeDialog
        isOpen={sellDialogOpen}
        onClose={() => setSellDialogOpen(false)}
        bond={{
          id,
          issuer,
          coupon,
          rating,
          yield: bondYield,
        }}
        type="sell"
      />
    </Card>
  );
};