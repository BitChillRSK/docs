---
sidebar_position: 1
---

# Architecture Overview

BitChill's smart contract architecture is designed for modularity, security, and extensibility.

## System Diagram

```mermaid
flowchart TB
    subgraph Users [User Layer]
        User[User Wallet]
        FE[BitChill dApp]
    end
    
    subgraph Protocol [BitChill Protocol]
        DCA[DcaManager Contract]
        TH[Token Handlers]
        FH[FeeHandler]
        TH --- FH
    end
    
    subgraph Lending [Lending Protocols]
        Tropykus[Tropykus]
        Sovryn[Sovryn]
    end
    
    subgraph DEX [DEX Layer]
        UniV3[Uniswap V3]
        MoC[Money on Chain]
    end
    
    User -->|"1. Deposit stablecoins"| FE
    FE --> DCA
    DCA --> TH
    TH -->|"2. Earn yield"| Lending
    TH -->|"3. Periodic swap"| DEX
    DEX -->|"4. rBTC stored"| TH
    TH -->|"5. User withdraws"| User
```

## Contract Hierarchy

```mermaid
flowchart TD
    DcaManager --> OperationsAdmin
    DcaManager --> TokenHandlers
    
    subgraph TokenHandlers [Token Handlers]
        TropykusDocHandlerMoc
        SovrynDocHandlerMoc
        TropykusErc20HandlerDex
        SovrynErc20HandlerDex
    end
    
    TokenHandlers --> FeeHandler
    TokenHandlers --> TokenLending
    TokenHandlers --> PurchaseMethod
    
    subgraph PurchaseMethod [Purchase Methods]
        PurchaseMoc
        PurchaseUniswap
    end
```

## Core Components

### DcaManager

The main entry point for all user interactions. Responsibilities:

- Creating, updating, and deleting DCA schedules
- Managing deposits and withdrawals
- Coordinating with TokenHandlers for operations
- Enforcing schedule limits and validation rules

### OperationsAdmin

Administrative contract managing protocol configuration:

- Token handler registry (maps token + protocol → handler)
- Role management (ADMIN_ROLE, SWAPPER_ROLE)
- Lending protocol registry

### Token Handlers

Specialized contracts for each stablecoin + lending protocol combination:

| Handler | Stablecoin | Lending | Swap Method |
|---------|------------|---------|-------------|
| TropykusDocHandlerMoc | DOC | Tropykus | Money on Chain |
| SovrynDocHandlerMoc | DOC | Sovryn | Money on Chain |
| TropykusErc20HandlerDex | USDRIF | Tropykus | Uniswap V3 |
| SovrynErc20HandlerDex | DOC/USDRIF | Sovryn | Uniswap V3 |

### FeeHandler

Base contract inherited by all handlers, implementing:

- Sliding fee scale calculation
- Fee parameter storage
- Fee collection logic

## Inheritance Structure

```
Ownable (OpenZeppelin)
    └── FeeHandler
        └── TokenHandler
            └── TokenLending (Tropykus/Sovryn)
                └── PurchaseRbtc
                    └── PurchaseMoc / PurchaseUniswap
                        └── Concrete Handler
```

## Data Flow

### Deposit Flow

```mermaid
sequenceDiagram
    participant User
    participant DcaManager
    participant TokenHandler
    participant LendingProtocol
    
    User->>DcaManager: createDcaSchedule()
    DcaManager->>User: transferFrom(stablecoins)
    DcaManager->>TokenHandler: depositToken()
    TokenHandler->>LendingProtocol: mint(stablecoins)
    LendingProtocol-->>TokenHandler: kTokens/iSUSD
    TokenHandler-->>DcaManager: success
    DcaManager-->>User: Schedule created
```

### Purchase Flow

```mermaid
sequenceDiagram
    participant Swapper
    participant DcaManager
    participant TokenHandler
    participant LendingProtocol
    participant DEX
    
    Swapper->>DcaManager: batchBuyRbtc()
    DcaManager->>TokenHandler: buyRbtc()
    TokenHandler->>LendingProtocol: redeem(kTokens)
    LendingProtocol-->>TokenHandler: stablecoins
    TokenHandler->>TokenHandler: calculateFee()
    TokenHandler->>DEX: swap(stablecoins)
    DEX-->>TokenHandler: rBTC
    TokenHandler-->>DcaManager: Purchase complete
```

### Withdrawal Flow

```mermaid
sequenceDiagram
    participant User
    participant DcaManager
    participant TokenHandler
    
    User->>DcaManager: withdrawRbtcFromTokenHandler()
    DcaManager->>TokenHandler: withdrawAccumulatedRbtc()
    TokenHandler->>User: transfer(rBTC)
```

## Security Model

### Access Control

| Role | Permissions |
|------|-------------|
| **Owner** | Deploy, configure protocol parameters |
| **ADMIN_ROLE** | Manage handlers, assign swapper role |
| **SWAPPER_ROLE** | Execute batch purchases |
| **Users** | Manage own schedules only |

### Protection Mechanisms

- **ReentrancyGuard**: All external calls protected
- **Schedule ID Validation**: Prevents index manipulation attacks
- **onlyDcaManager**: TokenHandler functions restricted
- **SafeERC20**: Safe token transfers throughout

## Extensibility

The architecture supports adding:

- **New Stablecoins**: Deploy new TokenHandler
- **New Lending Protocols**: Create new TokenLending implementation
- **New Swap Methods**: Create new Purchase implementation
- **New Chains**: Deploy full contract suite (future)

## Next Steps

- [Explore core contracts in detail](/docs/contracts/core-contracts)
- [View deployed addresses](/docs/contracts/addresses)
