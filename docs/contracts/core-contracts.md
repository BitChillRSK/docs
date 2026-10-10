---
sidebar_position: 2
---

# Core calls

These signatures describe the undeployed protocol. Do not send them to an old deployment. No manager address is published on the address page.

## DcaManager user calls

```solidity
function createDcaSchedule(
    address token,
    uint256 depositAmount,
    uint256 purchaseAmount,
    uint256 purchasePeriod,
    uint256 routeIndex
) external;

function depositToken(address token, uint64 scheduleId, uint256 depositAmount) external;
function updatePurchaseAmount(address token, uint64 scheduleId, uint256 newPurchaseAmount) external;
function updatePurchasePeriod(address token, uint64 scheduleId, uint256 newPurchasePeriod) external;
function setSchedulePaused(address token, uint64 scheduleId, bool paused) external;
function deleteDcaSchedule(address token, uint64 scheduleId, uint256 scheduleIdIndex) external;
function withdrawToken(address token, uint64 scheduleId, uint256 withdrawalAmount) external;
function withdrawTokenAndInterest(address token, uint64 scheduleId, uint256 withdrawalAmount) external;
function topUpFromInterest(address token, uint64 scheduleId, uint256 amount) external;
function withdrawAllAccumulatedInterest(address[] calldata tokens, uint256[] calldata routeIndexes) external;
function withdrawAccumulatedRbtc(address token, uint256 routeIndex) external;
function withdrawAllAccumulatedRbtc(address[] calldata tokens, uint256[] calldata routeIndexes) external;
```

`withdrawTokenAndInterest` and `topUpFromInterest` are for a lending route. An idle schedule reverts those calls. `topUpFromInterest` adds lending interest to one schedule's principal. It does not move tokens out. A delete returns principal and does not claim interest or rBTC. An accrued-interest figure is not available on this site.

A withdrawal amount of the maximum `uint256` value means the whole principal of that schedule.

## Schedule record

```solidity
struct DcaSchedule {
    uint128 tokenBalance;
    uint48 cadenceAnchor;
    bool paused;
    uint32 purchasePeriod;
    uint32 routeIndex;
    address user;
    uint96 purchaseAmount;
}
```

`tokenBalance` is principal the schedule can spend or withdraw. `cadenceAnchor` is a UTC midnight, or zero before the first purchase. `purchasePeriod` is a whole number of UTC days, stored in seconds. `scheduleId` is not inside this struct. You pass the decimal id with the stablecoin.

## Reads

```solidity
function getDcaSchedule(address token, uint64 scheduleId) external view returns (DcaSchedule memory);
function getDcaSchedules(address user, address token)
    external view returns (uint64[] memory scheduleIds, DcaSchedule[] memory schedules);
function getAccumulatedRbtcBalance(address user, address token, uint256 routeIndex) external view returns (uint256);
function getMinPurchasePeriod() external view returns (uint256);
function getMaxSchedulesPerToken() external view returns (uint256);
function getTokenMinPurchaseAmount(address token) external view returns (uint256);
```

`getDcaSchedules` returns ids and records in the same order. A delete can move the last id into a freed slot. Address a schedule by the id and the token.

An accrued-interest figure is not available from the offchain system. These pages do not publish one, and they do not publish a live APY.

## Swapper calls

```solidity
struct Batch {
    uint64[] scheduleIds;
    address token;
    uint256 routeIndex;
    uint256 minRbtcOut;
}

function batchBuyRbtc(Batch calldata batch) external;
function batchBuyRbtcAcrossHandlers(Batch[] calldata batches) external;
function activateProtectedPurchaseWindow() external;
```

Only an allowlisted swapper can call these. A paused schedule in a batch reverts that batch. In a multi-handler call, one failed batch reverts every handler in the call.

The protected window lasts five blocks. During it, the contract refuses amount edits, period edits, pause edits, deletes, principal withdrawals, and interest withdrawals. An rBTC claim stays open.

## Owner settings on the manager

```solidity
function setMinPurchasePeriod(uint256 minPurchasePeriod) external;
function setMaxSchedulesPerToken(uint256 maxSchedulesPerToken) external;
function setTokenMinPurchaseAmount(address token, uint256 minPurchaseAmount) external;
```

The minimum period is a whole number of UTC days and is at least one day. Each stablecoin has its own purchase minimum. A zero minimum is rejected.

## OperationsAdmin

```solidity
function registerRoute(uint256 index, bool lends) external;
function assignHandler(address token, uint256 routeIndex, address handler) external;
function setDepositsPaused(address token, uint256 routeIndex, bool paused) external;
function addSwapper(address swapper) external;
function revokeSwapper(address swapper) external;

function getHandler(address token, uint256 routeIndex) external view returns (address handler);
function areDepositsPaused(address token, uint256 routeIndex) external view returns (bool paused);
function isSwapper(address account) external view returns (bool);
```

A route class is set once. A handler assignment is add-only. One handler address backs one pair. A deposit pause blocks new deposits for that pair. It does not block a purchase, an edit, a withdrawal, a delete, or an rBTC claim.

## Fee settings on a handler

```solidity
struct FeeSettings {
    uint16 minFeeRate;
    uint16 maxFeeRate;
    uint112 feePurchaseLowerBound;
}

function setFeeRateParams(uint256 minFeeRate, uint256 maxFeeRate, uint256 feePurchaseLowerBound) external;
function getFeeSettings() external view returns (FeeSettings memory);
```

Rates are basis points. The maximum rate cannot be above 500. The weight is applied to the rBTC output. The purchase still spends the gross stablecoin amount. No live rate is published.

## Validation that callers hit

- The deposit is greater than zero.
- The purchase amount meets the token minimum and does not exceed the schedule principal.
- The period is a whole number of UTC days and meets the protocol minimum.
- The schedule id exists for that token and belongs to the caller.
- A delete index currently points at that id.
- The first purchase is eligible on the creation UTC day once the swapper submits it. A later purchase becomes eligible at 00:00 UTC on the due day. Missed slots are skipped. There is no catch-up.
- A purchase needs enough principal for one gross purchase.

## Source

The public contract repository is [dca-contracts](https://github.com/BitChillRSK/dca-contracts). These pages do not point at a deployed instance.
