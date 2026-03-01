---
sidebar_position: 2
---

# Core Contracts

Detailed documentation of BitChill's main smart contracts.

## DcaManager

The central contract managing all DCA schedules and user interactions.

### Key Functions

#### Schedule Management

```solidity
function createDcaSchedule(
    address token,
    uint256 depositAmount,
    uint256 purchaseAmount,
    uint256 purchasePeriod,
    uint256 lendingProtocolIndex
) external
```

Creates a new DCA schedule with the specified parameters.

**Parameters**:
- `token`: Stablecoin address (DOC or USDRIF)
- `depositAmount`: Initial deposit amount
- `purchaseAmount`: Amount to swap each period
- `purchasePeriod`: Time between purchases (seconds)
- `lendingProtocolIndex`: Lending protocol (1=Tropykus, 2=Sovryn)

---

```solidity
function updateDcaSchedule(
    address token,
    uint256 scheduleIndex,
    bytes32 scheduleId,
    uint256 depositAmount,
    uint256 purchaseAmount,
    uint256 purchasePeriod
) external
```

Updates an existing schedule's parameters.

---

```solidity
function deleteDcaSchedule(
    address token,
    uint256 scheduleIndex,
    bytes32 scheduleId
) external
```

Deletes a schedule and refunds remaining stablecoins.

#### Deposits & Withdrawals

```solidity
function depositToken(
    address token,
    uint256 scheduleIndex,
    bytes32 scheduleId,
    uint256 depositAmount
) external
```

Adds funds to an existing schedule.

---

```solidity
function withdrawToken(
    address token,
    uint256 scheduleIndex,
    bytes32 scheduleId,
    uint256 withdrawalAmount
) external
```

Withdraws stablecoins from a schedule.

---

```solidity
function withdrawRbtcFromTokenHandler(
    address token,
    uint256 lendingProtocolIndex
) external
```

Withdraws accumulated rBTC from a specific handler.

---

```solidity
function withdrawAllAccumulatedRbtc(
    address[] calldata tokens,
    uint256[] calldata lendingProtocolIndexes
) external
```

Withdraws rBTC from multiple handlers in one transaction.

#### View Functions

```solidity
function getMyDcaSchedules(address token) external view returns (DcaDetails[] memory)
function getDcaSchedules(address user, address token) external view returns (DcaDetails[] memory)
function getScheduleTokenBalance(address user, address token, uint256 index) external view returns (uint256)
function getAccumulatedRbtcBalance(address user, address token, uint256 lendingProtocolIndex) external view returns (uint256)
```

### DcaDetails Structure

```solidity
struct DcaDetails {
    uint256 tokenBalance;          // Remaining stablecoins
    uint256 purchaseAmount;        // Amount per purchase
    uint256 purchasePeriod;        // Seconds between purchases
    uint256 lastPurchaseTimestamp; // Unix timestamp of last purchase
    bytes32 scheduleId;            // Unique identifier
    uint256 lendingProtocolIndex;  // Lending protocol ID
}
```

### Events

```solidity
event DcaScheduleCreated(
    address indexed user,
    address indexed token,
    bytes32 indexed scheduleId,
    uint256 depositAmount,
    uint256 purchaseAmount,
    uint256 purchasePeriod,
    uint256 lendingProtocolIndex
);

event DcaScheduleUpdated(
    address indexed user,
    address indexed token,
    bytes32 indexed scheduleId,
    uint256 updatedTokenBalance,
    uint256 updatedPurchaseAmount,
    uint256 updatedPurchasePeriod
);

event DcaScheduleDeleted(
    address user,
    address token,
    bytes32 scheduleId,
    uint256 refundedAmount
);
```

---

## OperationsAdmin

Manages protocol configuration and access control.

### Role Management

```solidity
function grantSwapperRole(address swapper) external onlyAdmin
function revokeSwapperRole(address swapper) external onlyAdmin
function grantAdminRole(address admin) external onlyOwner
function revokeAdminRole(address admin) external onlyOwner
```

### Handler Registry

```solidity
function assignOrUpdateTokenHandler(
    address token,
    uint256 lendingProtocolIndex,
    address handler
) external onlyAdmin
```

Maps a token + lending protocol combination to its handler contract.

### Protocol Registry

```solidity
function addOrUpdateLendingProtocol(
    string calldata lowerCaseName,
    uint256 index
) external onlyAdmin
```

Registers lending protocols:
- Index 0: No lending (direct hold)
- Index 1: Tropykus
- Index 2: Sovryn

---

## TokenHandler (Abstract)

Base contract for all token handlers.

### Core Functions

```solidity
function depositToken(address user, uint256 amount) external onlyDcaManager
function withdrawToken(address user, uint256 amount) external onlyDcaManager
```

### Implemented By

- `TropykusErc20Handler`
- `SovrynErc20Handler`

---

## TokenLending (Abstract)

Extends TokenHandler with lending protocol integration.

### Key Functions

```solidity
function mintLendingToken(uint256 amount) internal
function redeemUnderlying(uint256 amount) internal returns (uint256)
function getExchangeRate() public view returns (uint256)
function getUsersLendingTokenBalance(address user) external view returns (uint256)
function getInterestAccrued(address user, uint256 depositedBalance) external view returns (uint256)
```

---

## FeeHandler (Abstract)

Implements the sliding fee scale.

### Fee Calculation

```solidity
function calculateFee(uint256 purchaseAmount) public view returns (uint256)
```

Returns the fee amount for a given purchase.

### Fee Parameters

```solidity
uint256 public s_minFeeRate;           // Basis points (e.g., 30 = 0.3%)
uint256 public s_maxFeeRate;           // Basis points (e.g., 100 = 1.0%)
uint256 public s_feePurchaseLowerBound; // Amount below which max fee applies
uint256 public s_feePurchaseUpperBound; // Amount above which min fee applies
address public s_feeCollector;          // Recipient of fees
```

### Fee Formula

For amounts between lower and upper bounds:
```
feeRate = maxFee - ((amount - lowerBound) * (maxFee - minFee)) / (upperBound - lowerBound)
fee = amount * feeRate / 10000
```

---

## PurchaseMoc

Handles swaps via Money on Chain protocol.

### Key Function

```solidity
function _swapStablecoinForRbtc(uint256 stablecoinAmount) internal returns (uint256 rbtcReceived)
```

Redeems DOC directly through MoC for rBTC at primary market price.

**Advantages**:
- No slippage
- Gas efficient
- Direct BTC-collateral redemption

---

## PurchaseUniswap

Handles swaps via Uniswap V3.

### Key Function

```solidity
function _swapStablecoinForRbtc(uint256 stablecoinAmount) internal returns (uint256 rbtcReceived)
```

Swaps stablecoins for WRBTC through Uniswap V3, then unwraps.

**Features**:
- Oracle price validation for slippage protection
- Works with any supported stablecoin
- Market-based pricing

---

## Validation Rules

### Schedule Creation

| Rule | Validation |
|------|------------|
| Deposit | Must be greater than 0 |
| Purchase Amount | Must be at least minimum |
| Purchase Amount | Must be at most 50% of deposit |
| Purchase Period | Must be at least minimum period |
| Schedule Count | Cannot exceed per-token limit |

### Purchase Execution

| Rule | Validation |
|------|------------|
| Period Elapsed | `block.timestamp >= lastPurchase + period` |
| Sufficient Balance | `tokenBalance >= purchaseAmount` |
| Valid Oracle Price | Price within acceptable staleness |

## Source Code

All contracts are open source and available on GitHub:

[BitChillRSK/dca-contracts](https://github.com/BitChillRSK/dca-contracts)

## Next Steps

- [View deployed addresses](/docs/contracts/addresses)
- [Integration guide](/docs/contracts/integration)
