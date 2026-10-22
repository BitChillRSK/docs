---
sidebar_position: 2
---

# Supported tokens and routes

BitChill is built for Rootstock. The protocol contracts in these pages are not deployed.

## Rootstock

| Parameter | Value |
| --- | --- |
| Network name | Rootstock Mainnet |
| Chain ID | 30 |
| Native asset | rBTC |
| Public RPC | `https://public-node.rsk.co` |
| Block explorer | [rootstock.blockscout.com](https://rootstock.blockscout.com) |

rBTC is the native asset of Rootstock. A description of backing is not an exchange price. A conversion between BTC and rBTC is not a promise of a cost-free 1:1 exchange. A bridge transfer has its own cost and time. A market price is a separate fact.

## Stablecoins

| Stablecoin | Decimals | Routes at launch |
| --- | --- | --- |
| DOC | 18 | Idle, LayerBank |
| USDRIF | 18 | Idle, LayerBank |
| USDT0 | 6 | Idle, LayerBank |

This page publishes one stablecoin address. USDT0 at `0x779Ded0c9e1022225f8E0630b35a9b54bE713736` is the existing Rootstock token. It is not a BitChill deployment.

DOC and USDRIF are the other two stablecoins in the route table. This page does not publish a DOC address or a USDRIF address.

## Route pairs

Each pair is one stablecoin and one route. The deployment script assigns one handler to each of six pairs. Those handler contracts are not deployed.

| Stablecoin | Route | Lending yield while the stablecoin waits | Purchase venue |
| --- | --- | --- | --- |
| DOC | Idle | None | Money on Chain |
| DOC | LayerBank | Lending is possible | Money on Chain |
| USDRIF | Idle | None | Uniswap |
| USDRIF | LayerBank | Lending is possible | Uniswap |
| USDT0 | Idle | None | Uniswap |
| USDT0 | LayerBank | Lending is possible | Uniswap |

Tropykus is not a route in this protocol. The idle route earns no lending yield.

The route index in the contracts is a number:

| Index | Route at launch |
| --- | --- |
| 0 | Idle |
| 1 | LayerBank. The deployment script registers it as a lending route. |
| 2 | Not registered and not assigned. See [Not at launch](#not-at-launch). |

## Purchase paths

A DOC purchase redeems DOC at Money on Chain for native rBTC. A USDRIF or USDT0 purchase swaps through Uniswap pools to wrapped rBTC (WRBTC). The deployment script sets these swap paths:

| Stablecoin | Swap path at launch |
| --- | --- |
| USDRIF | USDRIF → USDT0 (0.05% pool) → WRBTC (0.30% pool) |
| USDT0 | USDT0 → WRBTC (0.30% pool) |

A USDRIF purchase uses USDT0 as the intermediate token. It does not use the legacy USDT token. The pool fee is part of the swap. It is not the BitChill purchase fee. A claim pays native rBTC.

## Not at launch

### Sovryn

The contract source keeps a Sovryn DOC handler, and the contract constants name index 2 for Sovryn. The launch deployment does not register index 2 and does not assign a Sovryn handler. A call with route index 2 finds no handler and reverts. A Sovryn route can only come from a future reviewed deployment. These pages describe it only as that possible future support.

### Earlier BitChill deployment (historical)

An earlier BitChill deployment used Sovryn and Tropykus routes. Positions in that deployment stay in its own contracts and keep their own labels. These pages do not describe that deployment. This protocol does not use its contracts.

## Receipt tokens named for Rootstock

These addresses are existing Rootstock tokens. They are not BitChill contracts.

| Token | Address |
| --- | --- |
| LayerBank USDRIF receipt | `0xc96fBD12bE56Dd565b258d243344bCf792A51128` |
| LayerBank USDT0 receipt | `0x6bE7d4cfCe825b106aa88F6916A412c5af230Ec0` |

## rBTC for gas

Your own transactions need rBTC for Rootstock gas. The swapper submits a purchase transaction. You submit create, deposit, edit, withdraw, delete, and claim transactions.

Ways to obtain rBTC include the Rootstock PowPeg, a cross-chain service that supports Rootstock rBTC, a fiat on-ramp that withdraws to Rootstock, or a transfer from another Rootstock account. Confirm that the service delivers Rootstock rBTC. A transfer is not a cost-free 1:1 conversion.

- PowPeg: [powpeg.rootstock.io](https://powpeg.rootstock.io/)

## Stablecoin sources

DOC is the Money on Chain dollar token. You can mint it or swap for it on Rootstock. USDRIF is the RIF dollar token. USDT0 is the Rootstock token named above. This protocol does not issue these stablecoins.

- Money on Chain: [moneyonchain.com](https://moneyonchain.com/)
- RIF on Chain: [rif.moneyonchain.com](https://rif.moneyonchain.com/)

## Read next

- [Create a schedule](/docs/user-guide/create-schedule)
- [Contract address status](/docs/contracts/addresses)
