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

## How rBTC is split

For a batch, each purchase keeps its own weight. The handler measures the rBTC output. The collector's share and each buyer's share are floored. Small dust can remain uncredited. The buyer-net amount is the buyer's floored share.

The collector later withdraws that rBTC through the accumulated-rBTC path. There is no deployed fee-collector address in these pages.

## What else you pay

You pay Rootstock gas for a transaction you send. The swapper sends the purchase transaction. A lending venue or a pool can have its own cost. That cost is separate from this purchase-fee weight.

A deposit, a principal withdrawal, a delete, a schedule edit, an rBTC claim, and an interest withdrawal do not apply this purchase-fee weight. A delete still returns only principal.

## Read next

- [Address status](/docs/contracts/addresses)
- [Security model](/docs/security/security-model)
- [FAQ](/docs/resources/faq)
