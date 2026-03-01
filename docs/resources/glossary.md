---
sidebar_position: 2
---

# Glossary

Key terms and concepts used in BitChill documentation.

## A

### APY (Annual Percentage Yield)
The real rate of return earned on an investment, taking into account compound interest. Lending protocols display APY to show expected yearly returns.

## B

### Bitcoin (BTC)
The original cryptocurrency. BitChill helps users accumulate Bitcoin through DCA on Rootstock.

## C

### Compound Fork
A DeFi protocol that copies the architecture of Compound Finance. Tropykus is a Compound fork on Rootstock.

## D

### DCA (Dollar Cost Averaging)
An investment strategy where a fixed amount is invested at regular intervals, regardless of asset price. This reduces impact of volatility and eliminates the need to time the market.

### DcaManager
BitChill's main smart contract that manages all DCA schedules and user interactions.

### DOC (Dollar on Chain)
A USD-pegged stablecoin from the Money on Chain protocol, backed by Bitcoin collateral. One of the stablecoins supported by BitChill.

## E

### EVM (Ethereum Virtual Machine)
The runtime environment for smart contracts. Rootstock is EVM-compatible, allowing Ethereum-style smart contracts to run on a Bitcoin sidechain.

## F

### FeeHandler
BitChill contract component that calculates and collects fees using a sliding scale based on purchase amount.

## G

### Gas
The fee required to execute transactions on a blockchain. On Rootstock, gas is paid in rBTC.

## I

### iSUSD
The yield-bearing token received when depositing into Sovryn's lending pool. Represents your share of the lending pool.

## K

### kToken
Yield-bearing tokens from Tropykus (Compound fork). Examples: kDOC, kUSDRIF. These tokens appreciate in value as interest accrues.

## L

### Lending Protocol
A DeFi protocol that allows users to lend and borrow assets. BitChill integrates with Tropykus and Sovryn for yield generation.

## M

### Merge-Mining
A process where miners can mine two cryptocurrencies simultaneously. Rootstock uses merge-mining with Bitcoin, inheriting its security.

### MoC (Money on Chain)
A DeFi platform on Rootstock providing DOC stablecoin and other Bitcoin-collateralized assets. BitChill can swap DOC through MoC directly.

## N

### Non-Custodial
A system where users maintain control of their own assets. BitChill is non-custodial—no one else can access your funds.

## O

### Oracle
A service providing external data (like prices) to smart contracts. BitChill uses oracles for slippage protection on Uniswap swaps.

### OperationsAdmin
BitChill's administrative contract that manages protocol configuration, roles, and token handler registry.

## P

### Pull Pattern
A withdrawal pattern where users must actively claim their funds, rather than having funds pushed to them automatically. BitChill uses pull for rBTC withdrawals.

### Purchase Amount
The fixed amount of stablecoins swapped for rBTC during each DCA period.

### Purchase Period
The time interval between automatic DCA purchases. BitChill supports 1, 2, and 4-week periods.

## R

### rBTC (Rootstock Bitcoin)
The native cryptocurrency of Rootstock, pegged 1:1 to Bitcoin. When you DCA with BitChill, you accumulate rBTC.

### Rootstock (RSK)
A Bitcoin sidechain with smart contract capabilities. Secured by Bitcoin's hashpower through merge-mining.

## S

### Schedule
A user's DCA configuration including deposit amount, purchase amount, period, and lending protocol choice.

### Schedule ID
A unique identifier (bytes32) for each DCA schedule, preventing index manipulation attacks.

### Slippage
The difference between expected and actual price when executing a trade. BitChill protects against excessive slippage.

### Sovryn
A DeFi platform on Rootstock offering lending, trading, and more. One of BitChill's integrated lending protocols.

### Stablecoin
A cryptocurrency designed to maintain a stable value, typically pegged to USD. BitChill accepts DOC and USDRIF.

### Swapper
The automated wallet with SWAPPER_ROLE that executes batch purchases when periods elapse.

## T

### TokenHandler
Smart contracts that manage specific stablecoin + lending protocol combinations. They handle deposits, lending integration, swaps, and rBTC storage.

### Tropykus
A Compound-fork lending protocol on Rootstock. One of BitChill's integrated lending protocols.

### TVL (Total Value Locked)
The total value of assets deposited in a DeFi protocol. BitChill's TVL represents all stablecoins deposited across all schedules.

## U

### Underlying
The base asset represented by a yield-bearing token. For kDOC, the underlying is DOC.

### Uniswap V3
A decentralized exchange protocol. BitChill uses Uniswap V3 on Rootstock for stablecoin-to-rBTC swaps.

### USDRIF
A USD-pegged stablecoin from the RIF ecosystem. One of the stablecoins supported by BitChill.

## W

### Wallet
Software for managing cryptocurrency. BitChill supports WalletConnect-compatible wallets like MetaMask and Defiant.

### WalletConnect
An open protocol for connecting wallets to dApps. BitChill uses WalletConnect for wallet integration.

### WRBTC (Wrapped rBTC)
An ERC20 token representation of rBTC, used in some DeFi operations. BitChill unwraps WRBTC to native rBTC for users.

## Y

### Yield
Returns earned on deposited assets. In BitChill, yield comes from lending protocols while stablecoins await DCA swaps.
