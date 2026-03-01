---
sidebar_position: 1
---

# Frequently Asked Questions

## General

### What is BitChill?

BitChill is a decentralized DCA (Dollar Cost Averaging) protocol on Rootstock that lets you automatically accumulate Bitcoin (rBTC) by depositing stablecoins. Your funds earn yield while waiting to be converted.

### Why should I use BitChill instead of manual DCA?

- **Automation**: No need to remember to buy each week
- **Yield**: Your stablecoins earn interest while waiting
- **Non-custodial**: You keep control of your funds
- **Transparent**: Everything happens on-chain

### Is BitChill safe to use?

BitChill contracts are open source and have been audited twice by independent security researchers. However, as with any DeFi protocol, there are inherent risks. See our [Security Model](/docs/security/security-model) for details.

## Supported Assets

### Which tokens can I use?

Current mainnet deployment supports:

- **DOC** (Dollar on Chain)
- **USDRIF**

See the [active handler matrix](/docs/getting-started/supported-assets#active-handler-matrix).

### Which lending protocols are integrated?

| Stablecoin | Available Lending Protocols |
|------------|----------------------------|
| DOC | Tropykus, Sovryn |
| USDRIF | Tropykus |

### How do I get DOC or USDRIF?

- **DOC**: Mint at [Money on Chain](https://app.moneyonchain.com) or swap on [Sovryn](https://sovryn.app)
- **USDRIF**: Acquire through the RIF ecosystem or swap on Rootstock DEXes

## Using BitChill

### How often can purchases run?

The app offers three presets:
- Weekly (every 1 week)
- Bi-weekly (every 2 weeks)
- Monthly (every 4 weeks)

The contract enforces a configurable minimum period in seconds.

### What is the minimum purchase amount?

The minimum is configurable per token by the protocol owner. Check the current value with `getTokenMinPurchaseAmount(token)`.

Additionally, your purchase amount must satisfy: `purchaseAmount <= balance / 2`

### Can I have multiple schedules?

Yes! You can have up to `maxSchedulesPerToken` schedules for each token. This lets you run different strategies simultaneously.

### Can I modify my schedule after creating it?

Yes, you can:
- Add more funds (top up)
- Withdraw partial funds
- Update purchase amount (within validation rules)
- Update purchase period
- Delete the schedule entirely

### What happens when my schedule runs out of funds?

Purchases simply stop until you add more funds. Your schedule remains active and will resume once you deposit more stablecoins.

## Yield & Interest

### How do I earn yield?

Your stablecoins are automatically deposited into the lending protocol you selected (Tropykus or Sovryn). You earn interest on your full balance, including funds waiting to be swapped.

### How do I withdraw my interest?

Interest is tracked separately from your principal. Use these functions:
- `withdrawAllAccumulatedInterest`: Get interest from all handlers
- `withdrawTokenAndInterest`: Withdraw both principal and interest

**Important**: Deleting a schedule or withdrawing tokens does NOT automatically include interest.

### What APY can I expect?

Yields vary based on market conditions and lending protocol utilization. Check current rates on [Tropykus](https://app.tropykus.com) or [Sovryn](https://sovryn.app).

## Fees

### What fees does BitChill charge?

BitChill uses a configurable fee model that can be:
- **Flat**: Same percentage regardless of purchase amount
- **Sliding scale**: Lower fees for larger purchases

Current defaults are set by the protocol owner. Fees are deducted from each purchase before swapping.

### Who pays gas for automated purchases?

The BitChill swapper infrastructure pays gas for automated purchase execution. You only pay gas for your own transactions (creating schedules, withdrawing, etc.).

## Withdrawals

### How do I withdraw my rBTC?

BitChill uses a "pull" pattern. Your purchased rBTC accumulates in handler contracts until you withdraw:

- **Single handler**: `withdrawRbtcFromTokenHandler`
- **All handlers**: `withdrawAllAccumulatedRbtc`

### Is rBTC tracked per schedule?

**No.** rBTC is tracked per user per handler (token + lending protocol combination). If you have multiple DOC+Tropykus schedules, the rBTC accumulates together.

### Do I need to delete my schedule to withdraw?

No! You can withdraw rBTC at any time without affecting your active schedules.

## Technical & Security

### Are the contracts upgradeable?

Core BitChill contracts are **not** proxy-upgradeable. New features are introduced through new deployments and handler registrations.

### Where are the contracts deployed?

See [Contract Addresses](/docs/contracts/addresses) for the full list.

### Where can I review the audits?

Audit reports are publicly available: [Audit Reports](/docs/security/audits)

### I found a bug. How do I report it?

For security issues, please report privately via:
- Twitter: [@BitChillApp](https://x.com/BitChillApp)

For non-sensitive issues:
- [GitHub Issues](https://github.com/BitChillRSK/dca-contracts/issues)
