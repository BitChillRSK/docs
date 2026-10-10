---
sidebar_position: 4
---

# Integration notes

The protocol contracts are not deployed. Do not point an integration at an older manager, registry, handler, swapper, or fee collector.

Build the call against the signatures below. Supply the manager address only after a deployment publishes it.

## Read a schedule

The key is the stablecoin and the decimal schedule id.

```solidity
function getDcaSchedule(address token, uint64 scheduleId) external view returns (
    uint128 tokenBalance,
    uint48 cadenceAnchor,
    bool paused,
    uint32 purchasePeriod,
    uint32 routeIndex,
    address user,
    uint96 purchaseAmount
);
```

`getDcaSchedules(user, token)` returns two arrays. `scheduleIds[i]` matches `schedules[i]`. Store the id. A later delete can change the list order.

`cadenceAnchor` is a UTC midnight after the first purchase, or zero before it. It is not the purchase timestamp. Eligibility for a later purchase starts at 00:00 UTC on the due day. A missed slot is skipped.

## Read buyer-net rBTC

```solidity
function getAccumulatedRbtcBalance(address user, address token, uint256 routeIndex) external view returns (uint256);
```

The unit is wei of rBTC. The balance is for that account, token, and route.

An accrued-interest figure is not available. Do not store or display an accrued-interest quote from an offchain cache. Do not publish a live APY.

## Create

```solidity
function createDcaSchedule(
    address token,
    uint256 depositAmount,
    uint256 purchaseAmount,
    uint256 purchasePeriod,
    uint256 routeIndex
) external;
```

`purchasePeriod` is a whole number of UTC days, in seconds. `purchaseAmount` is the gross stablecoin amount and cannot exceed the deposit. Approve the full deposit to the manager first.

Route indexes in the deployment script are 0 for idle, 1 for LayerBank, and 2 for Sovryn. Use a pair from the route table. Tropykus is not a route.

## Claim rBTC

```solidity
function withdrawAccumulatedRbtc(address token, uint256 routeIndex) external;
function withdrawAllAccumulatedRbtc(address[] calldata tokens, uint256[] calldata routeIndexes) external;
```

The two arrays are pairs. A zero handler or a zero balance is skipped in the batch call.

## Events to follow

From the manager:

- `DcaManager__DcaScheduleCreated`
- `DcaManager__TokenBalanceUpdated`
- `DcaManager__PurchaseAmountUpdated`
- `DcaManager__PurchasePeriodUpdated`
- `DcaManager__SchedulePauseSet`
- `DcaManager__DcaScheduleDeleted`
- `DcaManager__ProtectedPurchaseWindowActivated`

The created, deleted, and balance events include the token and the decimal schedule id. The pause event includes the user and the schedule id.

## Checks that revert

Examples:

- `DcaManager__InexistentSchedule`
- `DcaManager__NotScheduleOwner`
- `DcaManager__ScheduleIdIndexMismatch`
- `DcaManager__DepositsPaused`
- `DcaManager__SchedulePaused`
- `DcaManager__PurchaseAmountExceedsBalance`
- `DcaManager__PurchasePeriodMustBeWholeDays`
- `DcaManager__CannotBuyIfPurchasePeriodHasNotElapsed`
- `DcaManager__ScheduleBalanceNotEnoughForPurchase`
- `DcaManager__UserMutationsLocked`
- `DcaManager__TokenNotAccepted`

## Exit rules for a client

A schedule pause blocks purchases for that schedule. A deposit pause blocks new deposits for one token and one route. Neither pause blocks a withdrawal, a delete, an rBTC claim, or an edit.

The protected window can block an edit, a delete, a principal withdrawal, and an interest withdrawal for five blocks. It does not block an rBTC claim.

A delete returns principal. It does not claim interest, and it does not claim rBTC.

Keep the exit calls available when your stored copy is missing or stale. Website data must not be required for a withdrawal, a delete, or an rBTC claim.
