---
sidebar_position: 4
---

# Withdrawing rBTC

As your DCA schedule executes purchases, rBTC accumulates in the handler contracts. You can withdraw your rBTC at any time.

## Understanding rBTC Accumulation

BitChill uses a **pull-based withdrawal pattern**. This means:

- Purchased rBTC stays in handler contracts until you withdraw
- You control when to take custody of your Bitcoin
- Withdrawals are independent from your active schedules

### Important: rBTC Tracking

Your accumulated rBTC is tracked **per handler**, not per schedule:

```
Handler = Token + Lending Protocol
```

For example:
- All your DOC + Tropykus schedules → combined rBTC in one handler
- All your DOC + Sovryn schedules → combined rBTC in another handler

This means if you have 3 schedules with DOC + Tropykus, the rBTC from all of them accumulates together.

## Checking Your Balance

Before withdrawing, you can check your accumulated rBTC balance:

1. Go to the BitChill app dashboard
2. View your accumulated rBTC per handler
3. Or check on-chain using the handler's `getAccumulatedRbtcBalance(address)` function

## Withdrawal Methods

### Option 1: Withdraw from Specific Handler

Use when you want to withdraw from a specific token + lending protocol combination:

```solidity
withdrawRbtcFromTokenHandler(token, lendingProtocolIndex)
```

**Example**: Withdraw rBTC from your DOC + Tropykus handler.

### Option 2: Withdraw from All Handlers

Use to withdraw all accumulated rBTC across multiple handlers at once:

```solidity
withdrawAllAccumulatedRbtc(tokens[], lendingProtocolIndexes[])
```

**Example**: Withdraw from both DOC + Tropykus and USDRIF + Tropykus in one transaction.

The function iterates through each combination and withdraws where your balance is non-zero.

## Step-by-Step Withdrawal

1. **Connect Wallet**: Ensure your wallet is connected to BitChill
2. **Navigate to Withdraw**: Go to your dashboard or schedules page
3. **Select Handler(s)**: Choose which handlers to withdraw from
4. **Review Amount**: Check the rBTC amount to be withdrawn
5. **Confirm Transaction**: Approve the withdrawal in your wallet
6. **Receive rBTC**: rBTC is sent to your wallet address

## Technical Notes

### WRBTC Unwrapping

For Uniswap-based handlers (USDRIF), the swap produces WRBTC (wrapped rBTC). The withdrawal process automatically unwraps WRBTC to native rBTC before sending to you.

### Zero Balance Handling

- `withdrawAllAccumulatedRbtc` skips handler combinations where your balance is zero.
- `withdrawRbtcFromTokenHandler` can revert if there is no accumulated rBTC for that specific handler.

### Schedule Independence

Withdrawing rBTC does **not** affect your active schedules:
- Your schedules continue running
- Your stablecoin balance remains unchanged
- Only the accumulated rBTC is withdrawn

### Deleting Schedules

Deleting a schedule does **not** automatically withdraw your rBTC. Always withdraw your rBTC before or after deleting schedules.

## Transaction Costs

Withdrawing rBTC requires network gas paid by the caller. Exact cost depends on Rootstock conditions and the withdrawal path (single handler vs multi-handler).

## Bridging to Bitcoin

After withdrawing rBTC, you can bridge it to Bitcoin mainnet using the [Powpeg](https://app.rsk.co/powpeg).

## Next Steps

- [Manage your schedules](/docs/user-guide/manage-schedules)
- [Understanding fees](/docs/user-guide/fees)
- [FAQ](/docs/resources/faq)
