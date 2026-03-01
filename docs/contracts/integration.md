---
sidebar_position: 4
---

# Integration Guide

Guide for developers building on top of BitChill or integrating with the protocol.

## Overview

BitChill's contracts are designed to be interacted with through the `DcaManager` contract. All user-facing operations go through this single entry point.

## Reading Data

### Get User Schedules

```javascript
import { ethers } from 'ethers';

const DCA_MANAGER = '0x4d9cbe0f242EE85F7Fa25C77329749381bA998be';
const DOC_TOKEN = '0xe700691dA7b9851F2F35f8b8182c69c53CcaD9Db';

const abi = [
  'function getDcaSchedules(address user, address token) view returns (tuple(uint256 tokenBalance, uint256 purchaseAmount, uint256 purchasePeriod, uint256 lastPurchaseTimestamp, bytes32 scheduleId, uint256 lendingProtocolIndex)[])'
];

const contract = new ethers.Contract(DCA_MANAGER, abi, provider);
const schedules = await contract.getDcaSchedules(userAddress, DOC_TOKEN);
```

### Get Accumulated rBTC

```javascript
const abi = [
  'function getAccumulatedRbtcBalance(address user, address token, uint256 lendingProtocolIndex) view returns (uint256)'
];

const contract = new ethers.Contract(DCA_MANAGER, abi, provider);
const balance = await contract.getAccumulatedRbtcBalance(
  userAddress,
  DOC_TOKEN,
  1 // Tropykus
);
```

### Get Interest Accrued

```javascript
const abi = [
  'function getInterestAccrued(address user, address token, uint256 scheduleIndex, uint256 lendingProtocolIndex) view returns (uint256)'
];

const contract = new ethers.Contract(DCA_MANAGER, abi, provider);
const interest = await contract.getInterestAccrued(
  userAddress,
  DOC_TOKEN,
  0, // First schedule
  1  // Tropykus
);
```

## Writing Data

### Create a Schedule

```javascript
const abi = [
  'function createDcaSchedule(address token, uint256 depositAmount, uint256 purchaseAmount, uint256 purchasePeriod, uint256 lendingProtocolIndex)'
];

const contract = new ethers.Contract(DCA_MANAGER, abi, signer);

// First approve token spending
const docContract = new ethers.Contract(DOC_TOKEN, ['function approve(address,uint256)'], signer);
await docContract.approve(DCA_MANAGER, depositAmount);

// Create schedule
const tx = await contract.createDcaSchedule(
  DOC_TOKEN,                    // token
  ethers.parseEther('1000'),    // depositAmount (1000 DOC)
  ethers.parseEther('100'),     // purchaseAmount (100 DOC per period)
  604800,                       // purchasePeriod (1 week in seconds)
  1                             // lendingProtocolIndex (Tropykus)
);
await tx.wait();
```

### Deposit to Schedule

```javascript
const abi = [
  'function depositToken(address token, uint256 scheduleIndex, bytes32 scheduleId, uint256 depositAmount)'
];

const contract = new ethers.Contract(DCA_MANAGER, abi, signer);

// Approve and deposit
await docContract.approve(DCA_MANAGER, amount);
const tx = await contract.depositToken(
  DOC_TOKEN,
  0,              // scheduleIndex
  scheduleId,     // bytes32 from schedule
  amount
);
```

### Withdraw rBTC

```javascript
const abi = [
  'function withdrawRbtcFromTokenHandler(address token, uint256 lendingProtocolIndex)'
];

const contract = new ethers.Contract(DCA_MANAGER, abi, signer);
const tx = await contract.withdrawRbtcFromTokenHandler(DOC_TOKEN, 1);
await tx.wait();
```

## Event Listening

### Monitor New Schedules

```javascript
const abi = [
  'event DcaManager__DcaScheduleCreated(address indexed user, address indexed token, bytes32 indexed scheduleId, uint256 depositAmount, uint256 purchaseAmount, uint256 purchasePeriod, uint256 lendingProtocolIndex)'
];

const contract = new ethers.Contract(DCA_MANAGER, abi, provider);

contract.on('DcaManager__DcaScheduleCreated', (user, token, scheduleId, deposit, purchase, period, protocol) => {
  console.log(`New schedule created by ${user}`);
});
```

### Monitor Purchases

```javascript
const abi = [
  'event PurchaseRbtc__RbtcBought(address indexed user, address indexed tokenSpent, uint256 rBtcBought, bytes32 indexed scheduleId, uint256 amountSpent)'
];

// Listen on TokenHandler contracts
const handler = new ethers.Contract(TROPYKUS_DOC_HANDLER, abi, provider);

handler.on('PurchaseRbtc__RbtcBought', (user, token, rbtc, scheduleId, spent) => {
  console.log(`Purchase: ${ethers.formatEther(spent)} DOC → ${ethers.formatEther(rbtc)} rBTC`);
});
```

## Using with wagmi/viem

### React Hook Example

```typescript
import { useReadContract, useWriteContract } from 'wagmi';

const DCA_MANAGER_ABI = [...]; // ABI array

function useSchedules(userAddress: string, token: string) {
  return useReadContract({
    address: '0x4d9cbe0f242EE85F7Fa25C77329749381bA998be',
    abi: DCA_MANAGER_ABI,
    functionName: 'getDcaSchedules',
    args: [userAddress, token],
  });
}

function useCreateSchedule() {
  const { writeContract } = useWriteContract();
  
  return (params: CreateScheduleParams) => {
    writeContract({
      address: '0x4d9cbe0f242EE85F7Fa25C77329749381bA998be',
      abi: DCA_MANAGER_ABI,
      functionName: 'createDcaSchedule',
      args: [
        params.token,
        params.depositAmount,
        params.purchaseAmount,
        params.purchasePeriod,
        params.lendingProtocolIndex,
      ],
    });
  };
}
```

## GraphQL / Indexing

BitChill events can be indexed using:
- [The Graph](https://thegraph.com/) (when available on Rootstock)
- Custom indexer listening to contract events
- Direct RPC event queries

### Event Query Example

```javascript
const filter = contract.filters.DcaManager__DcaScheduleCreated(userAddress);
const events = await contract.queryFilter(filter, fromBlock, toBlock);
```

## Error Handling

BitChill contracts use custom errors. Common ones:

```solidity
error DcaManager__ScheduleDoesNotExist();
error DcaManager__InvalidScheduleId();
error DcaManager__PurchaseAmountTooLow();
error DcaManager__PurchaseAmountExceedsLimit();
error DcaManager__InsufficientBalance();
error DcaManager__MaxSchedulesReached();
```

Handle in JavaScript:

```javascript
try {
  await contract.createDcaSchedule(...);
} catch (error) {
  if (error.data) {
    const decoded = contract.interface.parseError(error.data);
    console.error(`Contract error: ${decoded.name}`);
  }
}
```

## Gas Estimates

| Operation | Approximate Gas |
|-----------|-----------------|
| Create Schedule | ~300,000 |
| Deposit | ~150,000 |
| Withdraw Tokens | ~200,000 |
| Withdraw rBTC | ~100,000 |
| Delete Schedule | ~250,000 |

## Security Considerations

When integrating:

1. **Always validate scheduleId**: Use the ID returned from events/reads, don't assume indexes
2. **Check balances**: Verify sufficient balance before operations
3. **Handle reverts**: Contract will revert on invalid operations
4. **Approve exact amounts**: Only approve what's needed for each operation

## Support

For integration support:
- GitHub Issues: [BitChillRSK/dca-contracts](https://github.com/BitChillRSK/dca-contracts/issues)
- Twitter: [@BitChillRSK](https://twitter.com/BitChillRSK)
