---
sidebar_position: 3
---

# Contract addresses

The protocol contracts are not deployed.

There is no DcaManager address, no OperationsAdmin address, no handler address, no swapper address, and no fee-collector address for this protocol. Do not reuse an older deployment as this protocol.

Rootstock mainnet is chain ID 30. Rootstock testnet is chain ID 31. Neither network has this protocol deployment.

## Existing Rootstock tokens

A token address on this page is an existing Rootstock token. It is not a BitChill contract.

| Token | Address |
| --- | --- |
| USDT0 | `0x779Ded0c9e1022225f8E0630b35a9b54bE713736` |
| LayerBank USDRIF receipt | `0xc96fBD12bE56Dd565b258d243344bCf792A51128` |
| LayerBank USDT0 receipt | `0x6bE7d4cfCe825b106aa88F6916A412c5af230Ec0` |

USDT0 has 6 decimals. DOC and USDRIF have 18 decimals. This page does not publish a DOC address or a USDRIF address.

## Route index

| Index | Meaning in the deployment script |
| --- | --- |
| 0 | Idle. This route earns no lending yield. |
| 1 | LayerBank |
| 2 | Sovryn, for DOC |

The planned pairs are DOC idle, DOC LayerBank, DOC Sovryn, USDRIF idle, USDRIF LayerBank, USDT0 idle, and USDT0 LayerBank. Tropykus is not a route.

After a deployment exists, read the manager and the handler from that deployment record. These pages will name those contracts only when they are deployed.

## Read next

- [Integration notes](/docs/contracts/integration)
- [Supported tokens and routes](/docs/getting-started/supported-assets)
