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

You'll need a small amount of rBTC in your Rootstock wallet to pay gas before using BitChill.

- **Native PowPeg (BTC → rBTC)**  
  Bridge BTC from Bitcoin mainnet via Rootstock's trust-minimized PowPeg:  
  [powpeg.rootstock.io](https://powpeg.rootstock.io/)

- **Cross-chain swaps (crypto → rBTC)**  
  Use cross-chain aggregators and bridges (e.g. [Jumper](https://jumper.exchange/), [Rubic](https://rubic.exchange/), [Boltz](https://boltz.exchange/)) to swap from other networks (Ethereum, BSC, etc.) into rBTC on Rootstock.  
  Connect your wallet, choose your source chain/token, and set rBTC on Rootstock as the destination.

- **Fiat or card on-ramps (fiat → rBTC)**  
  Services like [Mt Pelerin](https://www.mtpelerin.com/) or [Onramp](https://onramp.money/) let you buy rBTC directly with bank transfer or card and withdraw to a Rootstock address.

- **Peer-to-peer**  
  You can also buy rBTC from another Rootstock user (OTC), sending them BTC, fiat, or another asset in exchange for rBTC to your wallet.

:::tip Verify the network
Always verify that the service you use explicitly supports **Rootstock rBTC** (smart Bitcoin) and not some unrelated token that happens to use the same ticker on another chain.
:::

### Getting DOC

DOC is a Bitcoin-collateralized stablecoin on Rootstock.

- **Mint with rBTC (protocol-native)**  
  Use the Money On Chain dApp to mint DOC by depositing rBTC as collateral:  
  [dapp.moneyonchain.com](https://dapp.moneyonchain.com)

- **Swap on Rootstock DEXs**  
  Swap rBTC, USDT or other Rootstock tokens for DOC on DEXs such as [OKU Trade](https://oku.trade/app/rootstock/swap)

- **From USDT on other networks (via Stargate + OKU)**  
  1. Bridge USDT to Rootstock using [Stargate](https://stargate.finance/) (LayerZero)
  2. On Rootstock, use [OKU Trade](https://oku.trade/app/rootstock/swap) to swap USDT → DOC

### Getting USDRIF

USDRIF is a stablecoin from the RIF ecosystem.

- **Mint via RIF on Chain**  
  Mint USDRIF through the RIF on Chain protocol:  
  [rif.moneyonchain.com](https://rif.moneyonchain.com/)

- **Swap on Rootstock DEXs**  
  Swap rBTC or other tokens for USDRIF on [OKU Trade](https://oku.trade/app/rootstock/swap)

## Next Steps

- [Create a DCA schedule](/docs/user-guide/create-schedule)
- [View deployed contract addresses](/docs/contracts/addresses)
