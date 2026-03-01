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

| Severity | Finding | Resolution |
|----------|---------|------------|
| Medium | Fee calculation edge cases | Fixed with improved bounds checking |
| Medium | Reentrancy vectors in handlers | Added ReentrancyGuard to all handlers |
| Medium | Role management gaps | Strengthened access control checks |
| Low | Gas optimization opportunities | Implemented where practical |
| Info | Documentation improvements | Updated NatSpec and documentation |

## Second Audit: June 2025

### Scope

The follow-up audit reviewed:

- Mitigations for all findings from the first audit
- New Uniswap V3 integration for USDRIF handlers
- Oracle slippage protection implementation

### Key Findings & Resolutions

| Severity | Finding | Resolution |
|----------|---------|------------|
| Low | Minor oracle edge case | Added additional validation |
| Info | Code style suggestions | Applied where appropriate |

## Auditor Background

**Ivan Fitro** is an independent smart contract security researcher with experience auditing DeFi protocols. His work focuses on Solidity security, access control, and economic attack vectors.

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
