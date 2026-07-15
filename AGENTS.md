# AI Agent Guide

This document helps AI coding agents understand and work with this repository effectively.

## Repository Overview

This is a monorepo for shared GitHub Actions and configuration used by the [Red Hat GitHub Actions](https://github.com/redhat-actions) organization. It contains four components that are independently developed but share a common repository.

## Components

### action-io-generator (`./action-io-generator/`)

An npm package and Docker-based GitHub Action that reads an `action.yml` file and generates TypeScript enums for its inputs and outputs.

- **Language:** TypeScript
- **Bundler:** Webpack (shared config from `config-files/webpack`)
- **Entry point:** `src/index.ts` (library), `bin.js` (CLI)
- **Key commands:**
  ```sh
  cd action-io-generator
  npm ci
  npm run lint          # ESLint with --max-warnings=0
  npm run compile       # tsc -p .
  npm run bundle        # Webpack production build + copy bin.js to dist/
  npm run test-cli      # Generate enums from test/test.action.yml
  ```
- **Important:** The `dist/` directory is committed. After source changes, run `npm run bundle` and commit the updated dist.

### bundle-verifier (`./bundle-verifier/`)

A JavaScript GitHub Action that verifies a committed distribution bundle matches a fresh build from source.

- **Language:** TypeScript
- **Bundler:** `@vercel/ncc`
- **Runtime:** Node.js (specified in `action.yml` `runs.using`)
- **Key commands:**
  ```sh
  cd bundle-verifier
  npm ci
  npm run compile       # tsc -p .
  npm run bundle        # ncc build src/index.ts --source-map --minify
  ```
- **Important:** The `dist/` directory is committed. After source changes, run `npm run bundle` and commit the updated dist.

### commit-data (`./commit-data/`)

A Docker-based GitHub Action that extracts commonly needed data about the HEAD commit (branch, SHA, tags, PR info).

- **Language:** Shell (bash)
- **Container:** Alpine Linux with git
- **Entry point:** `entrypoint.sh`
- **No build step required** — changes to `entrypoint.sh` or `Dockerfile` take effect directly.
- **Outputs are set via:** `echo "name=value" >> "$GITHUB_OUTPUT"`

### config-files (`./config-files/`)

Shared npm configuration packages consumed by other `redhat-actions` repos:

| Package | Purpose |
|---------|---------|
| `@redhat-actions/tsconfig` | Base TypeScript configuration |
| `@redhat-actions/eslint-config` | ESLint rules (extends airbnb-base + typescript-eslint) |
| `@redhat-actions/webpack-config` | Webpack 5 config factory for bundling actions |

These are published to npm and have downstream consumers. Changes here affect all repos that depend on them.

## Code Conventions

- **TypeScript strict mode** is enabled across all components
- **4-space indentation**, double quotes, 120-character max line length
- **Stroustrup brace style** (`else` on new line)
- **ESLint** with `@redhat-actions/eslint-config` — run with `--max-warnings=0`
- **No default exports** — use named exports
- **Explicit return types** on functions

## CI Workflows

Located in `.github/workflows/`:

| Workflow | What it tests |
|----------|---------------|
| `ci-action-io-generator.yml` | Lint, bundle verification, compile + CLI test |
| `ci-commit-data.yml` | Runs the commit-data action and echoes outputs |
| `verify-verifier.yml` | Bundle-verifier verifies its own dist is current |

## Making Changes

1. **Source changes to actions:** Edit TypeScript source, then run `npm run bundle` to regenerate `dist/`. Commit both source and dist changes together.
2. **Config file changes:** Edit the config, bump the version in `package.json`. Consider impact on downstream consumers.
3. **Shell script changes (commit-data):** Edit `entrypoint.sh` directly. Ensure POSIX compatibility is not required (the script uses bash).
4. **Workflow changes:** Edit YAML files in `.github/workflows/`. Use pinned runner versions and action version tags.

## Testing

There is no formal test suite. Verification is done through:
- `npm run lint` — static analysis
- `npm run compile` — type checking
- `npm run bundle` — confirms the code bundles successfully
- `npm run test-cli` — (action-io-generator only) runs the CLI against a test action.yml
- CI workflows — end-to-end verification via GitHub Actions
