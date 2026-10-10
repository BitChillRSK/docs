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

### Route

The idle or lending destination for one stablecoin. Index 0 is idle. Index 1 is LayerBank. Index 2 is Sovryn.

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

### Swapper

An allowlisted account that can submit a purchase batch and open the protected window.

## Assets

### rBTC

The native asset of Rootstock. Backing and an exchange price are different facts. A conversion is not a cost-free 1:1 promise.

### DOC

A Money on Chain stablecoin with 18 decimals. This protocol pairs it with idle, LayerBank, and Sovryn.

### USDRIF

A RIF stablecoin with 18 decimals. This protocol pairs it with idle and LayerBank.

### USDT0

The Rootstock token at `0x779Ded0c9e1022225f8E0630b35a9b54bE713736`. It has 6 decimals. This protocol pairs it with idle and LayerBank. The address is the Rootstock token, not a BitChill deployment.

### Idle route

The handler holds the stablecoin. The balance earns no lending yield.

## Venues

### LayerBank

A lending venue for DOC, USDRIF, and USDT0 in this protocol.

### Sovryn

A lending venue for DOC in this protocol.

### Money on Chain

The redemption venue for a DOC purchase.

### Uniswap

The swap venue for a USDRIF or USDT0 purchase.

### Rootstock

The chain for this protocol. Chain ID 30 is mainnet. The protocol contracts are not deployed.

### Tropykus

Tropykus is not a route in this protocol.
