# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-03-03 ([#11](https://github.com/soria-lucas/qrsec_frontend/pull/9))
### Added
- NotFound Page.
- Protected routes from unauthenticated access.
- Guest validation before to showing public invite info.
- Auth google endpoint from backend to retrieve users authorities.
- Structure's skeleton while loading or fetching data.
- Enable switch on user page.
- More data is stored in localStorage.
  - Log out button deletes this data.
- Error handling when comunication with backend.

### Changed
- Not Found or invalid Invite page (public invite).
- Drawer pages are shown based on user authorities.
- Some buttons or options are shown based on the user authorities.
- Avoid showing signup page unless necessary.

## [0.0.3] - 2025-02-18 ([#9](https://github.com/soria-lucas/qrsec_frontend/pull/9))
### Changed
- Colors, style and layout.
- Manifest.
- Use of Card component on ScanInvite page.

### Added
- Created a new layout.
  - Drawer.
  - App Bar.
  - App Bar with temporal drawer for mobile devices.
- Made app installable (PWA).
- New favicon.
- Created Logo.
- Added not found component.
- Added the "Add" button.

### Removed
- White and empty spaces.
- Old ResponsiveAppBar component.

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
