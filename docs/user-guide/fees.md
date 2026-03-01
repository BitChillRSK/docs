---
sidebar_position: 6
---

# Fees

BitChill charges protocol fees during purchase execution in handler contracts.

## Where Fees Are Applied

For each purchase:

1. Stablecoin amount is redeemed for the purchase
2. Fee is computed by handler fee settings
3. Fee is transferred to configured fee collector
4. Net amount is swapped to rBTC

## Fee Model in Contracts

`FeeHandler` stores:

- `minFeeRate`
- `maxFeeRate`
- `feePurchaseLowerBound`
- `feePurchaseUpperBound`

Computation:

- if `minFeeRate == maxFeeRate`, fee is flat
- if `amount <= lowerBound`, use max fee rate
- if `amount >= upperBound`, use min fee rate
- else interpolate linearly between max and min

All rates are divided by `10_000`.

## Current Deployment Defaults (from deployment constants)

- `minFeeRate = 100`
- `maxFeeRate = 100` (production default, flat 1%)
- lower bound: `1000` tokens
- upper bound: `100000` tokens

Because min=max in production defaults, effective fee is flat unless owner updates handler fee params.

## Gas Responsibility

- Automated periodic purchases are executed by swapper infrastructure.
- Users still pay gas for their own direct transactions (create/update/withdraw calls).

## Transparency

Fee parameters are on-chain and queryable per handler (`getMinFeeRate`, `getMaxFeeRate`, bounds, collector).

## Next Steps

- [Core contracts](/docs/contracts/core-contracts)
- [Addresses](/docs/contracts/addresses)
