---
sidebar_position: 3
---

# Managing Your Schedules

Once you have active DCA schedules, you can monitor and modify them through the BitChill interface.

## Viewing Your Schedules

Navigate to the **Schedules** page to see all your active DCA schedules. Each schedule displays:

- **Stablecoin**: DOC or USDRIF
- **Lending Protocol**: Tropykus or Sovryn
- **Balance**: Remaining stablecoins for future purchases
- **Purchase Amount**: Amount swapped each period
- **Purchase Period**: Frequency (1, 2, or 4 weeks)
- **Next Purchase**: When the next swap will occur
- **Accumulated rBTC**: Bitcoin purchased and ready to withdraw

## Modifying a Schedule

### Changing Purchase Amount

You can adjust how much is swapped each period:

1. Select your schedule
2. Click **"Edit Purchase Amount"**
3. Enter the new amount
4. Confirm the transaction

**Constraints**:
- New amount must meet minimum requirements
- Cannot exceed 50% of current balance

### Changing Purchase Period

Adjust how frequently purchases occur:

1. Select your schedule
2. Click **"Edit Period"**
3. Choose 1, 2, or 4 weeks
4. Confirm the transaction

:::note Period Changes
Changing the period resets the countdown for your next purchase from the current time.
:::

## Adding Funds

To extend the life of your schedule:

1. Select your schedule
2. Click **"Deposit"**
3. Enter the amount to add
4. Approve token spending (if needed)
5. Confirm the deposit transaction

Your additional funds will be deposited into the lending protocol and included in future purchases.

## Withdrawing Funds

To remove stablecoins from your schedule (before they're swapped):

1. Select your schedule
2. Click **"Withdraw"**
3. Enter the amount to withdraw
4. Confirm the transaction

**Note**: Withdrawn stablecoins include any accrued interest from the lending protocol.

## Deleting a Schedule

To completely close a schedule:

1. Select your schedule
2. Click **"Delete Schedule"**
3. Confirm the transaction

**What happens**:
- Remaining stablecoins are returned to your wallet
- Accrued interest is included in the refund
- Accumulated rBTC must be withdrawn separately first

:::warning Before Deleting
Withdraw any accumulated rBTC before deleting the schedule. Deleting only returns stablecoins, not purchased rBTC.
:::

## Multiple Schedules

You can have multiple schedules with different configurations:

| Schedule | Stablecoin | Protocol | Period | Strategy |
|----------|------------|----------|--------|----------|
| #1 | DOC | Tropykus | 1 week | Aggressive DCA |
| #2 | USDRIF | Tropykus | 4 weeks | Conservative DCA |
| #3 | DOC | Sovryn | 2 weeks | Alternative yield |

This allows you to:
- Diversify across lending protocols
- Test different DCA frequencies
- Manage different stablecoin holdings

## Schedule States

| State | Description |
|-------|-------------|
| **Active** | Schedule has balance and is executing purchases |
| **Depleted** | Balance exhausted, may have accumulated rBTC |
| **Paused** | Not currently available (future feature) |

## Monitoring Performance

Track your DCA performance:

- **Average Purchase Price**: Compare to current BTC price
- **Total rBTC Accumulated**: Sum of all purchases
- **Purchase History**: View each individual swap

Navigate to **History** to see detailed transaction records.

## Next Steps

- [Withdraw your accumulated rBTC](/docs/user-guide/withdraw-rbtc)
- [Understand how yield works](/docs/user-guide/earning-yield)
