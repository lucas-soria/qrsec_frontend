# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.2] - 2025-01-23 ([#7](https://github.com/soria-lucas/qrsec_frontend/pull/7))
### Removed
- /admin/ endpoints.
- Random uuid appended to email on signup.

### Changed
- Added invite validation endpoint.
- Invite is now validated by the backend.

### Added
- Message that tells wheather a user is deleted or not.

## [0.0.1] - 2024-09-25 ([#3](https://github.com/soria-lucas/qrsec_frontend/pull/3))
### Added
- CRUD Pages.
- Reducers.
- Some degree of session management with google authentication.
- Dockerfile multistage build.

### Changed
- Migrated from js to tsx.
  - Added `tsconfig.json` file.

## [0.0.0] - 2023-12-25 ([#1](https://github.com/soria-lucas/qrsec_frontend/pull/1))
### Added
- Project's last status.
- CHANGELOG file.
