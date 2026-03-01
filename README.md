# BitChill Documentation

Official documentation for the BitChill DCA protocol on Rootstock.

**Live Site**: [docs.bitchill.app](https://docs.bitchill.app)

## About BitChill

BitChill is a decentralized Dollar Cost Averaging (DCA) protocol built on Rootstock that enables users to automatically accumulate Bitcoin (rBTC) by depositing stablecoins and executing periodic purchases.

Key features:
- **Automated DCA**: Set your schedule once and let BitChill handle the rest
- **Yield Earning**: Stablecoins earn yield in Tropykus/Sovryn while waiting
- **Non-Custodial**: Full control of your funds at all times
- **Audited**: Independent security audits completed

## Development

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This starts a local development server at `http://localhost:3000`. Most changes are reflected live without needing to restart.

### Build

```bash
npm run build
```

Generates static content in the `build` directory for deployment.

## Documentation Structure

```
docs/
├── intro.md                    # What is BitChill?
├── getting-started/            # How DCA works, supported assets
├── user-guide/                 # Connect wallet, create schedules, etc.
├── contracts/                  # Smart contract architecture & addresses
├── security/                   # Audit reports & security model
└── resources/                  # FAQ, glossary, links
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Links

- **Website**: [bitchill.app](https://bitchill.app)
- **App**: [dca.bitchill.app](https://dca.bitchill.app)
- **GitHub**: [BitChillRSK](https://github.com/BitChillRSK)
- **Twitter**: [@BitChillApp](https://x.com/BitChillApp)

## License

MIT
