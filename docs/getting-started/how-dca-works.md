---
sidebar_position: 1
---

# How DCA Works

Dollar Cost Averaging (DCA) means buying a fixed amount at recurring intervals. BitChill automates this on-chain.

## BitChill Execution Model

### 1. Create a Schedule

You set:

- `token` (DOC or USDRIF)
- `depositAmount`
- `purchaseAmount`
- `purchasePeriod` (seconds)
- `lendingProtocolIndex` (for supported handlers)

Contract checks include:

- `depositAmount > 0`
- `purchaseAmount >= configuredTokenMinimum`
- `purchaseAmount <= currentScheduleBalance / 2`
- `purchasePeriod >= configuredMinimumPeriod`

### 2. Funds Are Held by the Token Handler

After schedule creation, the selected handler receives the stablecoin. If that handler includes lending integration, funds are deposited to the lending protocol and represented internally by lending-token accounting.

### 3. Purchases Are Triggered Periodically

A wallet with `SWAPPER_ROLE` executes purchases by calling DcaManager purchase functions.

For each schedule purchase:

1. Schedule checks run (`scheduleId`, period elapsed, sufficient balance)
2. Schedule `tokenBalance` is reduced by `purchaseAmount`
3. Handler redeems required stablecoin (from lending if applicable)
4. Fee is charged by handler rules
5. Net amount is swapped to rBTC (MoC for DOC handlers, Uniswap for DEX handlers)

### 4. rBTC Is Accumulated per Handler

Purchased rBTC is tracked in handler storage as:

- `mapping(user => accumulatedRbtc)`

That means rBTC is not stored per schedule ID; it is stored per user per handler.

### 5. User Withdrawals

Users can withdraw:

- **rBTC**: from one handler (`withdrawRbtcFromTokenHandler`) or many (`withdrawAllAccumulatedRbtc`)
- **stablecoin principal**: with `withdrawToken` or by deleting schedule
- **interest**: via `withdrawAllAccumulatedInterest` or `withdrawTokenAndInterest`

## Notes on Period Presets

The frontend currently offers weekly presets (1, 2, 4 weeks), but contract-level validation is based on the configurable minimum period in seconds.

## Next Steps

- [Supported assets and protocols](/docs/getting-started/supported-assets)
- [Create your first schedule](/docs/user-guide/create-schedule)
