---
sidebar_position: 3
---

# Managing Your Schedules

Once you've created a DCA schedule, you can modify it at any time. This guide covers all the ways you can manage your active schedules.

## Viewing Your Schedules

From the BitChill app dashboard, you can see:

- All your active schedules
- Current balance in each schedule
- Next purchase date
- Total accumulated rBTC
- Accrued interest

## What You Can Modify

| Action | Function | Description |
|--------|----------|-------------|
| Add funds | `depositToken` | Top up your schedule balance |
| Withdraw funds | `withdrawToken` | Remove stablecoins from schedule |
| Change purchase amount | `setPurchaseAmount` | Adjust how much is swapped each period |
| Change period | `setPurchasePeriod` | Switch between 1/2/4 week intervals |
| Update multiple | `updateDcaSchedule` | Change several parameters at once |
| Delete | `deleteDcaSchedule` | Remove the schedule entirely |

## Adding More Funds

You can top up your schedule at any time:

1. Navigate to your schedule
2. Click "Add Funds" or "Deposit"
3. Enter the amount to add
4. Confirm the transaction

Your schedule continues with the new balance, maintaining your existing purchase settings.

## Withdrawing Stablecoins

Need to reduce your position? Withdraw some of your stablecoin balance:

1. Navigate to your schedule
2. Click "Withdraw"
3. Enter the amount to withdraw
4. Confirm the transaction

:::warning Important
Withdrawing stablecoins does **not** include accrued interest. Use `withdrawTokenAndInterest` if you want both.
:::

## Changing Purchase Amount

Adjust how much is swapped for rBTC each period:

**Requirements**:
- New amount must meet minimum purchase requirements
- New amount cannot exceed 50% of remaining balance

Changes take effect on the next scheduled purchase.

## Changing Purchase Period

Switch between 1, 2, or 4 week intervals:

:::info Note
Changing the period does **not** reset your last purchase timestamp. The new period applies to the next eligibility check.
:::

For example, if you purchased yesterday and switch from 1 week to 2 weeks, your next purchase will be 2 weeks from the original purchase, not 2 weeks from now.

## Deleting a Schedule

When you delete a schedule:

1. ✅ Remaining stablecoin principal is returned to you
2. ❌ Accrued interest is **not** automatically withdrawn
3. ❌ Accumulated rBTC is **not** automatically withdrawn

**Before deleting**, consider:
- Withdrawing your accumulated rBTC first
- Withdrawing any accrued interest

## Multiple Schedules

You can have multiple schedules for the same token (up to the configured maximum). Each schedule has independent:

- Purchase amount
- Purchase period
- Token balance
- Last purchase timestamp
- Schedule ID

This allows you to run different strategies simultaneously, such as:
- A larger weekly purchase + a smaller monthly purchase
- Different lending protocols for the same token

## Recommended Workflow

When closing out your BitChill positions:

```
1. Withdraw accumulated rBTC (from handlers)
     ↓
2. Withdraw accrued interest (if any)
     ↓
3. Delete schedule (returns remaining principal)
```

## Technical Details

All schedule modifications require both:
- `scheduleIndex`: Position in your schedules array
- `scheduleId`: Unique identifier for the schedule

This dual validation prevents issues if schedule order changes.

## Next Steps

- [Withdraw your rBTC](/docs/user-guide/withdraw-rbtc)
- [Understanding yield and interest](/docs/user-guide/earning-yield)
- [FAQ](/docs/resources/faq)
