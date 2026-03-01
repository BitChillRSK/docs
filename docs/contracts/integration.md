---
sidebar_position: 4
---

# Integration Guide

Use `DcaManager` for schedule lifecycle and handler-specific contracts for per-handler accumulated rBTC reads.

## Core Addresses (Mainnet)

- DcaManager: `0x4d9cbe0f242EE85F7Fa25C77329749381bA998be`
- OperationsAdmin: `0x942B18A5f78eD612635b6E5FbC49159B5a955f59`

## Read Examples

### 1. Read user schedules

```ts
import { ethers } from 'ethers';

const dcaManager = new ethers.Contract(
  '0x4d9cbe0f242EE85F7Fa25C77329749381bA998be',
  [
    'function getDcaSchedules(address user, address token) view returns ((uint256 tokenBalance,uint256 purchaseAmount,uint256 purchasePeriod,uint256 lastPurchaseTimestamp,bytes32 scheduleId,uint256 lendingProtocolIndex)[])'
  ],
  provider
);

const schedules = await dcaManager.getDcaSchedules(userAddress, docTokenAddress);
```

### 2. Read accrued interest for token + lending protocol

```ts
const dcaManager = new ethers.Contract(
  DCA_MANAGER,
  ['function getInterestAccrued(address user, address token, uint256 lendingProtocolIndex) view returns (uint256)'],
  provider
);

const interest = await dcaManager.getInterestAccrued(userAddress, docTokenAddress, 1n);
```

### 3. Read accumulated rBTC in a specific handler

`DcaManager` does not expose a direct `getAccumulatedRbtcBalance` view. Read from the handler contract:

```ts
const handler = new ethers.Contract(
  tropykusDocHandlerAddress,
  ['function getAccumulatedRbtcBalance(address user) view returns (uint256)'],
  provider
);

const accumulated = await handler.getAccumulatedRbtcBalance(userAddress);
```

## Write Examples

### 1. Create schedule

```ts
const dcaManager = new ethers.Contract(
  DCA_MANAGER,
  ['function createDcaSchedule(address token,uint256 depositAmount,uint256 purchaseAmount,uint256 purchasePeriod,uint256 lendingProtocolIndex)'],
  signer
);

const token = new ethers.Contract(docTokenAddress, ['function approve(address,uint256) returns (bool)'], signer);
await (await token.approve(DCA_MANAGER, depositAmount)).wait();

await (
  await dcaManager.createDcaSchedule(
    docTokenAddress,
    depositAmount,
    purchaseAmount,
    604800n, // 1 week preset (frontend choice)
    1n       // Tropykus
  )
).wait();
```

### 2. Add funds to existing schedule

```ts
const dcaManager = new ethers.Contract(
  DCA_MANAGER,
  ['function depositToken(address token,uint256 scheduleIndex,bytes32 scheduleId,uint256 depositAmount)'],
  signer
);

await (await token.approve(DCA_MANAGER, amount)).wait();
await (await dcaManager.depositToken(docTokenAddress, scheduleIndex, scheduleId, amount)).wait();
```

### 3. Withdraw rBTC from one handler

```ts
const dcaManager = new ethers.Contract(
  DCA_MANAGER,
  ['function withdrawRbtcFromTokenHandler(address token,uint256 lendingProtocolIndex)'],
  signer
);

await (await dcaManager.withdrawRbtcFromTokenHandler(docTokenAddress, 1n)).wait();
```

### 4. Withdraw rBTC across multiple handlers

```ts
await (
  await dcaManager.withdrawAllAccumulatedRbtc(
    [docTokenAddress, usdrifTokenAddress],
    [1n, 2n]
  )
).wait();
```

## Events to Index

From `DcaManager`:

- `DcaManager__DcaScheduleCreated`
- `DcaManager__DcaScheduleUpdated`
- `DcaManager__DcaScheduleDeleted`
- `DcaManager__TokenBalanceUpdated`
- `DcaManager__LastPurchaseTimestampUpdated`

From handlers:

- `PurchaseRbtc__RbtcBought`
- `PurchaseRbtc__SuccessfulRbtcBatchPurchase`
- `PurchaseRbtc__rBtcWithdrawn`
- lending events from `ITokenLending` when tracking interest/redemptions

## Common Reverts (DcaManager)

Examples:

- `DcaManager__ScheduleIdAndIndexMismatch`
- `DcaManager__InexistentScheduleIndex`
- `DcaManager__PurchaseAmountMustBeGreaterThanMinimum`
- `DcaManager__PurchaseAmountMustBeLowerThanHalfOfBalance`
- `DcaManager__CannotBuyIfPurchasePeriodHasNotElapsed`
- `DcaManager__TokenNotAccepted`

## Integration Tips

1. Persist `scheduleId` from reads/events; do not rely only on index.
2. Treat handler as the source of truth for accumulated rBTC balance reads.
3. Keep token/lending-protocol matrices explicit in your backend to avoid wrong handler assumptions.
4. Decode custom errors in client/backend logs for actionable diagnostics.
