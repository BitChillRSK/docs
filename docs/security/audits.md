---
sidebar_position: 1
---

# Audit Reports

BitChill smart contracts have undergone independent security reviews to ensure the safety of user funds.

## Audit Summary

| Date | Auditor | Scope | Findings | Status |
|------|---------|-------|----------|--------|
| April 2025 | Ivan Fitro | Core protocol | 3 Medium, 4 Low, 2 Info | All Addressed |
| June 2025 | Ivan Fitro | Mitigations + Uniswap V3 | 1 Low, 1 Info | All Addressed |

## Download Reports

Full audit reports are publicly available:

- [April 2025 Audit Report (PDF)](https://github.com/BitChillRSK/dca-contracts/blob/main/audits/2025-04-29-Ivan-Fitro.pdf)
- [June 2025 Audit Report (PDF)](https://github.com/BitChillRSK/dca-contracts/blob/main/audits/2025-06-02-Ivan-Fitro.pdf)

## First Audit: April 2025

### Scope

The initial audit reviewed the core protocol architecture:

- **DcaManager**: Schedule management, access control, user interactions
- **OperationsAdmin**: Handler registry, role management
- **Handler Architecture**: Token handlers with lending integration
- **FeeHandler**: Fee calculation and distribution logic

### Key Findings & Resolutions

| ID | Severity | Finding | Resolution |
|----|----------|---------|------------|
| M-01 | Medium | rBTC withdrawal to non-receiving contracts | Added stuck funds recovery |
| M-02 | Medium | `withdrawAllAccumulatedRbtc()` revert conditions | Added balance checks |
| M-03 | Medium | Fee frontrunning via purchase period manipulation | Restricted period changes |
| L-01 | Low | Zero-balance schedule deletion | Added balance check before withdrawal |
| L-02 | Low | Schedule ID collisions | Implemented user-specific nonce |
| L-03 | Low | DoS via excessive schedules | Added schedule limit per user |
| L-04 | Low | Unrestricted rBTC withdrawal | Added `onlyDcaManager` modifier |

## Second Audit: June 2025

### Scope

The follow-up audit reviewed:

- Mitigations for all findings from the first audit
- New Uniswap V3 integration for USDRIF handlers
- Oracle slippage protection implementation

### Key Findings & Resolutions

| ID | Severity | Finding | Resolution |
|----|----------|---------|------------|
| L-01 | Low | Oracle price staleness check | Implemented `getPriceInfo()` validation |
| I-01 | Info | Immutable oracle address | Added owner-controlled oracle update function |

## Auditor Background

At the time of conducting BitChill's audits **Ivan Fitro** was an independent smart contract security researcher with extensive experience auditing DeFi protocols. He later joined **Pashov Audit Group** in late 2025 and **OpenZeppelin** in March of 2026.

## Ongoing Security

Security is an ongoing commitment. BitChill continues to:

- Monitor for new vulnerability disclosures
- Update dependencies when security patches are released
- Engage with the security community

## Responsible Disclosure

If you discover a potential security issue, please report it responsibly:

**For security vulnerabilities (report privately):**
- Twitter DM: [@BitChillApp](https://x.com/BitChillApp)

**For non-sensitive technical issues:**
- [GitHub Issues](https://github.com/BitChillRSK/dca-contracts/issues)

We appreciate the security community's efforts to keep BitChill safe.
