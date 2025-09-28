# Requirements Document

## Introduction

This feature improves the existing GitHub Actions release workflow to implement smart versioning that only bumps application versions when application code actually changes, while maintaining the current behavior of deploying all changes to production. The system should properly analyze emoji-based conventional commits (using cz-emoji) to determine the appropriate version bump type.

## Requirements

### Requirement 1

**User Story:** As a developer, I want the release system to only bump application versions when the application code actually changes, so that version numbers accurately reflect meaningful changes to the applications.

#### Acceptance Criteria

1. WHEN changes are made to `apps/web/` directory THEN the system SHALL bump the web application version
2. WHEN changes are made to `apps/api/` directory THEN the system SHALL bump the api application version
3. WHEN changes are made outside of application directories THEN the system SHALL deploy to prod but SHALL NOT bump any application versions

### Requirement 2

**User Story:** As a developer using cz-emoji for commits, I want the release system to properly analyze my emoji-based conventional commits to determine the correct version bump type, so that semantic versioning is applied correctly.

#### Acceptance Criteria

1. WHEN commit messages contain breaking change indicators (💥 `:boom:`) THEN the system SHALL apply a major version bump
2. WHEN commit messages contain minor indicators (✨ `:sparkles:`, 🎉 `:tada:`) THEN the system SHALL apply a minor version bump
3. WHEN commit messages contain other indicators (🐛 `:bug:`, ♻️ `:recycle:`, or any other emoji) THEN the system SHALL apply a patch version bump

### Requirement 3

**User Story:** As a developer, I want all changes to be deployed to production regardless of whether they trigger version bumps, so that infrastructure updates, documentation changes, and other non-app modifications are still deployed.

#### Acceptance Criteria

1. WHEN any changes are merged to main THEN the system SHALL create a release PR to prod
2. WHEN the release PR contains no version bumps THEN the system SHALL still merge to prod for deployment
3. WHEN the release PR contains version bumps THEN the system SHALL create tags and GitHub releases for the versioned applications
4. WHEN no applications are versioned THEN the system SHALL NOT create any tags or GitHub releases

### Requirement 4

**User Story:** As a developer, I want the release workflow to maintain backward compatibility with the existing PR and deployment process, so that the current development workflow is not disrupted.

#### Acceptance Criteria

1. WHEN the improved workflow runs THEN it SHALL maintain the same trigger conditions (PR merged to main)
2. WHEN creating release PRs THEN it SHALL use the same title format and target the prod branch
3. WHEN no versions are bumped THEN it SHALL create a release PR with a generic title like "🚀 Deploy changes"
4. WHEN versions are bumped THEN it SHALL include version information in the PR title as before
5. WHEN the workflow completes THEN it SHALL produce the same outputs for downstream processes
