---
sidebar_position: 5
---

# Earning Yield

BitChill handlers can route deposits into lending integrations (Tropykus or Sovryn depending on handler).

## How Yield Is Accounted

Yield is represented through each handler's lending-token accounting:

- Tropykus handlers track user kToken balances.
- Sovryn handlers track user iSUSD balances.

DcaManager computes per-user locked principal for a token + lending protocol pair and queries handler interest functions.

## Interest Read/Withdraw Flow

- Read: `getInterestAccrued(user, token, lendingProtocolIndex)`
- Withdraw all interest across pairs: `withdrawAllAccumulatedInterest(tokens, lendingProtocolIndexes)`
- Combined action with principal withdrawal: `withdrawTokenAndInterest(...)`

## Important Clarification

Scheduled purchases are driven by each schedule's `purchaseAmount`. Interest is tracked and withdrawable separately. Avoid assuming that each periodic swap automatically spends "purchaseAmount + all accrued interest".

## Protocol Support

- Tropykus: DOC and USDRIF handlers
- Sovryn: DOC handlers in current deployment

## Risk Reminder

Yield depends on external lending protocols and their liquidity/market conditions.

## Next Steps

- [Fees](/docs/user-guide/fees)
- [Security model](/docs/security/security-model)
