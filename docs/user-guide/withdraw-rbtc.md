---
sidebar_position: 4
---

# Claim rBTC

A purchase credits buyer-net rBTC to you inside the handler. The rBTC stays there until you claim it. The contracts are not deployed.

## Where the balance lives

The balance is per account, per stablecoin, and per route. It is not per schedule. Two DOC schedules on LayerBank add rBTC in the DOC LayerBank handler. A DOC idle schedule uses a different handler.

You can read the balance for a token and route. You claim it with `withdrawAccumulatedRbtc`. You can claim several pairs in one call with `withdrawAllAccumulatedRbtc`. An empty or unassigned pair in that batch is skipped.

## What a claim does

1. You send the claim from your account.
2. The handler pays your accumulated rBTC.
3. On a Uniswap route, wrapped rBTC from the swap is unwrapped to native rBTC for the payment.
4. Your schedules keep their principal and their cadence.

A claim does not close a schedule. A delete does not claim rBTC. Run the claim when you want the rBTC in your account.

A schedule pause does not block the claim. A deposit pause does not block the claim. The protected purchase window does not block the claim. Website data does not block the claim.

## After the claim

The rBTC is the native asset in your Rootstock account. You can keep it there. You can also use the PowPeg or another service. A conversion has its own cost. Backing and an exchange price are different facts.

You pay the gas for the claim. The amount of gas depends on the network and on the number of pairs in the call.

## Read next

- [Manage a schedule](/docs/user-guide/manage-schedules)
- [Fees](/docs/user-guide/fees)
- [FAQ](/docs/resources/faq)
