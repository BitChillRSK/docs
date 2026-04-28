---
sidebar_position: 2
---

# Security Model

BitChill uses role-based controls, strict schedule validation, and audited contract code to protect protocol operations.

## Core Principles

### Non-custodial User Operations

Users directly control their own schedule actions from wallet-signed transactions:

- create/update/delete schedules
- deposit/withdraw stablecoins
- withdraw accumulated rBTC
- withdraw accrued interest

### Pull-based rBTC Withdrawals

Handlers accumulate rBTC balances per user, and users withdraw when desired. This avoids forcing automatic transfers during purchase execution.

### Explicit On-chain Permissions

Protocol behavior is gated by clearly defined roles and ownership functions.

## Access Control Model

### DcaManager

- `onlySwapper` on purchase execution (`buyRbtc`, `batchBuyRbtc`)
- owner functions for manager-level configuration (operations admin pointer and purchase constraints)

### OperationsAdmin

- `ADMIN_ROLE`: handler mapping, lending protocol registry, swapper role management
- owner: admin role assignment/revocation

### Handlers

- `onlyDcaManager` on user-balance-affecting token operations
- owner-managed handler configuration (fees, swap path/oracle settings where applicable)

## Key Contract Defenses

### Schedule Index + ID verification

State-changing schedule calls validate both index and `scheduleId`, reducing index mismatch risk when arrays reorder after deletions.

### Reentrancy protection on critical manager flows

DcaManager applies `nonReentrant` on sensitive external workflows (deposits, withdrawals, purchase execution, aggregate withdrawals).

### Input constraints

- `depositAmount > 0`
- `withdrawalAmount > 0 && withdrawalAmount <= scheduleBalance`
- `purchaseAmount >= configuredMinimum`
- `purchaseAmount <= scheduleBalance / 2`
- `purchasePeriod >= configuredMinimumPeriod`

### Safe ERC20 operations

Handlers use OpenZeppelin `SafeERC20` for transfers and approvals.

## External Dependencies

BitChill depends on external protocols for lending/swapping routes used by active handlers:

- Sovryn
- Money on Chain
- Tropykus (legacy)
- Uniswap V3 (legacy)

Operational outcomes also depend on Rootstock network conditions and dependency health.

## Oracle/Slippage Handling (DEX Handlers)

`PurchaseUniswap` computes `amountOutMinimum` using MoC oracle `getPriceInfo()` validity checks plus configurable minimum output percentages.

## Contract Upgradability

Core contracts in this repository are not proxy-upgradeable. New behavior is introduced by deploying and registering new contract instances.

## Security References

- [Audit reports](/docs/security/audits)
- [Source code](https://github.com/BitChillRSK/dca-contracts)
