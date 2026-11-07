---
sidebar_position: 2
---

# Supported tokens and routes

BitChill is built for Rootstock. The protocol contracts in these pages are not deployed.

These pages separate two things. The protocol implements three stablecoins and three route kinds. The initial launch enables a subset of them. A table that names a pair says which of the two it describes.

## Initial launch: DOC only

:::info[Initial launch]

The initial launch supports DOC only, on the idle route (index 0) and the LayerBank route (index 1). The USDRIF and USDT0 DEX handlers are implemented and tested. The initial launch does not enable them. A reviewed configuration can enable them when Rootstock DEX liquidity is deep enough for the execution-quality rules.

:::

| Pair at the initial launch | Route index | Lending yield while the stablecoin waits | Purchase venue |
| --- | --- | --- | --- |
| DOC idle | 0 | None | Money on Chain |
| DOC LayerBank | 1 | Lending is possible | Money on Chain |

A DOC purchase redeems DOC at Money on Chain for native rBTC. It does not trade against a pool. The handler checks the measured output against the swapper's scaled minimum. See [Purchase minimum](/docs/contracts/core-contracts#purchase-minimum).

The deployment decides which pairs are active, not these pages. An integration reads `getHandler(token, routeIndex)` on the registry. A zero address means that the pair has no handler.

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

| Stablecoin | Decimals | Purchase venue | Handlers in the protocol | Initial launch |
| --- | --- | --- | --- | --- |
| DOC | 18 | Money on Chain | Idle, LayerBank, Sovryn | Enabled on idle and LayerBank |
| USDRIF | 18 | Uniswap V3 | Idle, LayerBank | Implemented. Not enabled. |
| USDT0 | 6 | Uniswap V3 | Idle, LayerBank | Implemented. Not enabled. |

This page publishes one stablecoin address. USDT0 at `0x779Ded0c9e1022225f8E0630b35a9b54bE713736` is the existing Rootstock token. It is not a BitChill deployment.

DOC and USDRIF are the other two stablecoins in the table. This page does not publish a DOC address or a USDRIF address.

## Route pairs

Each pair is one stablecoin and one route. One handler contract serves one pair. The protocol source has a handler for each pair below. The last column says whether the initial launch assigns it. None of these handler contracts is deployed.

| Stablecoin | Route | Lending yield while the stablecoin waits | Purchase venue | Initial launch |
| --- | --- | --- | --- | --- |
| DOC | Idle | None | Money on Chain | Assigned |
| DOC | LayerBank | Lending is possible | Money on Chain | Assigned |
| USDRIF | Idle | None | Uniswap V3 | Not assigned |
| USDRIF | LayerBank | Lending is possible | Uniswap V3 | Not assigned |
| USDT0 | Idle | None | Uniswap V3 | Not assigned |
| USDT0 | LayerBank | Lending is possible | Uniswap V3 | Not assigned |
| DOC | Sovryn | Lending is possible | Money on Chain | Not registered. See [Sovryn](#sovryn). |

Tropykus is not a route in this protocol. The idle route earns no lending yield.

The route index in the contracts is a number:

| Index | Route | Initial launch |
| --- | --- | --- |
| 0 | Idle | Registered. DOC handler assigned. |
| 1 | LayerBank, a lending route | Registered as lending. DOC handler assigned. |
| 2 | Sovryn, named in the contract constants | Not registered and not assigned. See [Not at launch](#not-at-launch). |

## Purchase paths

A DOC purchase redeems DOC at Money on Chain for native rBTC. A USDRIF or USDT0 purchase swaps through Uniswap V3 pools to wrapped rBTC (WRBTC). A DEX handler receives its first swap path at construction. The contract repository's deployment configuration uses these paths:

| Stablecoin | Swap path of the DEX handler |
| --- | --- |
| USDRIF | USDRIF → USDT0 (0.05% pool) → WRBTC (0.30% pool) |
| USDT0 | USDT0 → WRBTC (0.30% pool) |

These paths apply when a DEX token is enabled. The initial launch does not use them.

A USDRIF purchase uses USDT0 as the intermediate token. It does not use the legacy USDT token. The pool fee is part of the swap. It is not the BitChill purchase fee. A claim pays native rBTC, because the DEX handler unwraps WRBTC before the payment. The [DEX handler settings](/docs/contracts/core-contracts#dex-handler-settings) explain the path allowlist and the oracle floor.

## Enabling USDRIF and USDT0

USDRIF and USDT0 use the same manager, registry, schedule rules, fee formula, and claim call as DOC. Only the purchase venue differs: their handlers swap on Uniswap V3 instead of redeeming at Money on Chain.

A DEX purchase must pass these checks:

- In the handler: the measured WRBTC must reach the oracle floor and the swapper's scaled minimum.
- In the BitChill swapper: the quote must stay within the execution-quality tolerance against the handler's oracle reference, and within the price-impact limit against the pool price before the transaction.

These rules protect the price that the buyer gets, and they need pool depth. Rootstock DEX liquidity on these paths is not yet deep enough for the execution-quality rules. The initial launch therefore does not enable the DEX tokens.

When liquidity is deep enough, a reviewed configuration can enable a DEX token. No contract code change is needed:

1. The owner deploys the DEX handlers from the reviewed source and sets the token minimum on the manager.
2. The owner assigns each handler in the registry with `assignHandler(token, routeIndex, handler)`.
3. The operators add the new pairs to the configuration of the swapper, the monitoring service, the data API, and the app. Each service already knows the token and the route. See [Offchain services](/docs/contracts/offchain-services).
4. The swapper then requires its DEX settings for that token: the swap path, the quoter, the WRBTC address, the execution-quality tolerance, and the price-impact limit. A DOC-only configuration does not need them.

## Not at launch

### USDRIF and USDT0

The DEX handlers for USDRIF and USDT0 are implemented and tested. The initial launch does not assign them. A create on a pair with no handler reverts, so no schedule can exist on that pair. A claim list or an interest list skips that pair. See [Enabling USDRIF and USDT0](#enabling-usdrif-and-usdt0).

### Sovryn

The contract source has a Sovryn lending adapter. It mints and burns Sovryn iTokens, and the shared lending base keeps the per-user share book. Two handler contracts use it: `SovrynDocHandlerMoc` for DOC with Money on Chain purchases, and `SovrynHandlerDex` for a stablecoin with Uniswap V3 purchases. The repository's deployment scripts build a Sovryn handler for DOC only. The contract constants name index 2 for Sovryn.

The initial launch does not register index 2 and does not assign a Sovryn handler. A create with route index 2 finds no handler and reverts. No schedule can exist on that route. A claim list or an interest list skips a pair with index 2. A Sovryn route can only come from a future reviewed deployment step. These pages describe it only as that possible future support.

### Earlier BitChill deployment (historical)

An earlier BitChill deployment used Sovryn and Tropykus routes. Positions in that deployment stay in its own contracts and keep their own labels. These pages do not describe that deployment. This protocol does not use its contracts.

## Receipt tokens named for Rootstock

These addresses are existing Rootstock tokens. They are not BitChill contracts. They are the LayerBank receipt tokens of the USDRIF and USDT0 LayerBank handlers, which the initial launch does not enable.

| Token | Address |
| --- | --- |
| LayerBank USDRIF receipt | `0xc96fBD12bE56Dd565b258d243344bCf792A51128` |
| LayerBank USDT0 receipt | `0x6bE7d4cfCe825b106aa88F6916A412c5af230Ec0` |

## rBTC for gas

Your own transactions need rBTC for Rootstock gas. The swapper submits a purchase transaction. You submit create, deposit, edit, withdraw, delete, and claim transactions.

Ways to obtain rBTC include the Rootstock PowPeg, a cross-chain service that supports Rootstock rBTC, a fiat on-ramp that withdraws to Rootstock, or a transfer from another Rootstock account. Confirm that the service delivers Rootstock rBTC. A transfer is not a cost-free 1:1 conversion.

- PowPeg: [powpeg.rootstock.io](https://powpeg.rootstock.io/)

## Stablecoin sources

DOC is the Money on Chain dollar token. You can mint it or swap for it on Rootstock. USDRIF is the RIF dollar token. USDT0 is the Rootstock token named above. This protocol does not issue these stablecoins. At the initial launch, a schedule uses DOC.

- Money on Chain: [moneyonchain.com](https://moneyonchain.com/)
- RIF on Chain: [rif.moneyonchain.com](https://rif.moneyonchain.com/)

## Read next

- [Create a schedule](/docs/user-guide/create-schedule)
- [Contract address status](/docs/contracts/addresses)
