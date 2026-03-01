---
sidebar_position: 1
---

# Frequently Asked Questions

## What is BitChill?

BitChill is an on-chain DCA protocol on Rootstock for periodic stablecoin-to-rBTC accumulation.

## Which tokens are supported?

Current mainnet deployment supports:

- DOC
- USDRIF

See the active handler matrix here: [Supported Tokens & Chains](/docs/getting-started/supported-assets).

## Which lending options are available?

Current deployment:

- DOC: Tropykus and Sovryn handlers
- USDRIF: Tropykus handler

## How often can purchases run?

The frontend currently offers 1/2/4-week presets. Contract validation enforces a configurable minimum period (`getMinPurchasePeriod`).

## What is the minimum purchase amount?

Minimum purchase amount is configurable in DcaManager:

- token-specific minimum if set
- otherwise default minimum

Read with `getTokenMinPurchaseAmount(token)`.

## Can I have multiple schedules?

Yes, up to `maxSchedulesPerToken` for each user+token pair.

## Does withdrawing/deleting a schedule automatically include interest?

Not by default.

- `withdrawToken` / `deleteDcaSchedule` handle schedule principal.
- Interest is withdrawn via `withdrawAllAccumulatedInterest` or `withdrawTokenAndInterest`.

## Is accumulated rBTC tracked per schedule?

No. rBTC is tracked per user per token handler (token + lending protocol pair).

## Are fees fixed or variable?

Both are possible. Fee behavior is handler-configurable:

- flat when `minFeeRate == maxFeeRate`
- sliding when rates differ

## Who pays gas for automated purchases?

Automated purchase transactions are executed by swapper infrastructure. Users pay gas for their own direct actions (create/update/withdraw calls).

## Are contracts upgradeable?

Core contracts in this repository are not proxy-upgradeable. New versions are introduced by new deployments/registrations.

## Where can I review audits?

[Audit Reports](/docs/security/audits)
