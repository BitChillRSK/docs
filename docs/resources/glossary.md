---
sidebar_position: 2
---

# Glossary

Quick reference for terms used throughout BitChill documentation.

## Protocol Concepts

### DCA (Dollar Cost Averaging)
An investment strategy where you buy a fixed amount of an asset at regular intervals, regardless of price. This reduces the impact of volatility over time.

### Schedule
A DCA configuration created by a user, specifying the token, purchase amount, period, and lending protocol. Each schedule has a unique ID and tracks its own stablecoin balance.

### Purchase Period
The time interval between automatic purchases. BitChill currently offers 1, 2, or 4 week options. The contract stores this in seconds and enforces a minimum.

### Purchase Amount
The amount of stablecoin converted to rBTC on each scheduled purchase. Must be at least the configured minimum and no more than half the schedule balance.

### Accumulated rBTC
The rBTC a user has accumulated through DCA purchases. Tracked per user per handler (not per schedule), and withdrawable at any time.

## Smart Contracts

### DcaManager
The main BitChill contract. Handles schedule creation, updates, deletions, and coordinates with handlers for deposits, purchases, and withdrawals.

### OperationsAdmin
Registry and role management contract. Maps tokens and lending protocol indexes to their handlers, and manages protocol roles (owner, swapper).

### Handler
A contract that manages funds for a specific token + lending protocol combination. Handles deposits, lending integration, fee calculation, and purchase execution.

### FeeHandler
Base contract inherited by handlers. Implements the fee calculation logic (flat or sliding scale) and fee transfers.

### Token Handler
A specific handler instance, such as "SovrynDocHandler". Each handler has its own accumulated rBTC tracking.

## Tokens & Protocols

### rBTC
Rootstock's native token, pegged 1:1 to Bitcoin. This is what you accumulate through BitChill DCA.

### WRBTC
Wrapped rBTC, an ERC-20 token. Used internally for DEX swaps before being unwrapped for user withdrawals. No longer used as of Tropykus' sunset.

### DOC (Dollar on Chain)
An algorithmic stablecoin from Money on Chain, overcollateralized by Bitcoin. One of the supported deposit tokens.

### USDRIF
A stablecoin from the RIF ecosystem on Rootstock. One of the supported deposit tokens.

### kToken
Tropykus lending tokens (kDOC, kUSDRIF). Represent your deposit in Tropykus and accrue value over time as interest.

### iSUSD
Sovryn's lending token used for DOC deposits. Represents your deposit in Sovryn's lending pool.

## External Protocols

### Rootstock (RSK)
An EVM-compatible Bitcoin sidechain. BitChill is deployed here, benefiting from Bitcoin's security via merge-mining.

### Sovryn
A DeFi platform on Rootstock with lending, trading, and margin features. BitChill integrates with its lending pools.

### Money on Chain (MoC)
The protocol behind DOC. BitChill's DOC handlers redeem DOC for rBTC through MoC.

### Tropykus (legacy)
A Compound-style lending protocol on Rootstock. BitChill integrated with it for DOC and USDRIF yield generation until it sunset in mid 2026.

### Uniswap V3
A DEX protocol. BitChill's USDRIF handlers used Uniswap V3 pools on Rootstock for swapping until Tropykus' sunset in mid 2026.

## Technical Terms

### Schedule ID
A unique `bytes32` identifier for each schedule. Used alongside the schedule index for validation.

### Lending Protocol Index
A numeric identifier mapping to lending protocols used by handlers: 0 = none, 1 = Tropykus, 2 = Sovryn.

### SWAPPER_ROLE
The access control role that permits calling purchase functions. Assigned to the BitChill automated swapper infrastructure.

### APY (Annual Percentage Yield)
The annualized return rate from lending protocols. Shown as a percentage.

### Interest (Accrued)
The difference between your current lending-backed value and your original principal. Withdrawable separately from your schedule balance.

### Pull Pattern
A design pattern where users must actively withdraw their funds rather than having them automatically sent. BitChill uses this for rBTC withdrawals.
