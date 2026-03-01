---
sidebar_position: 2
---

# Core Contracts

## DcaManager

Primary user-entry contract.

### Key write functions

```solidity
function createDcaSchedule(address token, uint256 depositAmount, uint256 purchaseAmount, uint256 purchasePeriod, uint256 lendingProtocolIndex) external;
function updateDcaSchedule(address token, uint256 scheduleIndex, bytes32 scheduleId, uint256 depositAmount, uint256 purchaseAmount, uint256 purchasePeriod) external;
function deleteDcaSchedule(address token, uint256 scheduleIndex, bytes32 scheduleId) external;

function depositToken(address token, uint256 scheduleIndex, bytes32 scheduleId, uint256 depositAmount) external;
function withdrawToken(address token, uint256 scheduleIndex, bytes32 scheduleId, uint256 withdrawalAmount) external;
function withdrawTokenAndInterest(address token, uint256 scheduleIndex, bytes32 scheduleId, uint256 withdrawalAmount, uint256 lendingProtocolIndex) external;

function buyRbtc(address buyer, address token, uint256 scheduleIndex, bytes32 scheduleId) external;
function batchBuyRbtc(address[] calldata buyers, address token, uint256[] calldata scheduleIndexes, bytes32[] calldata scheduleIds, uint256[] calldata purchaseAmounts, uint256 lendingProtocolIndex) external;

function withdrawRbtcFromTokenHandler(address token, uint256 lendingProtocolIndex) external;
function withdrawAllAccumulatedRbtc(address[] calldata tokens, uint256[] calldata lendingProtocolIndexes) external;
function withdrawAllAccumulatedInterest(address[] calldata tokens, uint256[] calldata lendingProtocolIndexes) external;
```

### Key read functions

```solidity
function getDcaSchedules(address user, address token) external view returns (DcaDetails[] memory);
function getScheduleTokenBalance(address user, address token, uint256 scheduleIndex) external view returns (uint256);
function getSchedulePurchaseAmount(address user, address token, uint256 scheduleIndex) external view returns (uint256);
function getSchedulePurchasePeriod(address user, address token, uint256 scheduleIndex) external view returns (uint256);
function getScheduleId(address user, address token, uint256 scheduleIndex) external view returns (bytes32);

function getInterestAccrued(address user, address token, uint256 lendingProtocolIndex) external view returns (uint256);

function getMinPurchasePeriod() external view returns (uint256);
function getMaxSchedulesPerToken() external view returns (uint256);
function getDefaultMinPurchaseAmount() external view returns (uint256);
function getTokenMinPurchaseAmount(address token) external view returns (uint256 minPurchaseAmount, bool customMinAmountSet);
```

### DcaDetails

```solidity
struct DcaDetails {
    uint256 tokenBalance;
    uint256 purchaseAmount;
    uint256 purchasePeriod;
    uint256 lastPurchaseTimestamp;
    bytes32 scheduleId;
    uint256 lendingProtocolIndex;
}
```

## OperationsAdmin

Registry and role-management contract.

### Relevant functions

```solidity
function assignOrUpdateTokenHandler(address token, uint256 lendingProtocolIndex, address handler) external;
function addOrUpdateLendingProtocol(string calldata lowerCaseName, uint256 index) external;
function setSwapperRole(address swapper) external;
function revokeSwapperRole(address swapper) external;
function setAdminRole(address admin) external;
function revokeAdminRole(address admin) external;

function getTokenHandler(address token, uint256 lendingProtocolIndex) external view returns (address);
function getLendingProtocolIndex(string calldata lowerCaseName) external view returns (uint256);
function getLendingProtocolName(uint256 index) external view returns (string memory);
```

## Handler Families

### DOC + MoC handlers

- `TropykusDocHandlerMoc`
- `SovrynDocHandlerMoc`

### DEX handlers

- `TropykusErc20HandlerDex`
- `SovrynErc20HandlerDex` (contract exists; deployment support depends on token/protocol configuration)

## Purchase Backends

### PurchaseMoc

- redeems DOC through MoC proxy flow (`redeemDocRequest` + `redeemFreeDoc`)
- charges fee before crediting user accumulated rBTC

### PurchaseUniswap

- swaps stablecoin via configured Uniswap V3 path
- uses MoC oracle `getPriceInfo()` validity flag for minimum output calculation
- unwraps WRBTC to rBTC on withdrawal

## FeeHandler

Handler-level fee settings:

- `minFeeRate`
- `maxFeeRate`
- `feePurchaseLowerBound`
- `feePurchaseUpperBound`
- `feeCollector`

`_calculateFee` uses divisor `10_000`.

## Validation Rules (Manager)

- `depositAmount > 0`
- `withdrawalAmount > 0 && withdrawalAmount <= scheduleBalance`
- `purchaseAmount >= configuredMinimum`
- `purchaseAmount <= scheduleBalance / 2`
- `purchasePeriod >= configuredMinimumPeriod`
- schedule index + schedule ID must match
- batch arrays must have equal non-zero length

## Source

- [dca-contracts repository](https://github.com/BitChillRSK/dca-contracts)
