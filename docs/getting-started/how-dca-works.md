---
sidebar_position: 1
---

# How DCA works

Dollar-cost averaging buys a fixed amount on a repeated cadence. You do not choose a single entry price. BitChill records that cadence in a schedule on Rootstock.

The contracts that run this schedule are not deployed.

## What you set

A schedule stores these facts:

- The stablecoin: DOC, USDRIF, or USDT0.
- The route: idle, LayerBank, or Sovryn, for the pairs this protocol uses.
- The deposit, which is principal the schedule can still spend or withdraw.
- The purchase amount, in that stablecoin. This amount is the gross cost of one purchase.
- The cadence, as a whole number of UTC days.
- A pause flag for purchases on that schedule.

The schedule id is a decimal number. You use that id together with the stablecoin. The id comes from a counter. It starts at 1. A delete retires the id. The protocol does not reuse it.

## Cadence

The cadence is a grid of UTC midnights. The cadence anchor is the UTC midnight of the newest consumed slot. The anchor is zero before the first purchase. The anchor is not the time of the purchase transaction.

The first purchase is eligible on the creation UTC day once the swapper submits it. When it succeeds, it sets the anchor to the UTC midnight of that day. A later purchase becomes eligible at 00:00 UTC on the due day. The contract does not reserve a minute inside that day. If several due days pass before a purchase succeeds, the purchase consumes the newest due slot and skips the missed slots. There is no catch-up.

A due day is not a completed purchase. The swapper must submit the transaction. The schedule must have enough principal for one purchase. A schedule pause blocks that purchase. Liquidity, a price check, and a successful transaction are also required.

## One purchase

1. The swapper names the stablecoin, the route, and the schedule id.
2. The schedule spends the gross purchase amount in stablecoin.
3. The purchase venue receives that stablecoin. DOC purchases redeem through Money on Chain. USDRIF and USDT0 purchases swap through Uniswap.
4. The purchase fee is a share of the measured rBTC output. The fee is not taken from the stablecoin before the purchase.
5. The handler credits you with the buyer-net rBTC.

The screen shows the gross stablecoin cost and the buyer-net rBTC. The screen does not show an exact fee row.

## Where rBTC sits

Purchased rBTC stays in the handler until you claim it. One handler serves one stablecoin and one route. Schedules that share that pair add rBTC to the same balance.

## Where the stablecoin sits

| Route | What happens to waiting stablecoin |
| --- | --- |
| Idle | The handler holds it. It earns no lending yield. |
| LayerBank | The handler can lend it. |
| Sovryn | The handler can lend it. Sovryn is a DOC route only. |

## A principal example

This table follows principal only. It uses a gross purchase of 100 DOC and a 7-day cadence. It does not show a fee, a price, or an interest amount. An accrued-interest figure is not available.

| Due day | Principal before the purchase | Gross stablecoin spent |
| --- | --- | --- |
| Start | 1000 DOC | None |
| First due day | 1000 DOC | 100 DOC |
| Next due day | 900 DOC | 100 DOC |

If a due day is missed, that row does not run later as an extra purchase.

## Read next

- [Stablecoins and routes](/docs/getting-started/supported-assets)
- [Create a schedule](/docs/user-guide/create-schedule)
- [Fees](/docs/user-guide/fees)
