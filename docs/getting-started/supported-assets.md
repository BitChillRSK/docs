---
sidebar_position: 2
---

# Supported Tokens & Chains

BitChill operates on Rootstock and supports specific stablecoins and lending protocols.

## Chain: Rootstock (RSK)

[Rootstock](https://rootstock.io/) is a Bitcoin sidechain that enables smart contracts while being secured by Bitcoin's hashpower through merge-mining. Key characteristics:

- **Native Token**: rBTC (pegged 1:1 to BTC)
- **EVM Compatible**: Supports Solidity smart contracts
- **Bitcoin Security**: Secured by ~60% of Bitcoin's hashpower
- **Low Fees**: Transaction costs significantly lower than Ethereum

### Network Details

| Property | Value |
|----------|-------|
| Chain ID | 30 |
| Currency | rBTC |
| Block Time | ~30 seconds |
| RPC URL | `https://public-node.rsk.co` |
| Explorer | [explorer.rsk.co](https://explorer.rsk.co) |

## Supported Stablecoins

BitChill accepts two Rootstock-native stablecoins for DCA deposits:

### DOC (Dollar on Chain)

DOC is the stablecoin of the [Money on Chain](https://moneyonchain.com/) protocol, backed by Bitcoin collateral.

| Property | Value |
|----------|-------|
| Contract | `0xe700691dA7b9851F2F35f8b8182c69c53CcaD9Db` |
| Decimals | 18 |
| Peg | 1 USD |
| Collateral | Bitcoin (via MoC protocol) |

### USDRIF

USDRIF is a USD-pegged stablecoin from the [RIF ecosystem](https://www.rifos.org/).

| Property | Value |
|----------|-------|
| Contract | `0x3A15461d8aE0F0Fb5Fa2629e9DA7D66A794a6e37` |
| Decimals | 18 |
| Peg | 1 USD |

## Lending Protocols

Your deposited stablecoins earn yield through integration with these lending protocols:

### Tropykus

[Tropykus](https://tropykus.com/) is a Compound-fork lending protocol on Rootstock, focused on the Latin American market.

| Stablecoin | Lending Token | Description |
|------------|---------------|-------------|
| DOC | kDOC | `0x544Eb90e766B405134b3B3F62b6b4C23Fcd5fDa2` |
| USDRIF | kUSDRIF | `0xDdf3CE45fcf080DF61ee61dac5Ddefef7ED4F46C` |

When you deposit into a Tropykus-enabled schedule:
- Your stablecoins are converted to kTokens
- kTokens appreciate in value as interest accrues
- Interest is automatically included when swapping to rBTC

### Sovryn

[Sovryn](https://sovryn.com/) is a DeFi platform on Rootstock offering lending, trading, and more.

| Stablecoin | Lending Token | Description |
|------------|---------------|-------------|
| DOC | iSUSD | `0xd8D25f03EBbA94E15Df2eD4d6D38276B595593c1` |

When you deposit into a Sovryn-enabled schedule:
- Your DOC is deposited into the Sovryn lending pool
- You earn interest from borrowers
- Interest accrues continuously

## Swap Methods

BitChill uses different swap methods depending on the stablecoin:

### Money on Chain (Primary for DOC)

For DOC, BitChill can redeem directly through the Money on Chain protocol:
- No slippage (primary market pricing)
- Gas efficient
- Available only for DOC

### Uniswap V3

For all stablecoins, BitChill can swap through Uniswap V3 pools on Rootstock:
- Market-based pricing
- Slippage protection via oracle price validation
- Available for DOC and USDRIF

## Getting Tokens

To use BitChill, you'll need:

1. **rBTC** for gas fees
2. **DOC or USDRIF** for DCA deposits

### Getting rBTC

- Bridge BTC from Bitcoin mainnet via [Powpeg](https://app.rsk.co/powpeg/)
- Bridge from other chains via [RSK Token Bridge](https://tokenbridge.rsk.co/)

### Getting DOC

- Mint via [Money on Chain](https://moneyonchain.com/)
- Swap on [Sovryn](https://sovryn.com/) or other RSK DEXes

### Getting USDRIF

- Available on [RIF on Chain](https://rif.moneyonchain.com/)
- Swap on RSK DEXes

## Next Steps

Now that you know what assets are supported:

- [Connect your wallet](/docs/user-guide/connect-wallet)
- [Create your first DCA schedule](/docs/user-guide/create-schedule)
