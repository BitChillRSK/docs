---
sidebar_position: 4
---

# Claim rBTC

A purchase credits buyer-net rBTC to you inside the handler. The rBTC stays there until you claim it. The contracts are not deployed.

## Where the balance lives

The balance is per account, per stablecoin, and per route. It is not per schedule. Two DOC schedules on LayerBank add rBTC in the DOC LayerBank handler. A DOC idle schedule uses a different handler.

You can read the balance for a token and route. You claim with `withdrawAllAccumulatedRbtc`. That call takes a list of stablecoins and a list of route indexes. Entry 1 of each list is one pair, entry 2 is the next pair, and so on.

- To claim one pair, send one stablecoin and one route, for example DOC and route 1 (LayerBank).
- To claim several pairs in one call, send one stablecoin and one route for each pair.
- A pair with no handler or with a zero balance is skipped.
- The two lists must have the same length and must not be empty.

## What a claim does

1. You send the claim from your account.
2. Each handler in the call pays your accumulated rBTC for its pair.
3. A DOC handler pays the native rBTC that Money on Chain returned. A DEX handler (USDRIF or USDT0, not enabled at the initial launch) unwraps the wrapped rBTC from the swap and pays native rBTC.
4. Your schedules keep their principal and their cadence.

A claim does not close a schedule. A delete does not claim rBTC. Run the claim when you want the rBTC in your account.

The account must accept a plain native rBTC payment. An ordinary wallet account does. A smart-contract wallet must also accept it. If one payment in the call fails, the whole call reverts and your rBTC stays in the handlers.

A schedule pause does not block the claim. A deposit pause does not block the claim. The protected purchase window does not block the claim. Website data does not block the claim.

## After the claim

The rBTC is the native asset in your Rootstock account. You can keep it there. You can also use the PowPeg or another service. A conversion has its own cost. Backing and an exchange price are different facts.

You pay the gas for the claim. The amount of gas depends on the network and on the number of pairs in the call.

## Read next

- [Manage a schedule](/docs/user-guide/manage-schedules)
- [Fees](/docs/user-guide/fees)
- [FAQ](/docs/resources/faq)
