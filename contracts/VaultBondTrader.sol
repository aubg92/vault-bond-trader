// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VaultBondTrader is SepoliaConfig {
    using FHE for *;
    
    struct Bond {
        euint32 bondId;
        euint32 faceValue;
        euint32 couponRate;
        euint32 maturityDate;
        euint32 currentPrice;
        euint32 totalSupply;
        euint32 availableSupply;
        bool isActive;
        bool isVerified;
        string issuer;
        string symbol;
        address issuerAddress;
        uint256 creationTime;
    }
    
    struct Trade {
        euint32 tradeId;
        euint32 bondId;
        euint32 amount;
        euint32 price;
        address trader;
        bool isBuy;
        uint256 timestamp;
    }
    
    struct Portfolio {
        euint32 totalValue;
        euint32 totalYield;
        euint32 bondCount;
        mapping(uint32 => euint32) bondHoldings;
    }
    
    struct MarketStats {
        euint32 totalVolume;
        euint32 activeBonds;
        euint32 totalTrades;
        euint32 averageYield;
    }
    
    mapping(uint256 => Bond) public bonds;
    mapping(uint256 => Trade) public trades;
    mapping(address => Portfolio) public portfolios;
    mapping(address => euint32) public traderReputation;
    mapping(address => euint32) public issuerReputation;
    
    MarketStats public marketStats;
    
    uint256 public bondCounter;
    uint256 public tradeCounter;
    
    address public owner;
    address public verifier;
    
    event BondCreated(uint256 indexed bondId, address indexed issuer, string symbol);
    event TradeExecuted(uint256 indexed tradeId, uint256 indexed bondId, address indexed trader, bool isBuy);
    event BondVerified(uint256 indexed bondId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event MarketStatsUpdated(uint32 totalVolume, uint32 activeBonds, uint32 totalTrades);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        
        // Initialize market stats
        marketStats = MarketStats({
            totalVolume: FHE.asEuint32(0),
            activeBonds: FHE.asEuint32(0),
            totalTrades: FHE.asEuint32(0),
            averageYield: FHE.asEuint32(0)
        });
    }
    
    function createBond(
        string memory _issuer,
        string memory _symbol,
        uint256 _faceValue,
        uint256 _couponRate,
        uint256 _maturityDate,
        uint256 _totalSupply
    ) public returns (uint256) {
        require(bytes(_issuer).length > 0, "Issuer name cannot be empty");
        require(bytes(_symbol).length > 0, "Symbol cannot be empty");
        require(_faceValue > 0, "Face value must be positive");
        require(_couponRate > 0, "Coupon rate must be positive");
        require(_maturityDate > block.timestamp, "Maturity date must be in the future");
        require(_totalSupply > 0, "Total supply must be positive");
        
        uint256 bondId = bondCounter++;
        
        bonds[bondId] = Bond({
            bondId: FHE.asEuint32(0), // Will be set properly later
            faceValue: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            couponRate: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            maturityDate: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentPrice: FHE.asEuint32(0), // Initial price will be set by market
            totalSupply: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            availableSupply: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            isActive: true,
            isVerified: false,
            issuer: _issuer,
            symbol: _symbol,
            issuerAddress: msg.sender,
            creationTime: block.timestamp
        });
        
        // Update market stats
        marketStats.activeBonds = FHE.add(marketStats.activeBonds, FHE.asEuint32(1));
        
        emit BondCreated(bondId, msg.sender, _symbol);
        return bondId;
    }
    
    function executeTrade(
        uint256 bondId,
        externalEuint32 amount,
        externalEuint32 price,
        bool isBuy,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(bonds[bondId].issuerAddress != address(0), "Bond does not exist");
        require(bonds[bondId].isActive, "Bond is not active");
        require(bonds[bondId].isVerified, "Bond must be verified");
        
        uint256 tradeId = tradeCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalPrice = FHE.fromExternal(price, inputProof);
        
        trades[tradeId] = Trade({
            tradeId: FHE.asEuint32(0), // Will be set properly later
            bondId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            amount: internalAmount,
            price: internalPrice,
            trader: msg.sender,
            isBuy: isBuy,
            timestamp: block.timestamp
        });
        
        if (isBuy) {
            // Update bond available supply (decrease)
            bonds[bondId].availableSupply = FHE.sub(bonds[bondId].availableSupply, internalAmount);
            
            // Update trader portfolio
            portfolios[msg.sender].bondHoldings[bondId] = FHE.add(
                portfolios[msg.sender].bondHoldings[bondId], 
                internalAmount
            );
            portfolios[msg.sender].bondCount = FHE.add(portfolios[msg.sender].bondCount, FHE.asEuint32(1));
        } else {
            // Update bond available supply (increase)
            bonds[bondId].availableSupply = FHE.add(bonds[bondId].availableSupply, internalAmount);
            
            // Update trader portfolio
            portfolios[msg.sender].bondHoldings[bondId] = FHE.sub(
                portfolios[msg.sender].bondHoldings[bondId], 
                internalAmount
            );
        }
        
        // Update market stats
        euint32 tradeValue = FHE.mul(internalAmount, internalPrice);
        marketStats.totalVolume = FHE.add(marketStats.totalVolume, tradeValue);
        marketStats.totalTrades = FHE.add(marketStats.totalTrades, FHE.asEuint32(1));
        
        emit TradeExecuted(tradeId, bondId, msg.sender, isBuy);
        emit MarketStatsUpdated(0, 0, 0); // Values will be decrypted off-chain
        return tradeId;
    }
    
    function updateBondPrice(
        uint256 bondId,
        externalEuint32 newPrice,
        bytes calldata inputProof
    ) public {
        require(bonds[bondId].issuerAddress != address(0), "Bond does not exist");
        require(bonds[bondId].isActive, "Bond is not active");
        require(msg.sender == bonds[bondId].issuerAddress || msg.sender == verifier, "Unauthorized");
        
        euint32 internalPrice = FHE.fromExternal(newPrice, inputProof);
        bonds[bondId].currentPrice = internalPrice;
    }
    
    function verifyBond(uint256 bondId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify bonds");
        require(bonds[bondId].issuerAddress != address(0), "Bond does not exist");
        
        bonds[bondId].isVerified = isVerified;
        emit BondVerified(bondId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation, bool isIssuer) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (isIssuer) {
            issuerReputation[user] = reputation;
        } else {
            traderReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getBondInfo(uint256 bondId) public view returns (
        string memory issuer,
        string memory symbol,
        uint8 faceValue,
        uint8 couponRate,
        uint8 maturityDate,
        uint8 currentPrice,
        uint8 totalSupply,
        uint8 availableSupply,
        bool isActive,
        bool isVerified,
        address issuerAddress,
        uint256 creationTime
    ) {
        Bond storage bond = bonds[bondId];
        return (
            bond.issuer,
            bond.symbol,
            0, // FHE.decrypt(bond.faceValue) - will be decrypted off-chain
            0, // FHE.decrypt(bond.couponRate) - will be decrypted off-chain
            0, // FHE.decrypt(bond.maturityDate) - will be decrypted off-chain
            0, // FHE.decrypt(bond.currentPrice) - will be decrypted off-chain
            0, // FHE.decrypt(bond.totalSupply) - will be decrypted off-chain
            0, // FHE.decrypt(bond.availableSupply) - will be decrypted off-chain
            bond.isActive,
            bond.isVerified,
            bond.issuerAddress,
            bond.creationTime
        );
    }
    
    function getTradeInfo(uint256 tradeId) public view returns (
        uint8 bondId,
        uint8 amount,
        uint8 price,
        address trader,
        bool isBuy,
        uint256 timestamp
    ) {
        Trade storage trade = trades[tradeId];
        return (
            0, // FHE.decrypt(trade.bondId) - will be decrypted off-chain
            0, // FHE.decrypt(trade.amount) - will be decrypted off-chain
            0, // FHE.decrypt(trade.price) - will be decrypted off-chain
            trade.trader,
            trade.isBuy,
            trade.timestamp
        );
    }
    
    function getPortfolioInfo(address trader) public view returns (
        uint8 totalValue,
        uint8 totalYield,
        uint8 bondCount
    ) {
        Portfolio storage portfolio = portfolios[trader];
        return (
            0, // FHE.decrypt(portfolio.totalValue) - will be decrypted off-chain
            0, // FHE.decrypt(portfolio.totalYield) - will be decrypted off-chain
            0  // FHE.decrypt(portfolio.bondCount) - will be decrypted off-chain
        );
    }
    
    function getMarketStats() public view returns (
        uint8 totalVolume,
        uint8 activeBonds,
        uint8 totalTrades,
        uint8 averageYield
    ) {
        return (
            0, // FHE.decrypt(marketStats.totalVolume) - will be decrypted off-chain
            0, // FHE.decrypt(marketStats.activeBonds) - will be decrypted off-chain
            0, // FHE.decrypt(marketStats.totalTrades) - will be decrypted off-chain
            0  // FHE.decrypt(marketStats.averageYield) - will be decrypted off-chain
        );
    }
    
    function getTraderReputation(address trader) public view returns (uint8) {
        return 0; // FHE.decrypt(traderReputation[trader]) - will be decrypted off-chain
    }
    
    function getIssuerReputation(address issuer) public view returns (uint8) {
        return 0; // FHE.decrypt(issuerReputation[issuer]) - will be decrypted off-chain
    }
    
    function deactivateBond(uint256 bondId) public {
        require(bonds[bondId].issuerAddress == msg.sender, "Only issuer can deactivate bond");
        require(bonds[bondId].isActive, "Bond is already inactive");
        
        bonds[bondId].isActive = false;
        
        // Update market stats
        marketStats.activeBonds = FHE.sub(marketStats.activeBonds, FHE.asEuint32(1));
    }
    
    function calculateYield(uint256 bondId) public view returns (uint8) {
        // This function would calculate the yield based on current price and coupon rate
        // For now, returning 0 as the actual calculation would require FHE operations
        return 0; // FHE.decrypt(yield) - will be calculated and decrypted off-chain
    }
}
