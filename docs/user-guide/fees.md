---
sidebar_position: 6
---

# Fees

The purchase fee is taken in rBTC from the swap output. You spend the gross stablecoin amount. The purchase venue receives that stablecoin. You receive the buyer-net rBTC.

The fee is not taken from the stablecoin before the purchase.

The owner sets the fee parameters on each handler. No live percentage is published. The contracts are not deployed, so there is no live rate to read.

## What the screen shows

The screen shows the gross stablecoin cost and the buyer-net rBTC. The screen does not show an exact fee row.

## How the weight works

Each purchase has its own fee weight. The weight uses the gross purchase amount and three owner settings:

| Setting | Meaning |
| --- | --- |
| `maxFeeRate` | Rate used at or below the lower bound, in basis points |
| `minFeeRate` | Rate the curve approaches above the lower bound, in basis points |
| `feePurchaseLowerBound` | Gross purchase amount at or below which the maximum rate applies |

One basis point is one ten-thousandth. The denominator is 10,000. The owner sets all three values in one call, `setFeeRateParams`. The contract rejects a minimum rate above the maximum rate. The contract rejects a maximum rate above 500 basis points. That cap is a limit on the setting. It is not a live fee.

At or below the lower bound, the weight uses the maximum rate. Above the lower bound, the rate falls toward the minimum rate. When the two rates differ and the bound is positive, the minimum rate is a limit the curve approaches. A larger purchase does not produce a smaller absolute weight.

The weight is a stablecoin-sized number. It selects the rBTC share. It does not reduce the stablecoin sent into the purchase.

## Fee formula

For one purchase, `x` is the gross purchase amount in token base units. `L` is `feePurchaseLowerBound`. `maxRate` and `minRate` are in basis points. Each result is rounded down.

| Case | Fee weight |
| --- | --- |
| `minRate` equals `maxRate` | `x × maxRate / 10,000` |
| `x ≤ L` | `x × maxRate / 10,000` |
| `x > L` | `(minRate × x² + (maxRate − minRate) × L × (2x − L)) / (x × 10,000)` |

Above the lower bound, the effective rate is:

```text
rate(x) = minRate + (maxRate − minRate) × L × (2x − L) / x²
```

- At `x = L`, the rate is `maxRate`, so the curve has no step at the bound.
- At `x = 2L`, the rate is `minRate + 0.75 × (maxRate − minRate)`.
- At `x = 4L`, the rate is `minRate + 0.4375 × (maxRate − minRate)`.
- At `x = 10L`, the rate is `minRate + 0.19 × (maxRate − minRate)`.
- As `x` grows, the rate approaches `minRate`.
- The absolute fee weight never falls when `x` grows. The contract rounds the absolute fee once, so a larger purchase cannot get a smaller fee.

The bound is in the token's base units. A handler for a 6-decimal stablecoin needs a bound in 6-decimal units. The owner sets each handler's values. These pages do not publish them.

## How rBTC is split

For a batch, each purchase keeps its own weight. The handler measures the gross rBTC output `Q` once for the batch. `G` is the sum of the gross purchase amounts of the rows. `F` is the sum of their fee weights.

| Recipient | Credit |
| --- | --- |
| Buyer of row `i` | `floor(Q × (xᵢ − feeᵢ) / G)` |
| Fee collector | `floor(Q × F / G)` |

On a lending route, a row whose user shares cannot cover the full amount spends the share value that is left. That smaller value is then the row's `xᵢ` for its fee weight and its split, so no other buyer funds the shortfall. A row with no share value reverts the batch.

The collector's share and each buyer's share are floored. Small dust can remain uncredited. The buyer-net amount is the buyer's floored share. The same split applies to every venue: Money on Chain at the initial launch, and Uniswap V3 when a DEX handler is enabled.

The collector later withdraws that rBTC through the accumulated-rBTC path. There is no deployed fee-collector address in these pages.

## What else you pay

You pay Rootstock gas for a transaction you send. The swapper sends the purchase transaction. A lending venue or a pool can have its own cost. That cost is separate from this purchase-fee weight.

A deposit, a principal withdrawal, a delete, a schedule edit, an rBTC claim, and an interest withdrawal do not apply this purchase-fee weight. A delete still returns only principal.

## Read next

- [Address status](/docs/contracts/addresses)
- [Security model](/docs/security/security-model)
- [FAQ](/docs/resources/faq)
