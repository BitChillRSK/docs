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

Read accrued interest on chain with `getAccruedInterest(user, token, routeIndex)` on a lending route. Do not store or display an accrued-interest quote from an offchain cache. Do not present a lending rate as guaranteed. The BitChill app labels the LayerBank supply APY as indicative.

Read the token minimum on chain with `getTokenMinPurchaseAmount(token)` before a create or an amount edit. The owner can change it after launch.

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

Route indexes are 0 for idle and 1 for LayerBank. The initial launch has two active pairs: DOC on index 0 and DOC on index 1. The protocol also implements USDRIF and USDT0 on both indexes. The initial launch does not assign those handlers. A create on a pair with no handler reverts, so no schedule can exist on it. Index 2 is unused on this protocol. It is not registered, and the protocol never reuses it for another venue. A DOC create with index 2 reverts with `DcaManager__TokenNotAccepted`. `withdrawAllAccumulatedRbtc` and `withdrawAllAccumulatedInterest` skip a pair with no handler, including a pair with index 2. Use a pair from the [route table](/docs/getting-started/supported-assets#route-pairs). Sovryn and Tropykus are not routes of this protocol.

Take the active pairs from the deployment, not from a fixed list. Read the handler with `getHandler(token, routeIndex)` on the registry. A zero address means that pair has no handler. A later reviewed configuration can assign a catalog pair on the same registry, for example a USDRIF or USDT0 DEX handler. An integration that reads the registry needs no code change for it. Do not map index 2 to any venue.

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

`withdrawLendingShares` emits only `DcaManager__TokenBalanceUpdated` on the manager side. It emits no created, deleted, or pause event.

The created, deleted, and balance events include the token and the decimal schedule id. The pause event includes the user and the schedule id.

From a handler:

- `TokenHandler__TokenDeposited` and `TokenHandler__TokenWithdrawn`
- `PurchaseRbtc__RbtcBought`, `PurchaseRbtc__SuccessfulRbtcBatchPurchase`, and `PurchaseFees__FeeCredited`
- `PurchaseRbtc__rBtcWithdrawn`
- On a DEX handler (USDRIF or USDT0, not enabled at the initial launch): `PurchaseUniswap__NewPathSet`, `PurchaseUniswap__PurchasePathAllowedSet`, `PurchaseUniswap__AmountOutMinimumPercentUpdated`, `PurchaseUniswap__AmountOutMinimumSafetyCheckUpdated`, and `PurchaseUniswap__OracleUpdated`.
- On a LayerBank handler: `LendingHandler__UserSharesUpdated`, `LendingHandler__SharesRedeemed`, `LendingHandler__SharesRedeemedBatch`, `LendingHandler__WithdrawalAmountAdjusted`, `LendingHandler__InterestWithdrawn`, and `LendingHandler__SharesWithdrawn`. A purchase emits one `LendingHandler__SharesRedeemedBatch` for the batch and no `LendingHandler__SharesRedeemed`. A user withdrawal or an interest withdrawal emits `LendingHandler__SharesRedeemed`.

### Event order

The order of logs inside one transaction matters when an indexer keeps the last balance event of a schedule.

| Call | Order of logs |
| --- | --- |
| `depositToken` | The manager stores the new balance and emits `DcaManager__TokenBalanceUpdated`. Then the handler pulls the deposit and emits its events. |
| `withdrawToken`, `withdrawTokenAndInterest` | The manager stores the debit and emits `DcaManager__TokenBalanceUpdated`. Then the handler pays out and emits its events. |
| `createDcaSchedule` | The handler pulls the deposit and emits its events. Then the manager emits `DcaManager__DcaScheduleCreated`. |
| `deleteDcaSchedule` | The handler pays out and emits its events. Then the manager emits `DcaManager__DcaScheduleDeleted`. |
| A purchase | The manager emits `DcaManager__TokenBalanceUpdated` for each row. Then the handler buys and emits its purchase events. |
| `withdrawLendingShares` | The manager emits `DcaManager__TokenBalanceUpdated(token, scheduleId, 0)` for each funded schedule on the route. It emits none for a schedule that is already at zero. Then the handler emits `LendingHandler__UserSharesUpdated(user, previous, remaining)`, then `LendingHandler__SharesWithdrawn(user, receiptToken, shares)`. |

A token or a lending market can call back during a handler call. If that callback runs a purchase, the purchase logs its balance event after the balance event of the user call. The last `DcaManager__TokenBalanceUpdated` of a schedule in a transaction is therefore its stored balance. Do not assume that a manager balance event comes after the handler events of the same call.

### Lending-share withdrawal

`withdrawLendingShares` emits this event on the handler:

```solidity
event LendingHandler__SharesWithdrawn(address indexed user, address indexed receiptToken, uint256 shares);
```

- `shares` is in receipt-share units of the lending protocol. On LayerBank this is the scaled aToken amount. It is not a stablecoin amount. Do not add it to a stablecoin total, and do not turn it into a stablecoin value without the current index.
- `shares` equals `previous - remaining` in the `LendingHandler__UserSharesUpdated` of the same transaction. `shares` is positive.
- `remaining` can be above zero. Supported LayerBank rounding leaves zero or one scaled share. A lending protocol that transfers less than requested can leave more. Keep the remaining shares as booked to the user. Do not assume that they are zero. A later call can withdraw them, even when every schedule balance is zero.
- `receiptToken` is the token that the handler transferred to the user.
- The balance events are principal debits. They are not stablecoin cash payouts. A share withdrawal emits no `TokenHandler__TokenWithdrawn`, no `LendingHandler__SharesRedeemed`, and no `LendingHandler__InterestWithdrawn`. No stablecoin leaves the handler.
- A schedule balance debit to zero in this transaction does not mean that the user received stablecoin. A cash ledger must not record a payout for it.

Example with a nonzero remainder, in receipt-share units: the user holds 1,000 shares and one funded schedule. The transaction logs `DcaManager__TokenBalanceUpdated(token, scheduleId, 0)`, then `LendingHandler__UserSharesUpdated(user, 1000, 1)`, then `LendingHandler__SharesWithdrawn(user, receiptToken, 999)`. The user keeps 1 booked share. The schedule stays at balance zero. Another call can withdraw the 1 share, and it clears any schedule balance that the user funded again before it.

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
- `DcaManager__TokenIsNotLent` (a `withdrawLendingShares` call on an idle or unregistered route)
- `LendingHandler__NoSharesToWithdraw(user)` (a `withdrawLendingShares` call by a user with no shares in that handler)
- `LendingHandler__ShareConsumptionMismatch(intendedDecrease, balanceBefore, balanceAfter)`. A lending redeem, a purchase, or a `withdrawLendingShares` call can raise it. In a share withdrawal, the handler's receipt-share balance did not fall, or fell by more than the booked shares.
- `LendingHandler__DepositConsumptionMismatch(intendedDecrease, balanceBefore, balanceAfter)` (selector `0x64ec060f`). A deposit or a create on a LayerBank route reverts when the lending market does not take exactly the deposit. The revert keeps the user's tokens in the user's account.

Purchase calls, examples:

- `PurchaseRbtc__BelowSwapperMinimum(received, scaledMinimum)`
- `PurchaseRbtc__ZeroQuotedStablecoinInput()` (selector `0x4e339109`)
- `PurchaseRbtc__InputAmountNotFullySpent`
- `LendingHandler__ZeroShareValue`

The second argument of `PurchaseRbtc__BelowSwapperMinimum` is the minimum after scaling to the actual input. It can differ from the `minRbtcOut` value of the batch. On a DEX handler, the router enforces the oracle floor as part of `amountOutMinimum`, so an output below the floor is a router revert, not a BitChill error. See [Purchase minimum](/docs/contracts/core-contracts#purchase-minimum).

## Exit rules for a client

A schedule pause blocks purchases for that schedule. A deposit pause blocks new deposits for one token and one route. Neither pause blocks a withdrawal, a delete, an rBTC claim, or an edit.

The protected window can block an edit, a delete, a principal withdrawal, an interest withdrawal, and a lending-share withdrawal for five blocks. A window opened in block `N` blocks these calls through block `N + 4`. They are available from block `N + 5`. It does not block an rBTC claim.

A lending-share withdrawal is a fallback for a lending route that cannot pay stablecoin. It transfers receipt tokens and no stablecoin. A client does not use it as an ordinary exit, and the BitChill front end keeps it disabled unless a lending protocol failure makes the stablecoin withdrawal impossible. See [Withdraw lending shares](/docs/contracts/core-contracts#withdraw-lending-shares).

A delete returns principal. It does not claim interest, and it does not claim rBTC.

Keep the exit calls available when your stored copy is missing or stale. Website data must not be required for a withdrawal, a delete, or an rBTC claim.

The [offchain services page](/docs/contracts/offchain-services) describes how BitChill's own swapper, monitoring service, data API, and app follow these rules.
