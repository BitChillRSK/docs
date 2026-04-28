---
sidebar_position: 1
---

# How DCA Works

Dollar Cost Averaging (DCA) is an investment strategy where you buy a fixed amount of an asset at regular intervals, regardless of price. This approach:

- **Reduces timing risk**: You don't need to predict market tops or bottoms
- **Smooths out volatility**: Your average purchase price is more stable over time
- **Removes emotion**: Automated purchases prevent panic selling or FOMO buying
- **Builds discipline**: Consistent investing regardless of market conditions

## Traditional DCA vs BitChill

| Aspect | Traditional DCA | BitChill |
|--------|----------------|----------|
| Execution | Manual (remember to buy) | Automatic (smart contracts) |
| Frequency | Self-discipline required | Executed by swapper role when due |
| Idle funds | Sit in exchange/wallet | Earn yield in lending protocols |
| Custody | Often on exchanges | Non-custodial, your keys |
| Transparency | Trust the exchange | Verifiable on-chain |

## How BitChill Automates DCA

### Step 1: Create Your Schedule

When creating a schedule in BitChill, you configure:

- **Token**: Choose DOC or USDRIF as your stablecoin
- **Deposit Amount**: How much to deposit initially
- **Purchase Amount**: How much to convert to rBTC each period
- **Purchase Period**: How often (1, 2, or 4 weeks)
- **Lending Protocol**: Where your stablecoins earn yield (Sovryn active; Tropykus legacy)

**Contract validations:**
- `purchaseAmount >= configuredTokenMinimum`
- `purchaseAmount <= currentScheduleBalance / 2`
- `purchasePeriod >= configuredMinimumPeriod`

### Step 2: Your Stablecoins Earn Yield

After creating a schedule, your stablecoins are deposited into the selected lending protocol:

- **Sovryn**: Lending pool integration (iSUSD) - active for new schedules
- **Tropykus**: Compound-style lending (kDOC, kUSDRIF tokens) - legacy/sunset

Your funds earn interest while waiting to be swapped for rBTC.

### Step 3: Automatic Periodic Purchases

At each scheduled interval, the BitChill swapper infrastructure:

1. Verifies the purchase period has elapsed
2. Withdraws the purchase amount from lending
3. Deducts a small protocol fee
4. Swaps the remaining amount for rBTC via Money on Chain (DOC) or Uniswap V3 (USDRIF)
5. Credits the purchased rBTC to your account

### Step 4: rBTC Accumulates in Handlers

Purchased rBTC is tracked in handler storage:

```
mapping(user => accumulatedRbtc)
```

**Important**: rBTC is tracked per user **per handler** (token + lending protocol combination), not per individual schedule. If you have multiple schedules with the same token and lending protocol, the rBTC accumulates together.

### Step 5: Withdraw When Ready

BitChill uses a "pull" pattern for withdrawals. Your rBTC stays in the handler contracts until you're ready to withdraw:

- **Withdraw from one handler**: `withdrawRbtcFromTokenHandler`
- **Withdraw from all handlers**: `withdrawAllAccumulatedRbtc`
- **Withdraw stablecoin principal**: `withdrawToken` or delete the schedule
- **Withdraw accrued interest**: `withdrawAllAccumulatedInterest`

## Example DCA Journey

Let's say you deposit 1000 DOC with a 100 DOC weekly purchase amount:

| Week | Schedule Balance | Purchase | Accumulated rBTC | Notes |
|------|-----------------|----------|------------------|-------|
| 0 | 1000 DOC | - | 0 | Initial deposit |
| 1 | 900 DOC | 100 DOC | ~0.001 BTC | First purchase |
| 2 | 800 DOC | 100 DOC | ~0.002 BTC | Price might vary |
| ... | ... | ... | ... | Continues until balance runs out |

Meanwhile, your remaining DOC balance earns interest in the selected lending protocol.

## Next Steps

- [See supported tokens and protocols](/docs/getting-started/supported-assets)
- [Create your first schedule](/docs/user-guide/create-schedule)
