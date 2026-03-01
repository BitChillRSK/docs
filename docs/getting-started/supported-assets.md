---
sidebar_position: 2
---

# Supported Tokens & Chains

## Chain

BitChill runs on **Rootstock Mainnet** (`chainId = 30`).

- Native gas token: `rBTC`
- RPC: `https://public-node.rsk.co`
- Explorer: [rootstock.blockscout.com](https://rootstock.blockscout.com)

## Stablecoins

### DOC

- Address: `0xe700691dA7b9851F2F35f8b8182c69c53CcaD9Db`
- Decimals: 18

### USDRIF

- Address: `0x3A15461d8aE0F0Fb5Fa2629e9DA7D66A794a6e37`
- Decimals: 18

## Active Handler Matrix (Current Mainnet Deployment)

| Stablecoin | Lending Protocol | Swap Method | Status |
|------------|------------------|-------------|--------|
| DOC | Tropykus | Money on Chain | Active |
| DOC | Sovryn | Money on Chain | Active |
| USDRIF | Tropykus | Uniswap V3 | Active |

## Protocol Capability Notes

- Architecture supports additional handler combinations.
- In current deployment scripts/config, **USDRIF + Sovryn** is not enabled.

## Lending Integrations

### Tropykus

- DOC lending token: `kDOC` (`0x544Eb90e766B405134b3B3F62b6b4C23Fcd5fDa2`)
- USDRIF lending token: `kUSDRIF` (`0xDdf3CE45fcf080DF61ee61dac5Ddefef7ED4F46C`)

### Sovryn

- DOC lending token: `iSUSD` (`0xd8D25f03EBbA94E15Df2eD4d6D38276B595593c1`)

## Swap Backends

### Money on Chain (DOC handlers)

DOC handlers using MoC redeem DOC for rBTC through MoC proxy flow.

### Uniswap V3 (DEX handlers)

DEX handlers swap stablecoin to WRBTC via configured path + fee tiers, with oracle-based `amountOutMinimum` calculation.

## Next Steps

- [Create a schedule](/docs/user-guide/create-schedule)
- [See deployed contract addresses](/docs/contracts/addresses)
