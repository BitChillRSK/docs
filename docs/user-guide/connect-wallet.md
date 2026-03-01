---
sidebar_position: 1
---

# Connecting Your Wallet

To use BitChill, you'll need a Web3 wallet configured for Rootstock.

## Supported Wallets

BitChill supports multiple connection methods:

- **Rabby** (recommended - most users connect via Rabby)
- **MetaMask**
- **Defiant** (optimized for Rootstock)
- **Ledger** (via MetaMask or other compatible wallets)
- **WalletConnect** - any WalletConnect-compatible wallet

## Configuring Your Wallet for Rootstock

If your wallet doesn't automatically detect Rootstock, add it manually:

### Network Configuration

| Setting | Value |
|---------|-------|
| Network Name | Rootstock Mainnet |
| RPC URL | `https://public-node.rsk.co` |
| Chain ID | 30 |
| Currency Symbol | RBTC |
| Block Explorer | `https://explorer.rsk.co` |

### Adding Rootstock to MetaMask

1. Open MetaMask and click the network dropdown
2. Click "Add Network" → "Add a network manually"
3. Enter the network details from the table above
4. Click "Save"

## Connecting to BitChill

1. **Visit the App**: Go to [dca.bitchill.app](https://dca.bitchill.app)

2. **Click Connect**: Click the "Connect Wallet" button in the top right corner

3. **Select Your Wallet**: Choose your wallet (Rabby, MetaMask, WalletConnect, etc.)

4. **Approve Connection**: Confirm the connection request in your wallet

5. **Switch Network**: If prompted, approve switching to Rootstock network

Once connected, you'll see your wallet address in the header and can start creating DCA schedules.

## Required Funds

Before creating a schedule, ensure you have:

| Token | Purpose |
|-------|---------|
| **rBTC** | Gas fees for transactions |
| **DOC or USDRIF** | Stablecoins to deposit into your DCA schedule |

:::tip Gas Estimation
Most BitChill transactions require approximately 0.0001-0.001 rBTC in gas fees. Keep a small rBTC balance for operations like creating schedules, depositing, and withdrawing.
:::

## Troubleshooting

### Wallet Won't Connect

- Ensure you're on a supported network
- Try refreshing the page
- Clear your browser cache
- Try a different wallet

### Wrong Network

If you see a "Wrong Network" message:
1. Click the network switch prompt
2. Approve the network change in your wallet
3. If manual switching is needed, configure Rootstock as shown above

### Transaction Fails

- Ensure you have enough rBTC for gas
- Check that your stablecoin balance is sufficient
- Try increasing gas limit if transactions time out

## Next Steps

Once connected:
- [Create your first DCA schedule](/docs/user-guide/create-schedule)
- [Learn about fees](/docs/user-guide/fees)
