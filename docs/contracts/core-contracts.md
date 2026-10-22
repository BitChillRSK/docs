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
| Money on Chain (DOC, initial launch) | The handler passes no minimum to Money on Chain and has no oracle floor. The scaled caller minimum is the only output check. |
| Uniswap V3 (USDRIF, USDT0, DEX handlers not enabled at the initial launch) | The router gets the higher of the scaled minimum and an oracle floor. The handler also requires the measured WRBTC to reach the oracle floor. Otherwise it reverts with `PurchaseUniswap__BelowOracleFloor(received, floor)` (selector `0x0f486c85`). |

## Money on Chain handler

A DOC handler calls `redeemFreeDoc(amount)` on the Money on Chain proxy from its own account. It measures the native rBTC that its balance gained. It passes no minimum to Money on Chain. Money on Chain can redeem less than the amount when its free DOC is short. The handler then reverts the batch with `PurchaseRbtc__InputAmountNotFullySpent`, because the venue did not take the whole input. The BitChill swapper reads the free DOC capacity and the Money on Chain gas price cap before it sends DOC work. See [Offchain services](/docs/contracts/offchain-services#swapper).

## DEX handler settings

The DEX handlers are implemented and tested. The initial launch does not enable them. This section is the protocol reference for a later reviewed configuration.

```solidity
// Owner only
function setPurchasePathAllowed(address[] memory intermediateTokens, uint24[] memory poolFeeRates, bool allowed) external;
function setAmountOutMinimumPercent(uint256 amountOutMinimumPercent) external;
function setAmountOutMinimumSafetyCheck(uint256 amountOutMinimumSafetyCheck) external;
function setMocOracle(address newOracle) external;

// Owner or an allowlisted swapper
function setPurchasePath(address[] memory intermediateTokens, uint24[] memory poolFeeRates) external;

// Anyone
function restoreSwapRouterApproval() external;

function getSwapPath() external view returns (bytes memory);
function isPurchasePathAllowed(bytes32 pathHash) external view returns (bool);
function getAmountOutMinimumPercent() external view returns (uint256);
function getAmountOutMinimumSafetyCheck() external view returns (uint256);
function getMocOracle() external view returns (ICoinPairPrice);
```

### Swap path

- The path is Uniswap V3 `exactInput` bytes: the handler's stablecoin, then a pool fee and an intermediate token for each hop, then the last pool fee and WRBTC. An empty intermediate list is a direct pair. `poolFeeRates` must have one more entry than `intermediateTokens`.
- The constructor installs the first path and allowlists it.
- The owner allowlists or revokes an exact encoded path. The allowlist key is the hash of the encoded bytes. The owner cannot revoke the active path.
- `setPurchasePath` activates a path that is already allowlisted. The owner or an allowlisted swapper can call it. Any other path reverts with `PurchaseUniswap__PurchasePathNotAllowed`.
- A path change emits `PurchaseUniswap__NewPathSet(intermediateTokens, poolFeeRates, newPath)`. An allowlist change emits `PurchaseUniswap__PurchasePathAllowedSet`.
- After a swap, the router's balance of each intermediate token must equal its balance before the swap. Otherwise the purchase reverts with `PurchaseUniswap__IntermediateBalanceChangedInRouter`.

### Oracle floor

The floor is the lowest WRBTC output that the handler accepts:

```text
floor = stablecoinAmount × 10^(18 − stablecoinDecimals) × amountOutMinimumPercent / btcUsdPrice
```

- `btcUsdPrice` comes from the Money on Chain BTC/USD oracle, with 18 decimals. The handler assumes that the stablecoin is worth one US dollar.
- The oracle must report a valid price. Otherwise the purchase reverts with `PurchaseUniswap__OutdatedPrice`.
- `amountOutMinimumPercent` is scaled to 1e18, so 1e18 is 100%. The router gets the higher of the floor and the scaled caller minimum. The measured WRBTC must also reach the floor.
- The floor is a loose emergency bound. The swapper's per-batch minimum is the operational bound.
- Bounds: the floor and the safety check are at most 100%, and the floor cannot be below the safety check. To lower the floor below the safety check, the owner first lowers the safety check in a separate transaction.
- The contract repository's deployment configuration starts with a floor of 97% and a safety check of 95%. The owner can change both within the bounds.
- A stablecoin with more than 18 decimals is rejected at construction.

## BitChill swapper behaviour

The BitChill swapper is operated software, not a contract. It decides which due schedules to send, quotes the pair of `quotedStablecoinIn` and `minRbtcOut`, and checks the result before a send. Its behaviour is on the [offchain services page](/docs/contracts/offchain-services#swapper). Its operator values are not published.

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
function getRouteClass(uint256 index) external view returns (RouteClass);
function areDepositsPaused(address token, uint256 routeIndex) external view returns (bool paused);
function isSwapper(address account) external view returns (bool);
```

A route class is set once. A handler assignment is add-only. One handler address backs one pair. The [architecture page](/docs/contracts/architecture#operationsadmin) lists the checks of `assignHandler`. The initial launch registers route 1 as a lending route and assigns two handlers: DOC idle and DOC LayerBank. It does not register route 2. A later reviewed configuration can assign the USDRIF and USDT0 DEX handlers on the same registry. A deposit pause blocks new deposits for that pair. It does not block a purchase, an edit, a withdrawal, a delete, or an rBTC claim.

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
