---
sidebar_position: 2
---

# Creating a DCA Schedule

A DCA schedule defines how BitChill will automatically purchase rBTC for you over time.

## Before You Start

Ensure you have:
- ✅ Wallet connected to BitChill
- ✅ rBTC for gas fees
- ✅ DOC or USDRIF stablecoins to deposit

## Creating Your Schedule

### Step 1: Navigate to Create Schedule

From the BitChill app, click **"Create Schedule"** or navigate to the Schedules page.

### Step 2: Select Stablecoin

Choose which stablecoin you want to use:

| Stablecoin | Best For |
|------------|----------|
| **DOC** | Bitcoin-backed stability, Money on Chain integration |
| **USDRIF** | RIF ecosystem users |

### Step 3: Choose Lending Protocol

Select where your stablecoins will earn yield while waiting:

| Protocol | Description |
|----------|-------------|
| **Tropykus** | Compound-fork lending, available for DOC and USDRIF |
| **Sovryn** | Sovryn lending pools, available for DOC |

:::tip Yield Comparison
APY rates vary between protocols. Check current rates on [Tropykus](https://tropykus.com/) and [Sovryn](https://sovryn.com/) to maximize your earnings.
:::

### Step 4: Set Deposit Amount

Enter the total amount of stablecoins you want to deposit into this schedule.

**Example**: Deposit 1000 DOC to have funds for multiple purchases.

### Step 5: Set Purchase Amount

Enter how much should be swapped for rBTC each period.

**Requirements**:
- Must be at least the minimum purchase amount (set by protocol)
- Cannot exceed 50% of your deposit (ensures multiple purchases)

**Example**: With 1000 DOC deposited, set 100 DOC per purchase for ~10 purchases.

### Step 6: Select Purchase Period

Choose how frequently purchases should occur:

| Period | Purchases per Month | Use Case |
|--------|---------------------|----------|
| **1 Week** | ~4 | Maximum averaging |
| **2 Weeks** | ~2 | Balanced approach |
| **4 Weeks** | ~1 | Lower transaction frequency |

### Step 7: Review and Create

Review your schedule parameters:

```
Stablecoin:      DOC
Protocol:        Tropykus
Deposit:         1000 DOC
Purchase Amount: 100 DOC per period
Period:          1 Week
Estimated Runs:  10 purchases
```

Click **"Create Schedule"** and confirm the transaction in your wallet.

## What Happens Next

After creation:

1. **Deposit**: Your stablecoins are transferred to the TokenHandler contract
2. **Lending**: Stablecoins are deposited into your chosen lending protocol
3. **Wait**: Interest accrues until your first purchase period elapses
4. **Swap**: BitChill automatically swaps your purchase amount for rBTC
5. **Repeat**: Process continues until your balance is depleted

## Schedule Limits

| Limit | Value |
|-------|-------|
| Max schedules per token | Configurable by protocol |
| Min purchase amount | ~$1 equivalent |
| Max purchase amount | 50% of schedule balance |
| Min purchase period | 1 week |

## Transaction Costs

Creating a schedule requires:
- Stablecoin approval (if first time)
- Schedule creation transaction

Estimated gas: ~0.0005 rBTC

## Next Steps

- [Managing your schedules](/docs/user-guide/manage-schedules)
- [Understanding fees](/docs/user-guide/fees)
