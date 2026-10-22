# BitChill documentation

Documentation for the BitChill dollar-cost averaging protocol on Rootstock.

**Site**: [docs.bitchill.app](https://docs.bitchill.app)

## About this draft

These pages describe the new protocol. The protocol contracts are not deployed. No manual audit of this version is published. An audit is planned. The protocol is not deployed before that audit.

A schedule spends a gross stablecoin amount and buys rBTC. The purchase fee is taken in rBTC from the swap output. The user receives buyer-net rBTC. The idle route earns no lending yield.

The pages describe the full protocol and mark the initial launch separately. The initial launch supports DOC only, on the idle route (index 0) and the LayerBank route (index 1). The USDRIF and USDT0 DEX handlers are implemented and tested. The initial launch does not enable them. A reviewed configuration can enable them when Rootstock DEX liquidity is deep enough for the execution-quality rules. LayerBank is the only lending route at launch. Sovryn is not a launch route. Tropykus is not a route.

## Development

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm ci
```

### Local preview

```bash
npm start
```

The local server uses port 3000.

### Build

```bash
npm run build
```

The static site is written to `build`. Do not run the deploy script for this draft.

## Page map

```text
docs/
├── intro.md
├── getting-started/
├── user-guide/
├── contracts/
├── security/
└── resources/
```

## Links

- Website: [bitchill.app](https://bitchill.app)
- GitHub: [BitChillRSK](https://github.com/BitChillRSK)
- Twitter: [@BitChillApp](https://x.com/BitChillApp)

## License

MIT
