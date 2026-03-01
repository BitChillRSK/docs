---
sidebar_position: 6
---

# Fees

BitChill charges a small fee on each DCA purchase to sustain protocol operations.

## Fee Structure

BitChill uses a **sliding fee scale** based on purchase amount—larger purchases pay lower percentage fees.

### Fee Calculation

```
Fee % = interpolate(minFee, maxFee, purchaseAmount, lowerBound, upperBound)
```

| Parameter | Description |
|-----------|-------------|
| **Min Fee Rate** | Lowest fee % (for large purchases) |
| **Max Fee Rate** | Highest fee % (for small purchases) |
| **Lower Bound** | Purchase amount below which max fee applies |
| **Upper Bound** | Purchase amount above which min fee applies |

### Example Fee Schedule

| Purchase Amount | Fee Rate | Fee Paid |
|-----------------|----------|----------|
| 10 DOC | 1.0% | 0.10 DOC |
| 50 DOC | 0.75% | 0.375 DOC |
| 100 DOC | 0.5% | 0.50 DOC |
| 500 DOC | 0.3% | 1.50 DOC |

:::note
Actual fee parameters are set by protocol governance. The values above are illustrative.
:::

## When Fees Are Charged

Fees are deducted **at the time of each purchase**:

1. Purchase is triggered (period elapsed)
2. Stablecoins are redeemed from lending protocol
3. **Fee is calculated and deducted**
4. Remaining amount is swapped for rBTC
5. rBTC is credited to your schedule

**Example**:
```
Purchase amount: 100 DOC
Fee rate: 0.5%
Fee: 0.5 DOC
Net swap: 99.5 DOC → rBTC
```

## Fee Breakdown

| Fee Type | Percentage | Recipient |
|----------|------------|-----------|
| Protocol Fee | Variable | Fee Collector |
| Gas Costs | None | Paid by swapper |

- **Protocol Fee**: The sliding fee described above
- **Gas Costs**: You don't pay gas for automated purchases; the swapper wallet covers this

## Fee Destination

Collected fees go to the **Fee Collector** address, a protocol-controlled wallet used for:

- Protocol development
- Infrastructure costs (swapper gas, API hosting)
- Future rewards/incentives

## Comparing Costs

### BitChill vs. CEX DCA

| Cost | BitChill | Typical CEX |
|------|----------|-------------|
| Purchase Fee | 0.3-1.0% | 0.5-1.5% |
| Withdrawal Fee | Gas only (~$0.01) | Fixed fee ($5-20) |
| Custody | Non-custodial | Custodial |

### BitChill vs. Manual DCA

| Cost | BitChill | Manual Swaps |
|------|----------|--------------|
| Purchase Fee | 0.3-1.0% | DEX fee (0.3%) |
| Gas per Swap | Covered by protocol | ~$0.05-0.10 |
| Time Cost | Automated | Manual effort |
| Yield | Earning | Usually idle |

## Minimizing Fees

To reduce your effective fee rate:

1. **Larger Purchases**: Higher amounts get lower fee %
2. **Longer Periods**: Fewer purchases = fewer fees
3. **Yield Offset**: Interest earned helps offset fees

**Example Optimization**:
```
Strategy A: 25 DOC/week × 4 = 100 DOC, ~4% total fees
Strategy B: 100 DOC/month × 1 = 100 DOC, ~0.5% total fees
```

## No Hidden Fees

BitChill has **no**:
- ❌ Deposit fees
- ❌ Withdrawal fees (only gas)
- ❌ Schedule creation fees (only gas)
- ❌ Interest withdrawal fees (only gas)

The only fee is the purchase fee on swaps.

## Fee Transparency

All fees are:
- Defined in smart contracts
- Verifiable on-chain
- Applied consistently
- Visible before transactions

View current fee parameters on the [Contract Addresses](/docs/contracts/addresses) page.

## Next Steps

- [View contract architecture](/docs/contracts/architecture)
- [Review security audits](/docs/security/audits)
