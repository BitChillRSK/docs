---
sidebar_position: 4
---

# Withdrawing rBTC

Purchased rBTC is accumulated per user in each token handler and withdrawn through DcaManager.

## Accounting Model

Accumulated rBTC is **not stored per schedule ID**. It is tracked per user per handler.

A handler is identified by `(token, lendingProtocolIndex)`.

## Withdrawal Methods

### Single handler

Use:

- `withdrawRbtcFromTokenHandler(token, lendingProtocolIndex)`

### Multiple handlers

Use:

- `withdrawAllAccumulatedRbtc(tokens[], lendingProtocolIndexes[])`

DcaManager iterates those combinations, skips missing handlers, and withdraws where user balance is non-zero.

## Notes

- If no accumulated rBTC exists for a handler, nothing is withdrawn for that pair.
- rBTC withdrawal is independent from schedule deletion.
- For Uniswap-based handlers, WRBTC is unwrapped before native rBTC transfer to user.

## Next Steps

- [Manage schedules](/docs/user-guide/manage-schedules)
- [FAQ](/docs/resources/faq)
