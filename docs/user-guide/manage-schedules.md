---
sidebar_position: 3
---

# Managing Your Schedules

## What You Can Update

Per schedule, users can:

- add stablecoin (`depositToken`)
- withdraw stablecoin principal (`withdrawToken`)
- update purchase amount (`setPurchaseAmount`)
- update purchase period (`setPurchasePeriod`)
- update multiple fields at once (`updateDcaSchedule`)
- delete schedule (`deleteDcaSchedule`)

All schedule-mutating actions validate both `scheduleIndex` and `scheduleId`.

## Important Behavior Details

### Purchase period updates

Changing purchase period **does not reset** `lastPurchaseTimestamp`. It only updates the period value used in the next eligibility check.

### Stablecoin withdrawal vs interest

`withdrawToken` and `deleteDcaSchedule` affect schedule principal balance. Interest is handled separately.

To include interest withdrawal, use:

- `withdrawTokenAndInterest(...)`
- `withdrawAllAccumulatedInterest(...)`

### Schedule deletion

Deleting a schedule returns remaining schedule principal tracked in that schedule. It does not automatically withdraw accumulated rBTC from handlers.

## Multiple Schedules

Users can keep multiple schedules per token (up to configured max). Each schedule has independent:

- purchase amount
- purchase period
- token balance
- last purchase timestamp

## Recommended Workflow

1. Withdraw accumulated rBTC if desired.
2. If needed, withdraw accumulated interest.
3. Then delete or rebalance schedules.

## Next Steps

- [Withdraw accumulated rBTC](/docs/user-guide/withdraw-rbtc)
- [Yield and interest details](/docs/user-guide/earning-yield)
