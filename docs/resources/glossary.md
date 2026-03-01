---
sidebar_position: 2
---

# Glossary

### Accumulated rBTC
rBTC amount tracked per user in a specific token handler, withdrawable via DcaManager.

### APY
Annual Percentage Yield shown by lending protocols.

### DCA (Dollar Cost Averaging)
Buying a fixed amount periodically over time.

### DcaManager
Main BitChill contract for schedule management and user-facing actions.

### DOC
Dollar on Chain stablecoin on Rootstock.

### FeeHandler
Base module used by handlers to compute and transfer protocol fees.

### Handler
Concrete contract that combines token handling, optional lending integration, and purchase backend logic for a `(token, lendingProtocolIndex)` route.

### Interest (accrued)
Difference between user lending-backed value and DcaManager-locked principal for a token/protocol pair.

### iSUSD
Sovryn lending token used in DOC Sovryn-based handlers.

### kToken
Tropykus lending token (e.g., kDOC, kUSDRIF).

### Lending Protocol Index
Numeric identifier used by DcaManager/OperationsAdmin (0=no lending slot, 1=tropykus, 2=sovryn).

### MoC (Money on Chain)
Protocol used by DOC MoC handlers to redeem DOC for rBTC.

### OperationsAdmin
Registry + role management contract for handler routing and protocol indexes.

### Purchase Amount
Stablecoin amount deducted from schedule balance on each execution.

### Purchase Period
Configured seconds between purchases for a schedule, constrained by DcaManager minimum period. Frontend currently offers 1/2/4-week presets.

### Rootstock (RSK)
EVM-compatible Bitcoin sidechain where BitChill is deployed.

### rBTC
Native Rootstock token pegged to BTC.

### Schedule ID
Unique bytes32 identifier for a schedule, validated alongside schedule index.

### SWAPPER_ROLE
Role allowed to execute purchase functions in DcaManager.

### Token Balance (schedule)
Per-schedule stablecoin principal tracked in DcaManager.

### Uniswap V3
DEX backend used by DEX handlers for stablecoin -> WRBTC swap flow.

### WRBTC
ERC-20 wrapped rBTC token used in DEX swap operations before unwrapping for user withdrawal.
