---
sidebar_position: 1
---

# Frequently Asked Questions

Common questions about using BitChill.

## General

### What is BitChill?

BitChill is a decentralized Dollar Cost Averaging (DCA) protocol on Rootstock. It lets you automatically accumulate Bitcoin by depositing stablecoins and executing periodic purchases, while earning yield on your deposits.

### What is DCA (Dollar Cost Averaging)?

DCA is an investment strategy where you invest a fixed amount at regular intervals, regardless of price. This reduces the impact of volatility and removes the stress of trying to time the market.

### Why use BitChill instead of a centralized exchange?

| BitChill | Centralized Exchange |
|----------|---------------------|
| Non-custodial (you control funds) | Custodial (exchange holds funds) |
| Earn yield while waiting | Funds sit idle |
| Transparent on-chain execution | Opaque backend |
| No KYC required | Usually requires KYC |
| Available 24/7 | May have maintenance windows |

### Is BitChill custodial?

No. BitChill is fully non-custodial. Your funds are held in smart contracts that only you can access. No one, including the BitChill team, can move or withdraw your funds.

---

## Using BitChill

### What tokens can I deposit?

Currently supported stablecoins:
- **DOC** (Dollar on Chain) - Bitcoin-backed stablecoin
- **USDRIF** - RIF ecosystem stablecoin

### What do I receive in return?

Your stablecoins are periodically swapped for **rBTC** (Rootstock Bitcoin), which is pegged 1:1 to BTC. You can later bridge rBTC to Bitcoin mainnet if desired.

### How often are purchases made?

You choose from three periods:
- **1 week** - Weekly purchases
- **2 weeks** - Bi-weekly purchases
- **4 weeks** - Monthly purchases

### What's the minimum deposit?

There's no strict minimum deposit, but your purchase amount must meet the protocol minimum (approximately $1 equivalent). Make sure your deposit is at least 2x your purchase amount.

### Can I have multiple schedules?

Yes! You can create multiple schedules with different:
- Stablecoins (DOC vs USDRIF)
- Lending protocols (Tropykus vs Sovryn)
- Purchase amounts and periods

---

## Yield & Lending

### How does yield earning work?

Your deposited stablecoins are placed in lending protocols (Tropykus or Sovryn) where they earn interest from borrowers. This interest accrues continuously and compounds your purchasing power.

### What APY can I expect?

APY varies based on lending market conditions. Check current rates on:
- [Tropykus](https://tropykus.com/)
- [Sovryn](https://sovryn.com/)

### Can I withdraw just the interest?

Yes! You can withdraw accrued interest separately without affecting your DCA schedule.

### Is there any risk to earning yield?

Yes, there are smart contract and economic risks associated with lending protocols. While Tropykus and Sovryn are established protocols, no DeFi protocol is risk-free.

---

## Fees

### What fees does BitChill charge?

BitChill charges a fee on each purchase (not on deposits or withdrawals). The fee uses a sliding scale:
- Larger purchases = lower percentage fee
- Smaller purchases = higher percentage fee

### Are there any hidden fees?

No hidden fees. You only pay:
- Protocol fee on purchases
- Network gas fees for transactions

### Who pays gas for automatic purchases?

The protocol covers gas costs for automated purchases. You only pay gas for your own actions (create, deposit, withdraw).

---

## Withdrawals

### How do I get my rBTC?

After purchases execute, your rBTC accumulates in the protocol. Click "Withdraw rBTC" to transfer it to your wallet anytime.

### Why doesn't rBTC go directly to my wallet?

BitChill uses a "pull" pattern where you withdraw when ready. This is safer than automatic transfers, which can fail if your wallet can't receive rBTC.

### Can I withdraw my stablecoins before they're swapped?

Yes! You can withdraw part or all of your stablecoin balance at any time. You'll also receive any accrued interest.

### How do I bridge rBTC to Bitcoin?

Use the [RSK Powpeg](https://app.rsk.co/powpeg/) to convert rBTC to native BTC on the Bitcoin blockchain.

---

## Security

### Has BitChill been audited?

Yes! BitChill has completed two security audits by Ivan Fitro (now at OpenZeppelin):
- April 2025: Full protocol review
- June 2025: Mitigation review + Uniswap V3 integration

All findings have been resolved. [View audit reports →](/docs/security/audits)

### Are the contracts upgradeable?

No. BitChill contracts are immutable (non-upgradeable) by design. This means the code can't be changed after deployment, providing strong security guarantees.

### What happens if there's a bug?

For critical issues:
1. Some operations can be paused
2. Users can always withdraw their funds
3. Migration to new contracts may be needed for fixes

### How do I report a security issue?

Please disclose responsibly via Twitter DM to [@BitChillApp](https://x.com/BitChillApp). Do not disclose publicly before we have a chance to address it.

---

## Technical

### What blockchain is BitChill on?

BitChill runs on [Rootstock (RSK)](https://rootstock.io/), a Bitcoin sidechain with smart contract capabilities. RSK is secured by ~60% of Bitcoin's hashpower through merge-mining.

### What wallet do I need?

Any Web3 wallet that supports Rootstock:
- Defiant (recommended)
- MetaMask (add RSK network manually)
- Any WalletConnect-compatible wallet

### How do I add Rootstock to MetaMask?

Network settings:
- **Network Name**: Rootstock Mainnet
- **RPC URL**: `https://public-node.rsk.co`
- **Chain ID**: 30
- **Currency Symbol**: RBTC
- **Explorer**: `https://explorer.rsk.co`

### Where can I get DOC or USDRIF?

- **DOC**: Mint via [Money on Chain](https://moneyonchain.com/) or swap on Rootstock DEXes
- **USDRIF**: Available on [RIF on Chain](https://rif.moneyonchain.com/)

---

## Still Have Questions?

- Twitter: [@BitChillApp](https://x.com/BitChillApp)
- GitHub: [BitChillRSK](https://github.com/BitChillRSK)
