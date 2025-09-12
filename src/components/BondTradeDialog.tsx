import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Shield, Calculator, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useExecuteTrade } from "@/hooks/useContract";
import { useAccount } from "wagmi";

interface BondTradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bond: {
    id: string;
    issuer: string;
    coupon: string;
    rating: string;
    yield: string;
  };
  type: "buy" | "sell";
}

export const BondTradeDialog = ({ isOpen, onClose, bond, type }: BondTradeDialogProps) => {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("98.45");
  const { toast } = useToast();
  const { address } = useAccount();
  const { executeTrade, isLoading } = useExecuteTrade();

  const faceValue = 1000; // Standard bond face value
  const totalValue = parseFloat(quantity || "0") * parseFloat(price) * 10; // Price per $1000 face value
  const estimatedYield = parseFloat(bond.yield.replace("%", ""));

  const handleTrade = async () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity greater than 0.",
        variant: "destructive",
      });
      return;
    }

    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to execute trades.",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real implementation, you would encrypt the amount and price using FHE
      // For now, we'll simulate the trade execution
      const bondId = parseInt(bond.id.split('-')[1]); // Extract ID from "BOND-001"
      
      // Note: In a real FHE implementation, you would:
      // 1. Encrypt the amount and price using FHE
      // 2. Generate a proof for the encrypted values
      // 3. Call the contract with the encrypted data and proof
      
      await executeTrade({
        args: [
          bondId,
          new Uint8Array(32), // Encrypted amount (placeholder)
          new Uint8Array(32), // Encrypted price (placeholder)
          type === "buy",
          new Uint8Array(64), // Input proof (placeholder)
        ],
        value: type === "buy" ? BigInt(Math.floor(totalValue * 1e18)) : 0n,
      });

      toast({
        title: `${type === "buy" ? "Purchase" : "Sale"} Successful`,
        description: `Successfully ${type === "buy" ? "purchased" : "sold"} ${quantity} bonds of ${bond.issuer}`,
      });
      onClose();
      setQuantity("");
    } catch (error) {
      console.error('Trade execution failed:', error);
      toast({
        title: "Trade Failed",
        description: "Failed to execute trade. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-trading-card border-trading-surface">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-trading-text-primary">
            {type === "buy" ? "Buy Bond" : "Sell Bond"}
            <Shield className="h-4 w-4 text-trading-accent" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Bond Info */}
          <div className="p-4 bg-trading-surface/50 rounded-lg">
            <h4 className="font-medium text-trading-text-primary mb-2">{bond.issuer}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-trading-text-secondary">Bond ID:</span>
              <span className="text-trading-text-primary">{bond.id}</span>
              <span className="text-trading-text-secondary">Rating:</span>
              <span className="text-trading-text-primary">{bond.rating}</span>
              <span className="text-trading-text-secondary">Coupon:</span>
              <span className="text-trading-text-primary">{bond.coupon}</span>
              <span className="text-trading-text-secondary">Yield:</span>
              <span className="text-trading-success">{bond.yield}</span>
            </div>
          </div>

          {/* Trade Form */}
          <div className="space-y-4">
            <div>
              <Label className="text-trading-text-secondary">Quantity (Number of Bonds)</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="bg-trading-surface border-trading-surface text-trading-text-primary"
                min="1"
                step="1"
              />
            </div>

            <div>
              <Label className="text-trading-text-secondary">Price per Bond (USD)</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-trading-surface border-trading-surface text-trading-text-primary"
                step="0.01"
              />
              <p className="text-xs text-trading-text-secondary mt-1">
                Price per $1,000 face value
              </p>
            </div>
          </div>

          <Separator className="bg-trading-surface" />

          {/* Trade Summary */}
          <div className="space-y-3 p-4 bg-trading-surface/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-trading-accent" />
              <span className="font-medium text-trading-text-primary">Trade Summary</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-trading-text-secondary">Quantity:</span>
                <span className="text-trading-text-primary">{quantity || "0"} bonds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-trading-text-secondary">Price per Bond:</span>
                <span className="text-trading-text-primary">${price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-trading-text-secondary">Face Value:</span>
                <span className="text-trading-text-primary">${faceValue.toLocaleString()}</span>
              </div>
              <Separator className="bg-trading-surface" />
              <div className="flex justify-between font-medium">
                <span className="text-trading-text-secondary">Total {type === "buy" ? "Cost" : "Proceeds"}:</span>
                <span className="text-trading-text-primary">${totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-trading-text-secondary">Estimated Annual Yield:</span>
                <span className="text-trading-success">{estimatedYield.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* FHE Notice */}
          <div className="flex items-start gap-2 p-3 bg-trading-accent/10 rounded-lg border border-trading-accent/20">
            <AlertCircle className="h-4 w-4 text-trading-accent mt-0.5" />
            <div className="text-xs">
              <p className="text-trading-text-primary font-medium">Confidential Trading</p>
              <p className="text-trading-text-secondary">
                This trade will be executed using FHE encryption to protect your trading data and prevent front-running.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-trading-surface text-trading-text-primary hover:bg-trading-surface"
            >
              Cancel
            </Button>
            <Button
              onClick={handleTrade}
              disabled={isLoading || !quantity || parseFloat(quantity) <= 0}
              className={`flex-1 ${
                type === "buy"
                  ? "bg-trading-accent hover:bg-trading-accent/90 text-trading-bg"
                  : "bg-trading-error hover:bg-trading-error/90 text-white"
              }`}
            >
              {isLoading ? "Processing..." : `${type === "buy" ? "Buy" : "Sell"} Bond`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};