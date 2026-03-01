---
sidebar_position: 1
---

# Audit Reports

BitChill has undergone rigorous independent security audits to ensure the safety of user funds and protocol integrity.

## Audit Summary

| Date | Auditor | Scope | Findings | Status |
|------|---------|-------|----------|--------|
| April 2025 | [Ivan Fitro](https://twitter.com/FitroIvan) | Full protocol review | 3 Medium, 4 Low, 2 Info | ✅ All Resolved |
| June 2025 | [Ivan Fitro](https://twitter.com/FitroIvan) | Mitigations + Uniswap V3 | 1 Low, 1 Info | ✅ All Resolved |

## Initial Audit (April 2025)

A comprehensive security review covering 11 core contracts.

### Contracts Reviewed

- AdminOperations.sol
- DcaManager.sol
- DcaManagerAccessControl.sol
- FeeHandler.sol
- PurchaseMoc.sol
- SovrynDocHandler.sol / SovrynDocHandlerMoc.sol
- TokenHandler.sol / TokenLending.sol
- TropykusDocHandler.sol / TropykusDocHandlerMoc.sol

### Findings

#### Medium Severity (All Resolved)

| ID | Issue | Resolution |
|----|-------|------------|
| M-01 | rBTC withdrawal to non-receiving contracts could fail | Added stuck funds recovery mechanism |
| M-02 | `withdrawAllAccumulatedRbtc()` could revert on zero balance | Added balance checks before withdrawal |
| M-03 | Fee frontrunning via purchase period manipulation | Restricted period changes with validation |

#### Low Severity (All Resolved)

| ID | Issue | Resolution |
|----|-------|------------|
| L-01 | Zero-balance schedule deletion issues | Added balance check before withdrawal attempt |
| L-02 | Schedule ID collisions possible | Implemented user-specific nonce for uniqueness |
| L-03 | DoS via excessive schedules | Added maximum schedule limit per user |
| L-04 | Unrestricted rBTC withdrawal from handlers | Added `onlyDcaManager` modifier |

#### Informational

- Gas optimization suggestions
- Code clarity improvements

📄 **[Download Full Report (PDF)](https://github.com/BitChillRSK/dca-contracts/blob/main/audits/2025-04-29-Ivan-Fitro.pdf)**

---

## Mitigation Review + Uniswap V3 (June 2025)

A follow-up audit verifying all previous findings were properly mitigated, plus a security review of the new Uniswap V3 swap integration.

### Additional Contracts Reviewed

- PurchaseUniswap.sol
- PurchaseRbtc.sol
- SovrynErc20HandlerDex.sol
- TropykusErc20HandlerDex.sol

### Findings

#### Low Severity (All Resolved)

| ID | Issue | Resolution |
|----|-------|------------|
| L-01 | Oracle price staleness check missing | Implemented `getPriceInfo()` validation with staleness threshold |

#### Informational

| ID | Issue | Resolution |
|----|-------|------------|
| I-01 | Immutable oracle address | Added owner-controlled oracle update function |

### Mitigation Verification

All 9 findings from the initial audit were verified as properly resolved:
- ✅ M-01: Stuck funds recovery implemented
- ✅ M-02: Balance checks added
- ✅ M-03: Period change restrictions added
- ✅ L-01 through L-04: All resolved as described

📄 **[Download Full Report (PDF)](https://github.com/BitChillRSK/dca-contracts/blob/main/audits/2025-06-02-Ivan-Fitro.pdf)**

---

## Auditor Background

**Ivan Fitro** is an independent security researcher specializing in smart contract audits with a proven track record of identifying vulnerabilities across blockchain protocols.

Since auditing BitChill, Ivan has:
- Joined [Pashov Audit Group](https://www.pashov.com/) (late 2025)
- Joined [OpenZeppelin](https://www.openzeppelin.com/) (March 2026)

This demonstrates that BitChill's smart contracts were reviewed by tier-1 security talent before their recognition by leading security firms.

---

## Audit Status

:::success All Findings Resolved
Every finding from both audits has been addressed and verified. The protocol has no known unresolved security issues.
:::

## Responsible Disclosure

If you discover a security vulnerability:

1. **Do NOT** disclose publicly
2. Contact us privately via Twitter DM: [@BitChillApp](https://x.com/BitChillApp)
3. Provide detailed reproduction steps
4. Allow reasonable time for remediation

We take security seriously and appreciate responsible disclosure.

## Source Code

All contracts are open source and available for review:

- GitHub: [BitChillRSK/dca-contracts](https://github.com/BitChillRSK/dca-contracts)
- Verified on [Rootstock Blockscout](https://rootstock.blockscout.com)
