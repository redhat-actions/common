# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Security

- Add CODEOWNERS and enforce least-privilege permissions in CI workflows.

## [v2.0.0] - 2026-07-22

### Breaking Changes

- Upgrade to TypeScript 6 and Node 24 runtime.
- Migrate action-io-generator from ESLint 8 to ESLint 10 with typescript-eslint v8.
- Update `actions/checkout` from v2 to v7 and `actions/setup-node` from v4 to v7.

### Added

- Add `--lineWrap` option to action-io-generator.
- Add community files (CODE_OF_CONDUCT, CONTRIBUTING, SECURITY) and AI agent documentation (AGENTS.md).

### Fixed

- Fix commit-data action on Alpine 3.21.
- Fix bugs and incorrect metadata found during pre-release review.
- Fix deprecated action features in CI workflows.

### Changed

- Overhaul dependencies for Node 24 compatibility.
- Update shared configuration packages for Node 20+.
- Modernize CI workflows across all components.
- Bump webpack-cli to 7.2.1, js-yaml to 5.2.1, and @types/node to 26.1.1.

## [v1.2.0] - 2022-12-24

### Changed

- Update commit-data Dockerfile and entrypoint.sh.
- Update dependencies across all packages.
- Add npm version command to action-io-generator.

## [v1.1.0] - 2021-02-25

### Added

- Add `working_directory` input to commit-data action (#26).

## [v1.0.0] - 2021-02-08

### Added

- Initial release of action-io-generator: generates TypeScript enums from `action.yml` inputs and outputs.
- Initial release of bundle-verifier: verifies committed dist bundles are up to date.
- Initial release of commit-data: extracts HEAD commit metadata as action outputs.
- Shared configuration packages: `@redhat-actions/tsconfig`, `@redhat-actions/eslint-config`, `@redhat-actions/webpack-config`.

[Unreleased]: https://github.com/redhat-actions/common/compare/v2.0.0...HEAD
[v2.0.0]: https://github.com/redhat-actions/common/compare/v1.2.0...v2.0.0
[v1.2.0]: https://github.com/redhat-actions/common/compare/v1.1.0...v1.2.0
[v1.1.0]: https://github.com/redhat-actions/common/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/redhat-actions/common/releases/tag/v1.0.0
