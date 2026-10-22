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

`cadenceAnchor` is a UTC midnight after the first purchase, or zero before it. It is not the purchase timestamp. The first purchase is eligible on the creation UTC day once the swapper submits it. A later purchase becomes eligible at 00:00 UTC on the due day. Missed slots are skipped. There is no catch-up.

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

`purchasePeriod` is a whole number of UTC days, in seconds. `purchaseAmount` is the gross stablecoin amount and cannot exceed the deposit. Approve the handler for that token and route, for the full deposit. The handler pulls the deposit. The handler address comes from the deployment record after deployment. The protocol is not deployed, so this page does not publish a handler address.

Route indexes are 0 for idle and 1 for LayerBank. The initial launch has two active pairs: DOC on index 0 and DOC on index 1. The protocol also implements USDRIF and USDT0 on both indexes. The initial launch does not assign those handlers. A create on a pair with no handler reverts, so no schedule can exist on it. Index 2 is not registered at launch. A DOC create with index 2 reverts with `DcaManager__TokenNotAccepted`. `withdrawAllAccumulatedRbtc` and `withdrawAllAccumulatedInterest` skip a pair with no handler, including a pair with index 2. Use a pair from the [route table](/docs/getting-started/supported-assets#route-pairs). Tropykus is not a route.

Take the active pairs from the deployment, not from a fixed list. Read the handler with `getHandler(token, routeIndex)` on the registry. A zero address means that pair has no handler. A later reviewed configuration can assign a catalog pair on the same registry, for example a USDRIF or USDT0 DEX handler or a route 2 handler. An integration that reads the registry needs no code change for it.

## Claim rBTC

```solidity
function withdrawAllAccumulatedRbtc(address[] calldata tokens, uint256[] calldata routeIndexes) external;
```

This is the only rBTC claim call on the manager. The manager has no single-pair claim function. The two arrays are positional pairs: `tokens[i]` is claimed only from `routeIndexes[i]`.

- One pair: pass one-element arrays, for example `([DOC], [1])` for DOC on LayerBank.
- Several pairs: pass one entry for each pair, for example `([DOC, DOC], [0, 1])` for both pairs of the initial launch.
- Protocol example with a DEX token: `([DOC, USDT0], [0, 1])`. USDT0 is not enabled at the initial launch. While USDT0 on index 1 has no handler, the call skips that pair. It still pays the DOC pair when that pair has a balance.
- The arrays must have the same length and must not be empty. Otherwise the call reverts with `DcaManager__ArraysLengthMismatch` or `DcaManager__EmptyWithdrawalArrays`.
- A pair with no handler or with a zero balance is skipped.
- The caller must accept native rBTC with empty calldata. If one payment fails, the whole call reverts and every accumulated balance stays in place.

Read the balance of one pair first with `getAccumulatedRbtcBalance(user, token, routeIndex)` if you want to send only pairs that have rBTC.

## Events to follow

From the manager:

- `DcaManager__DcaScheduleCreated`
- `DcaManager__TokenBalanceUpdated`
- `DcaManager__PurchaseAmountUpdated`
- `DcaManager__PurchasePeriodUpdated`
- `DcaManager__SchedulePauseSet`
- `DcaManager__DcaScheduleDeleted`
- `DcaManager__ScheduleToppedUpFromInterest`
- `DcaManager__ProtectedPurchaseWindowActivated`

The created, deleted, and balance events include the token and the decimal schedule id. The pause event includes the user and the schedule id.

From a handler:

- `TokenHandler__TokenDeposited` and `TokenHandler__TokenWithdrawn`
- `PurchaseRbtc__RbtcBought`, `PurchaseRbtc__SuccessfulRbtcBatchPurchase`, and `PurchaseFees__FeeCredited`
- `PurchaseRbtc__rBtcWithdrawn`
- On a DEX handler (USDRIF or USDT0, not enabled at the initial launch): `PurchaseUniswap__NewPathSet`, `PurchaseUniswap__PurchasePathAllowedSet`, `PurchaseUniswap__AmountOutMinimumPercentUpdated`, `PurchaseUniswap__AmountOutMinimumSafetyCheckUpdated`, and `PurchaseUniswap__OracleUpdated`.
- On a LayerBank handler: `LendingHandler__UserSharesUpdated`, `LendingHandler__SharesRedeemed`, `LendingHandler__SharesRedeemedBatch`, `LendingHandler__WithdrawalAmountAdjusted`, and `LendingHandler__InterestWithdrawn`. A purchase emits one `LendingHandler__SharesRedeemedBatch` for the batch and no `LendingHandler__SharesRedeemed`. A user withdrawal or an interest withdrawal emits `LendingHandler__SharesRedeemed`.

### Event order

The order of logs inside one transaction matters when an indexer keeps the last balance event of a schedule.

| Call | Order of logs |
| --- | --- |
| `depositToken` | The manager stores the new balance and emits `DcaManager__TokenBalanceUpdated`. Then the handler pulls the deposit and emits its events. |
| `withdrawToken`, `withdrawTokenAndInterest` | The manager stores the debit and emits `DcaManager__TokenBalanceUpdated`. Then the handler pays out and emits its events. |
| `createDcaSchedule` | The handler pulls the deposit and emits its events. Then the manager emits `DcaManager__DcaScheduleCreated`. |
| `deleteDcaSchedule` | The handler pays out and emits its events. Then the manager emits `DcaManager__DcaScheduleDeleted`. |
| A purchase | The manager emits `DcaManager__TokenBalanceUpdated` for each row. Then the handler buys and emits its purchase events. |

A token or a lending market can call back during a handler call. If that callback runs a purchase, the purchase logs its balance event after the balance event of the user call. The last `DcaManager__TokenBalanceUpdated` of a schedule in a transaction is therefore its stored balance. Do not assume that a manager balance event comes after the handler events of the same call.

A LayerBank principal withdrawal that redeems nothing emits `LendingHandler__WithdrawalAmountAdjusted(user, requested, 0)`. It emits no `TokenHandler__TokenWithdrawn`. This happens when the user's shares are worth zero. The manager still debits the requested principal.

## Checks that revert

User calls, examples:

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
- `LendingHandler__DepositConsumptionMismatch(intendedDecrease, balanceBefore, balanceAfter)` (selector `0x64ec060f`). A deposit or a create on a LayerBank route reverts when the lending market does not take exactly the deposit. The revert keeps the user's tokens in the user's account.

Purchase calls, examples:

- `PurchaseRbtc__BelowSwapperMinimum(received, scaledMinimum)`
- `PurchaseRbtc__ZeroQuotedStablecoinInput()` (selector `0x4e339109`)
- `PurchaseUniswap__BelowOracleFloor(received, floor)` (selector `0x0f486c85`), DEX handlers only
- `PurchaseRbtc__InputAmountNotFullySpent`
- `LendingHandler__ZeroShareValue`

The second argument of `PurchaseRbtc__BelowSwapperMinimum` is the minimum after scaling to the actual input. It can differ from the `minRbtcOut` value of the batch. See [Purchase minimum](/docs/contracts/core-contracts#purchase-minimum).

## Exit rules for a client

A schedule pause blocks purchases for that schedule. A deposit pause blocks new deposits for one token and one route. Neither pause blocks a withdrawal, a delete, an rBTC claim, or an edit.

The protected window can block an edit, a delete, a principal withdrawal, and an interest withdrawal for five blocks. It does not block an rBTC claim.

A delete returns principal. It does not claim interest, and it does not claim rBTC.

Keep the exit calls available when your stored copy is missing or stale. Website data must not be required for a withdrawal, a delete, or an rBTC claim.

The [offchain services page](/docs/contracts/offchain-services) describes how BitChill's own swapper, monitoring service, data API, and app follow these rules.
