---
sidebar_position: 6
---

# Fees

BitChill charges a small protocol fee on each purchase to sustain development and infrastructure.

## Fee Structure

Fees are charged **during each purchase**, not on deposits or withdrawals. The fee is:

1. Calculated based on the purchase amount
2. Deducted from the stablecoin before swapping
3. Sent to the protocol fee collector
4. The remaining amount is swapped for rBTC

**You receive rBTC based on the net amount after fees.**

## Current Fee Rate

Deployment defaults are **1% flat** on each purchase (`minFeeRate = maxFeeRate = 100`).
Live fee values are on-chain and can be changed via handler owner configuration.

| Purchase Amount | Fee Rate | Fee Amount | Net Swap Amount |
|-----------------|----------|------------|-----------------|
| 50 DOC | 1% | 0.50 DOC | 49.50 DOC |
| 100 DOC | 1% | 1.00 DOC | 99.00 DOC |
| 500 DOC | 1% | 5.00 DOC | 495.00 DOC |

## Sliding Scale Fee Model

While current deployment uses a flat fee, the contracts support a **sliding scale** where larger purchases pay lower percentage fees:

| Parameter | Description |
|-----------|-------------|
| `minFeeRate` | Lowest fee rate (for large purchases) |
| `maxFeeRate` | Highest fee rate (for small purchases) |
| `feePurchaseLowerBound` | Below this amount, max rate applies |
| `feePurchaseUpperBound` | Above this amount, min rate applies |

The fee rate interpolates linearly between bounds. Fee rates are expressed in basis points (100 = 1%).

### Example Sliding Scale

If configured as: `minFeeRate=50, maxFeeRate=150, lowerBound=100, upperBound=1000`

| Purchase | Fee Rate |
|----------|----------|
| 50 tokens | 1.5% (max) |
| 550 tokens | 1.0% (midpoint) |
| 1000+ tokens | 0.5% (min) |

## What's Not Charged

BitChill does **not** charge fees for:

- ✅ Depositing stablecoins
- ✅ Withdrawing your stablecoin balance
- ✅ Withdrawing accumulated rBTC
- ✅ Creating or modifying schedules
- ✅ Withdrawing accrued interest

## Gas Costs

### Automated Purchases

The BitChill swapper infrastructure pays gas for executing your scheduled purchases. You don't pay gas for the actual swap transactions.

### User Transactions

You pay gas for transactions you initiate (create, update, withdraw, delete). Gas usage varies by action and network conditions.

## Fee Transparency

All fee parameters are on-chain and publicly queryable:

```solidity
handler.getMinFeeRate()
handler.getMaxFeeRate()
handler.getFeePurchaseLowerBound()
handler.getFeePurchaseUpperBound()
handler.getFeeCollector()
```

## Next Steps

- [View contract addresses](/docs/contracts/addresses)
- [Understand the security model](/docs/security/security-model)
- [FAQ](/docs/resources/faq)
