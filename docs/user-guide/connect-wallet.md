---
sidebar_position: 1
---

# Prepare a Rootstock wallet

These pages describe the new protocol. Its contracts are not deployed. You cannot open a schedule on these contracts yet. You can still add Rootstock to a wallet so the account is ready.

The site navigation can link to the BitChill app. That link is not a deployment of the contracts in these pages.

## Wallets

A Rootstock wallet can be any wallet that supports chain ID 30. Common choices are Rabby, MetaMask, Defiant, a hardware wallet through a compatible application, and a WalletConnect wallet.

## Network values

| Setting | Value |
| --- | --- |
| Network name | Rootstock Mainnet |
| RPC URL | `https://public-node.rsk.co` |
| Chain ID | 30 |
| Currency symbol | RBTC |
| Block explorer | `https://explorer.rsk.co` |

## Add the network in MetaMask

1. Open the network list.
2. Choose to add a network manually.
3. Enter the values in the table.
4. Save the network.

## What the account needs later

| Asset | Use |
| --- | --- |
| rBTC | Gas for a transaction you send |
| DOC, USDRIF, or USDT0 | The stablecoin a schedule spends |

rBTC is the native asset. Hold a balance for gas. A bridge or an exchange does not promise a cost-free 1:1 conversion.

## If the wallet fails

1. Confirm the selected network is chain ID 30.
2. Refresh the page.
3. Retry with another wallet.
4. For a failed transaction, confirm that the account has rBTC for gas and enough stablecoin for the amount you entered.

## Read next

- [Create a schedule](/docs/user-guide/create-schedule)
- [Fees](/docs/user-guide/fees)
