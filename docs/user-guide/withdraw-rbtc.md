---
sidebar_position: 4
---

# Withdrawing rBTC

After BitChill executes purchases, your rBTC accumulates in the protocol until you withdraw it.

## Understanding the Pull Pattern

BitChill uses a **pull-based** withdrawal pattern:

- rBTC from purchases stays in the TokenHandler contract
- You decide when to withdraw
- Multiple purchases can accumulate before withdrawing
- No risk of failed transfers to your wallet

This design is safer than automatic transfers (push pattern) because:
- Contracts can't fail trying to send to incompatible wallets
- You control gas timing for withdrawals
- Reduces transaction complexity during swaps

## Checking Your Balance

Your accumulated rBTC is displayed on:

1. **Schedules Page**: Each schedule shows accumulated rBTC
2. **Dashboard**: Total accumulated across all schedules

The balance updates after each successful purchase.

## Withdrawing from a Single Schedule

To withdraw rBTC from one specific schedule:

1. Navigate to **Schedules**
2. Select the schedule with accumulated rBTC
3. Click **"Withdraw rBTC"**
4. Confirm the transaction in your wallet
5. rBTC is transferred to your wallet

## Withdrawing from All Schedules

To withdraw all accumulated rBTC at once:

1. Navigate to **Schedules** or **Dashboard**
2. Click **"Withdraw All rBTC"**
3. Confirm the transaction
4. All accumulated rBTC from all handlers is transferred

:::tip Gas Efficiency
If you have rBTC across multiple handlers (different stablecoins/protocols), withdrawing all at once is more gas-efficient than individual withdrawals.
:::

## Withdrawal Details

| Aspect | Details |
|--------|---------|
| **Minimum** | No minimum withdrawal |
| **Maximum** | Your full accumulated balance |
| **Destination** | Your connected wallet |
| **Gas Cost** | ~0.0002 rBTC per withdrawal |
| **Time** | Immediate (1 block confirmation) |

## After Withdrawal

Once withdrawn, your rBTC is:

- In your personal wallet
- Fully under your control
- Can be bridged to Bitcoin mainnet if desired

### Bridging to Bitcoin Mainnet

To convert rBTC to native BTC:

1. Use the [RSK Powpeg](https://app.rsk.co/powpeg/)
2. Follow the peg-out process
3. Receive BTC at your Bitcoin address

Note: Peg-out has minimum amounts and takes time for Bitcoin confirmations.

## Tax Considerations

Each rBTC purchase and withdrawal may be a taxable event depending on your jurisdiction. BitChill provides:

- **Purchase History**: Exportable record of all swaps
- **Timestamps**: When each purchase occurred
- **Amounts**: Stablecoins spent and rBTC received

Export your history from the **History** page for record-keeping.

## Troubleshooting

### Withdrawal Transaction Fails

- Ensure you have rBTC for gas
- Check that you have accumulated balance to withdraw
- Try increasing gas limit

### Balance Shows Zero

- Purchases may not have executed yet (check next purchase date)
- You may have already withdrawn
- Refresh the page to sync latest data

### rBTC Not in Wallet

- Confirm transaction was successful on [RSK Explorer](https://explorer.rsk.co)
- Add rBTC token to your wallet if not showing (native token, no address needed)
- Wait for block confirmation

## Next Steps

- [Learn how yield earning works](/docs/user-guide/earning-yield)
- [Understand the fee structure](/docs/user-guide/fees)
