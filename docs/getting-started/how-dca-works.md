---
sidebar_position: 1
---

# How DCA Works

Dollar Cost Averaging (DCA) is an investment strategy where you invest a fixed amount at regular intervals, regardless of the asset's price. This approach reduces the impact of volatility and removes the stress of timing the market.

## The DCA Strategy

Instead of trying to "buy the dip" or time the perfect entry, DCA investors:

- Invest the **same amount** at **regular intervals**
- Buy **more units** when prices are low
- Buy **fewer units** when prices are high
- End up with an **average cost** over time

### Example

Imagine you want to invest $100 per week in Bitcoin:

| Week | BTC Price | Amount Bought |
|------|-----------|---------------|
| 1 | $50,000 | 0.002 BTC |
| 2 | $45,000 | 0.00222 BTC |
| 3 | $55,000 | 0.00182 BTC |
| 4 | $48,000 | 0.00208 BTC |

**Total Invested**: $400  
**Total BTC**: 0.00812 BTC  
**Average Cost**: $49,261 per BTC

Even though prices fluctuated between $45,000 and $55,000, your average cost ended up near the middle—without any stress about market timing.

## How BitChill Automates DCA

BitChill takes the DCA concept and implements it fully on-chain:

### 1. Create a Schedule

You define:
- **Deposit Amount**: How much stablecoin to deposit (e.g., 1000 DOC)
- **Purchase Amount**: How much to swap each period (e.g., 100 DOC)
- **Purchase Period**: How often to swap (1, 2, or 4 weeks)
- **Lending Protocol**: Where to earn yield (Tropykus or Sovryn)

### 2. Earn While You Wait

Your deposited stablecoins don't just sit idle. They're deposited into lending protocols where they earn interest:

- **Tropykus**: Receive kTokens (kDOC, kUSDRIF) representing your deposit plus accrued interest
- **Sovryn**: Receive iSUSD tokens with similar yield-bearing properties

This means your purchasing power grows slightly between each swap.

### 3. Automatic Swaps

When your purchase period elapses, BitChill's automated system:

1. Redeems the required amount from the lending protocol
2. Swaps stablecoins for rBTC via Uniswap V3 or Money on Chain
3. Stores the purchased rBTC in your schedule
4. Deducts a small fee

You don't need to do anything—it happens automatically.

### 4. Withdraw When Ready

Your accumulated rBTC stays in the protocol until you withdraw it. This "pull" pattern means:

- You control when to claim your Bitcoin
- No risk of failed transfers to your wallet
- You can let multiple purchases accumulate before withdrawing

## Why On-Chain DCA?

| Traditional DCA | BitChill DCA |
|-----------------|--------------|
| Requires manual action or CEX | Fully automated, non-custodial |
| Funds sit idle between purchases | Funds earn yield while waiting |
| Trust a centralized exchange | Trust only smart contracts |
| Limited transparency | Fully verifiable on-chain |

## Purchase Periods

BitChill currently supports three purchase intervals:

| Period | Use Case |
|--------|----------|
| **1 Week** | Maximum averaging, lower per-purchase impact |
| **2 Weeks** | Balanced approach |
| **4 Weeks** | Lower gas costs, larger individual purchases |

Choose based on your preference for averaging frequency versus transaction costs.

## Next Steps

- [See which tokens are supported](/docs/getting-started/supported-assets)
- [Create your first DCA schedule](/docs/user-guide/create-schedule)
