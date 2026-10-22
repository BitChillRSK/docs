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
function withdrawAllAccumulatedRbtc(address[] calldata tokens, uint256[] calldata routeIndexes) external;
```

`withdrawAllAccumulatedRbtc` is the only rBTC claim call. Its two arrays are positional pairs of token and route. For one pair, pass one-element arrays. For several pairs, pass one entry for each pair. A pair with no handler or with a zero balance is skipped. Empty arrays or arrays of different length revert. The [integration notes](/docs/contracts/integration#claim-rbtc) give examples.

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
    uint256 quotedStablecoinIn;
}

function batchBuyRbtc(Batch calldata batch) external;                   // selector 0xe34eeaa8
function batchBuyRbtcAcrossHandlers(Batch[] calldata batches) external; // selector 0xaaef8304
function activateProtectedPurchaseWindow() external;
```

Only an allowlisted swapper can call these. A paused schedule in a batch reverts that batch. In a multi-handler call, one failed batch reverts every handler in the call.

The ABI type of `Batch` is `(uint64[],address,uint256,uint256,uint256)`. `quotedStablecoinIn` comes after `minRbtcOut`. An encoder that still uses a four-field tuple gets a different selector, and its call fails.

The manager reads the buyer and the gross purchase amount of each row from storage. It then calls the handler with `batchBuyRbtc(address[],uint64[],uint256[],uint256,uint256)` (selector `0x3f412b64`). Only the manager can call that handler function.

The protected window lasts five blocks. During it, the contract refuses amount edits, period edits, pause edits, deletes, principal withdrawals, and interest withdrawals. An rBTC claim stays open. A deposit and a new schedule stay open.

## Purchase minimum

Each `Batch` carries one quoted pair: the input of the quote and the minimum output for that input.

- `quotedStablecoinIn` is the gross stablecoin input that the quote used, in the token's base units. It is normally the sum of the gross purchase amounts of the rows. USDT0 uses 6 decimals. DOC and USDRIF use 18 decimals. This value does not change a schedule debit.
- `minRbtcOut` is the gross minimum output for that input, in wei. Gross means before the BitChill purchase fee. On a Uniswap route the output is WRBTC. On the Money on Chain route the output is native rBTC.
- The handler first pulls the stablecoin of the rows. The actual input can differ from the quoted input, for example after lending rounding or a short lending row.
- The handler then scales the minimum to the actual input and rounds up: `ceil(minRbtcOut × actualInput / quotedStablecoinIn)`.
- The handler measures the gross output it received. If that output is below the scaled minimum, the purchase reverts with `PurchaseRbtc__BelowSwapperMinimum(received, scaledMinimum)`. Every schedule debit of the batch reverts with it.
- A zero `minRbtcOut` disables this caller check. A positive `minRbtcOut` with a zero `quotedStablecoinIn` reverts with `PurchaseRbtc__ZeroQuotedStablecoinInput()` (selector `0x4e339109`).
- The purchase fee is taken after this check, from the measured output. Buyers receive buyer-net rBTC.

Each venue adds its own check:

| Venue | Check in the handler |
| --- | --- |
| Uniswap (USDRIF, USDT0) | The router gets the higher of the scaled minimum and an oracle floor. The handler also requires the measured WRBTC to reach the oracle floor. Otherwise it reverts with `PurchaseUniswap__BelowOracleFloor(received, floor)` (selector `0x0f486c85`). |
| Money on Chain (DOC) | The handler passes no minimum to Money on Chain and has no oracle floor. The scaled caller minimum is the only output check. |

## BitChill swapper behaviour

The BitChill swapper is operated software. It is not a contract. This section describes its relaunch behaviour at a high level. Its operator values are not published here.

- It buys only for the six launch pairs. It does not buy a schedule on route index 2.
- It accepts only the launch swap paths: USDRIF → USDT0 (0.05% pool) → WRBTC (0.30% pool), and USDT0 → WRBTC (0.30% pool). Before a quote, it reads the active swap path of each handler on chain. A different path omits that handler's group.
- Each handler group keeps `quotedStablecoinIn` and `minRbtcOut` together as one pair through the simulation, the send, and a retry. A stale DOC quote is quoted again once, and the new pair replaces the whole old pair. A stale Uniswap quote is not quoted again. That group is omitted.
- USDRIF and USDT0 groups use Uniswap quotes. The groups of one transaction are quoted in transaction order, because a later group trades after the earlier groups on a shared pool.
- A DOC group always has a positive minimum. The swapper computes the expected native rBTC from Money on Chain redemption pricing, after Money on Chain fees and before the BitChill fee. It then subtracts a configured tolerance. If that quote fails, the swapper omits the DOC group. It never sends a DOC group with a zero minimum. Other groups can still go.
- Before a send that contains DOC work, the swapper reads the Money on Chain gas price cap and the free DOC capacity. A DOC group that does not fit waits for a later run.
- It omits a Uniswap group whose quote is too far below the handler's oracle reference, or whose price impact is too high. It defers a row or a batch above a size limit. These limits are required operator settings with no default. The swapper does not start without them. Their values are open operator decisions.
- On a lending route, a row whose user has no share value left is excluded after a decoded simulation revert. The rest of the transaction is simulated again.
- It buys each schedule at most once in one run.
- It simulates the exact transaction before the send. A simulation shows only success or failure. It is not a measured price.
- It does not open the protected purchase window.

A group or a row that the swapper omits stays due. If it waits past its next due day, a later purchase consumes only the newest due slot. There is no catch-up.

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

A route class is set once. A handler assignment is add-only. One handler address backs one pair. The deployment script registers route 1 as a lending route and assigns the six launch handlers. It does not register route 2. A deposit pause blocks new deposits for that pair. It does not block a purchase, an edit, a withdrawal, a delete, or an rBTC claim.

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
