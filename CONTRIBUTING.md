# Contributing to Red Hat Actions Common

Thank you for your interest in contributing to the Red Hat GitHub Actions project!

## Getting Started

1. **Open an issue first** — before submitting a non-trivial pull request, please [open an issue](https://github.com/redhat-actions/common/issues) to discuss the change.
2. **Fork the repository** and create a feature branch from `main`.
3. Make your changes, following the conventions below.
4. Submit a pull request against `main`.

## Repository Structure

This is a monorepo containing several components:

| Component | Type | Description |
|-----------|------|-------------|
| [action-io-generator](./action-io-generator) | npm package + Docker Action | Generates TypeScript enums from `action.yml` inputs/outputs |
| [bundle-verifier](./bundle-verifier) | JavaScript Action | Verifies committed dist bundles are up-to-date |
| [commit-data](./commit-data) | Docker Action | Extracts HEAD commit metadata as action outputs |
| [config-files](./config-files) | npm packages | Shared TypeScript, ESLint, and Webpack configurations |

## Development

### Prerequisites

- Node.js 20+
- npm

### Common Commands

Each JavaScript component uses the same npm script conventions:

```sh
npm ci                # Install dependencies
npm run compile       # Compile TypeScript
npm run bundle        # Build distribution bundle
npm run lint          # Run ESLint (--max-warnings=0)
npm run clean         # Remove build artifacts
```

### Bundle Verification

JavaScript actions commit their bundled `dist/` directory. After making source changes:

1. Run `npm run bundle` to regenerate the dist.
2. Commit the updated `dist/` alongside your source changes.
3. CI will verify the committed bundle matches a fresh build.

### Config Files

The shared config packages (`@redhat-actions/tsconfig`, `@redhat-actions/eslint-config`, `@redhat-actions/webpack-config`) are consumed by other repos in the `redhat-actions` organization. Changes to these packages affect all downstream consumers — please consider backwards compatibility.

## Code Style

- TypeScript with strict mode enabled
- 4-space indentation, double quotes, 120-character line limit
- ESLint with the shared `@redhat-actions/eslint-config`
- See [config-files/eslint](./config-files/eslint) for the full ruleset

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
