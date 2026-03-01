---
sidebar_position: 2
---

# Supported Tokens & Chains

## Rootstock Network

BitChill operates on **Rootstock (RSK)**, an EVM-compatible Bitcoin sidechain. This means:

- **Bitcoin Security**: Rootstock is merge-mined with Bitcoin, inheriting its security
- **EVM Compatible**: Use familiar tools like MetaMask, Rabby, ethers.js
- **rBTC**: The native token, pegged 1:1 to Bitcoin via a two-way peg

### Network Details

| Parameter | Value |
|-----------|-------|
| Network Name | Rootstock Mainnet |
| Chain ID | 30 |
| Native Token | rBTC |
| RPC URL | `https://public-node.rsk.co` |
| Block Explorer | [rootstock.blockscout.com](https://rootstock.blockscout.com) |

## Supported Stablecoins

BitChill currently supports two stablecoins for DCA:

### DOC (Dollar on Chain)

DOC is an algorithmic stablecoin from the Money on Chain protocol, overcollateralized by Bitcoin.

| Property | Value |
|----------|-------|
| Contract | `0xe700691dA7b9851F2F35f8b8182c69c53CcaD9Db` |
| Decimals | 18 |
| Peg | 1 USD |
| Collateral | Bitcoin (via MoC system) |

### USDRIF

USDRIF is a stablecoin from the RIF ecosystem.

| Property | Value |
|----------|-------|
| Contract | `0x3A15461d8aE0F0Fb5Fa2629e9DA7D66A794a6e37` |
| Decimals | 18 |
| Peg | 1 USD |

## Active Handler Matrix

Each combination of stablecoin and lending protocol has a dedicated handler:

| Stablecoin | Lending Protocol | Swap Method | Status |
|------------|------------------|-------------|--------|
| DOC | Tropykus | Money on Chain | Active |
| DOC | Sovryn | Money on Chain | Active |
| USDRIF | Tropykus | Uniswap V3 | Active |

**Note**: The architecture supports additional handler combinations. Currently, USDRIF + Sovryn is not deployed.

## Lending Protocol Integration

Your stablecoins earn yield while waiting to be swapped. BitChill integrates with:

### Tropykus

A Compound-style lending protocol on Rootstock.

| Token | Lending Token | Address |
|-------|--------------|---------|
| DOC | kDOC | `0x544Eb90e766B405134b3B3F62b6b4C23Fcd5fDa2` |
| USDRIF | kUSDRIF | `0xDdf3CE45fcf080DF61ee61dac5Ddefef7ED4F46C` |

### Sovryn

A DeFi platform on Rootstock with lending capabilities.

| Token | Lending Token | Address |
|-------|--------------|---------|
| DOC | iSUSD | `0xd8D25f03EBbA94E15Df2eD4d6D38276B595593c1` |

## Swap Methods

BitChill uses different swap backends depending on the stablecoin:

### Money on Chain (DOC)

DOC handlers redeem DOC for rBTC through the Money on Chain protocol. This is a native redemption, not a DEX swap.

### Uniswap V3 (USDRIF)

USDRIF handlers swap via Uniswap V3 pools on Rootstock. The swap path and fee tiers are configured per handler, with oracle-based slippage protection.

## How to Get Tokens

### Getting rBTC

- **Powpeg**: Bridge BTC from Bitcoin mainnet via [Powpeg](https://app.rsk.co/powpeg)
- **Exchanges**: Purchase on exchanges like Gate.io, MEXC, or Bitfinex

### Getting DOC

- **Money on Chain**: Mint DOC at [app.moneyonchain.com](https://app.moneyonchain.com)
- **Sovryn**: Swap rBTC for DOC at [sovryn.app](https://sovryn.app)

### Getting USDRIF

- **RIF on Chain**: Acquire through RIF ecosystem
- **DEX**: Swap on Rootstock DEXes

## Next Steps

- [Create a DCA schedule](/docs/user-guide/create-schedule)
- [View deployed contract addresses](/docs/contracts/addresses)
