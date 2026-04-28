---
sidebar_position: 3
---

# Contract Addresses

## Rootstock Mainnet

### Core Protocol

| Contract | Address | Explorer |
|----------|---------|----------|
| DcaManager | `0x4d9cbe0f242EE85F7Fa25C77329749381bA998be` | [View](https://rootstock.blockscout.com/address/0x4d9cbe0f242EE85F7Fa25C77329749381bA998be) |
| OperationsAdmin | `0x942B18A5f78eD612635b6E5FbC49159B5a955f59` | [View](https://rootstock.blockscout.com/address/0x942B18A5f78eD612635b6E5FbC49159B5a955f59) |

### Active Handlers

| Handler | Stablecoin | Lending | Swap | Address |
|---------|------------|---------|------|---------|
| SovrynDocHandlerMoc | DOC | Sovryn | MoC | `0xA1A752784d4d43778ED23771777B18AE9cb66461` |

### Legacy Handlers (Sunset)

| Handler | Stablecoin | Lending | Swap | Address |
|---------|------------|---------|------|---------|
| TropykusDocHandlerMoc | DOC | Tropykus | MoC | `0xb60024d0030d7876f02BB766E18F0664e81B0856` |
| TropykusErc20HandlerDex | USDRIF | Tropykus | Uniswap V3 | `0xAfcD7A6F5165F09b049ded06EEC12F5A9E3D09A2` |

### Operational Addresses

| Role | Address |
|------|---------|
| Swapper | `0x362051AeDA2Df55Ffa6CEFCEd3973d90a0891285` |
| Fee Collector | `0x3caB92C050514A0368D71815CAc42ad746350F16` |

## Token and Dependency Addresses (Mainnet)

| Item | Address |
|------|---------|
| DOC | `0xe700691dA7b9851F2F35f8b8182c69c53CcaD9Db` |
| USDRIF | `0x3A15461d8aE0F0Fb5Fa2629e9DA7D66A794a6e37` |
| kDOC | `0x544Eb90e766B405134b3B3F62b6b4C23Fcd5fDa2` |
| kUSDRIF | `0xDdf3CE45fcf080DF61ee61dac5Ddefef7ED4F46C` |
| iSUSD | `0xd8D25f03EBbA94E15Df2eD4d6D38276B595593c1` |
| WRBTC | `0x542fDA317318eBF1d3DEAf76E0b632741A7e677d` |
| MoC Proxy | `0xf773B590aF754D597770937Fa8ea7AbDf2668370` |
| MoC Oracle | `0xe2927A0620b82A66D67F678FC9b826B0E01B1bFD` |
| SwapRouter02 | `0x0B14ff67f0014046b4b99057Aec4509640b3947A` |

## Rootstock Testnet

| Contract | Address | Explorer |
|----------|---------|----------|
| DcaManager | `0xe41768Eb79F7e84cB793f2E50d995eb31AF0883F` | [View](https://rootstock-testnet.blockscout.com/address/0xe41768Eb79F7e84cB793f2E50d995eb31AF0883F) |
| OperationsAdmin | `0x7d70dDc0F0Bfaf33FcCe6Af99C2BEF6413d2ec6B` | [View](https://rootstock-testnet.blockscout.com/address/0x7d70dDc0F0Bfaf33FcCe6Af99C2BEF6413d2ec6B) |
| TropykusDocHandlerMoc (legacy) | `0x513a9D082d291Aa39DBA7a90a8a54A42e0EbF727` | [View](https://rootstock-testnet.blockscout.com/address/0x513a9D082d291Aa39DBA7a90a8a54A42e0EbF727) |
| SovrynDocHandlerMoc | `0x2d8E508c239A1f284e5F859d9945E5e369615364` | [View](https://rootstock-testnet.blockscout.com/address/0x2d8E508c239A1f284e5F859d9945E5e369615364) |

## Lending Protocol Indexes

| Index | Meaning |
|-------|---------|
| 0 | no lending / direct handler slot |
| 1 | tropykus (legacy) |
| 2 | sovryn |

## Parameter Discovery

Do not hardcode operational parameters in integrations. Read on-chain values from contracts:

- `DcaManager.getMinPurchasePeriod()`
- `DcaManager.getDefaultMinPurchaseAmount()`
- `DcaManager.getTokenMinPurchaseAmount(token)`
- Handler fee getters (`getMinFeeRate`, `getMaxFeeRate`, bounds)
