---
sidebar_position: 2
---

# Glossary

## Protocol

### Dollar-cost averaging

You buy a fixed gross amount on a repeated cadence.

### Schedule

One owner's recurring purchase of rBTC with one stablecoin on one route. The key is the stablecoin plus a decimal schedule id.

### Schedule id

A decimal counter value. The first id is 1. You use it with the stablecoin. A delete retires the id.

### Cadence

The purchase period. It is a whole number of UTC days.

### Cadence anchor

The UTC midnight of the newest consumed cadence slot. It is zero before the first purchase. It is not the time of the purchase transaction.

### Gross purchase amount

The stablecoin amount the schedule spends on one purchase. The fee is not subtracted from this amount before the purchase.

### Buyer-net rBTC

The rBTC credited to the buyer after the purchase fee is taken from the measured rBTC output.

### Quoted stablecoin input

The `quotedStablecoinIn` field of a purchase batch. It is the gross stablecoin input that the swapper's quote used, in token base units.

### Purchase minimum

The `minRbtcOut` field of a purchase batch. It is the gross output minimum, before the purchase fee, for the quoted stablecoin input. The handler scales it to the actual input and rounds up.

### Route

The idle or lending destination for one stablecoin. Index 0 is idle. Index 1 is LayerBank. Index 2 is not registered at launch. The contract constants name it for Sovryn.

### Initial launch

The first deployment configuration. It supports DOC only, on idle (index 0) and LayerBank (index 1). The USDRIF and USDT0 DEX handlers are implemented and tested, and the initial launch does not enable them.

### Active pair

A stablecoin and route that has a handler in the registry. `getHandler(token, routeIndex)` returns a nonzero address for it. The deployment decides the active pairs.

### Schedule pause

A flag the owner of the schedule sets. It blocks purchases for that schedule.

### Deposit pause

An owner flag for one stablecoin and one route. It blocks new deposits for that pair.

### Protected purchase window

Five blocks opened by a swapper. During the window, selected edits, deletes, and stablecoin withdrawals are refused. An rBTC claim stays available.

## Contracts

### DcaManager

The user and swapper entry. It stores schedules. It does not hold the tokens.

### OperationsAdmin

The registry of routes, handlers, the swapper allowlist, and deposit pauses.

### Handler

The contract that holds stablecoin and rBTC for one stablecoin and one route.

### DEX handler

A handler that buys through Uniswap V3. The protocol has DEX handlers for USDRIF and USDT0. The initial launch does not enable them.

### Oracle floor

The lowest output that a DEX handler requires from a swap. It is a configured percentage of the output that the Money on Chain BTC/USD oracle implies. The handler passes it to the Uniswap V3 router as part of `amountOutMinimum`, and the router enforces it.

### Execution-quality rules

The BitChill swapper's checks on a DEX quote: a tolerance against the handler's oracle reference and a price-impact limit against the pool price before the transaction. They apply only to a DEX token.

### Swapper

An allowlisted account that can submit a purchase batch and open the protected window.

## Assets

### rBTC

The native asset of Rootstock. Backing and an exchange price are different facts. A conversion is not a cost-free 1:1 promise.

### DOC

A Money on Chain stablecoin with 18 decimals. The stablecoin of the initial launch, on idle and LayerBank.

### USDRIF

A RIF stablecoin with 18 decimals. The protocol has idle and LayerBank DEX handlers for it. The initial launch does not enable them.

### USDT0

The Rootstock token at `0x779Ded0c9e1022225f8E0630b35a9b54bE713736`. It has 6 decimals. The protocol has idle and LayerBank DEX handlers for it. The initial launch does not enable them. The address is the Rootstock token, not a BitChill deployment.

### Idle route

The handler holds the stablecoin. The balance earns no lending yield.

## Venues

### LayerBank

The lending venue of route index 1. The initial launch uses it for DOC. The protocol also has LayerBank handlers for USDRIF and USDT0, which the initial launch does not enable.

### Sovryn

Not a launch route. The contract source keeps a Sovryn lending adapter and a Sovryn DOC handler for possible future support. An earlier BitChill deployment used Sovryn. That history is not part of this protocol.

### Money on Chain

The redemption venue for a DOC purchase.

### Uniswap

The Uniswap V3 swap venue of the DEX handlers, for a USDRIF or USDT0 purchase. The initial launch does not use it.

### Rootstock

The chain for this protocol. Chain ID 30 is mainnet. The protocol contracts are not deployed.

### Tropykus

Tropykus is not a route in this protocol. An earlier BitChill deployment used Tropykus.
