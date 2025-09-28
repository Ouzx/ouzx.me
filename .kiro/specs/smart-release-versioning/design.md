# Design Document

## Overview

This design improves the existing GitHub Actions release workflow to implement smart versioning that only bumps application versions when application code actually changes, while maintaining deployment of all changes to production. The system will properly analyze emoji-based conventional commits using cz-emoji patterns to determine appropriate version bump types.

The solution modifies the existing `release-train.yml` workflow to implement smarter change detection and commit analysis, while keeping the `prod-release.yml` workflow largely unchanged to maintain backward compatibility.

## Architecture

### Current Workflow Flow
1. PR merged to `main` → triggers `release-train.yml`
2. `release-train.yml` analyzes changes and bumps versions → commits to `main` → creates PR to `prod`
3. PR to `prod` → triggers `prod-release.yml` automerge
4. Merge to `prod` → triggers `prod-release.yml` release job → creates tags and GitHub releases

### Improved Workflow Flow
The flow remains the same, but with enhanced logic:
1. **Smart Change Detection**: Only analyze commits that affect `apps/web/` or `apps/api/` directories
2. **Enhanced Commit Analysis**: Properly parse cz-emoji patterns for version bump determination
3. **Conditional Release PR**: Always create release PR, but only include version info when apps are versioned
4. **Conditional Tagging**: Only create tags and releases when versions are actually bumped

## Components and Interfaces

### 1. Change Detection Component
**Location**: `release-train.yml` - "Check for changes and bump versions" step

**Current Logic Issues**:
- Checks for changes in `packages/` and bumps dependent apps
- Complex dependency analysis that's not needed per requirements

**New Logic**:
```bash
# Simplified change detection - only check app directories
has_app_changes() {
    local changed_files=$1
    echo "$changed_files" | grep -qE "^(apps/web/|apps/api/)"
}
```

**Interface**:
- Input: List of changed files from git diff
- Output: Boolean flags for `WEB_CHANGED` and `API_CHANGED`

### 2. Commit Analysis Component
**Location**: `release-train.yml` - "Analyze commit messages and determine version bump" step

**Current Logic Issues**:
- Only checks for `:boom:` and `:sparkles:` patterns
- Defaults everything else to patch
- Doesn't handle the full cz-emoji spectrum

**New Logic**:
```bash
analyze_commit_type() {
    local commits=$1
    local version_type="patch"  # default
    
    if echo "$commits" | grep -E ":boom:" > /dev/null; then
        version_type="major"
    elif echo "$commits" | grep -E ":sparkles:|:tada:" > /dev/null; then
        version_type="minor"
    # All other emojis (including :bug:, :recycle:) default to patch
    fi
    
    echo "$version_type"
}
```

**Interface**:
- Input: Commit messages from PR
- Output: Version bump type (major/minor/patch)

### 3. Version Bumping Component
**Location**: `release-train.yml` - "Check for changes and bump versions" step

**Current Logic**: Works correctly, no changes needed

**Interface**:
- Input: App path, version type
- Output: New version number

### 4. Release PR Creation Component
**Location**: `release-train.yml` - "create-release-pr" job

**Current Logic Issues**:
- Only creates PR when versions are bumped
- Should always create PR for deployment

**New Logic**:
- Always run (remove the conditional check)
- Create PR with generic title when no versions bumped
- Include version info in title when versions are bumped

**Interface**:
- Input: Version bump flags and new versions
- Output: PR created to prod branch

### 5. Production Release Component
**Location**: `prod-release.yml` - No changes needed

The production release workflow already handles the case where no versions are present in the commit message correctly - it simply won't create tags or releases.

## Data Models

### Workflow Outputs
```yaml
# release-train.yml outputs
outputs:
  new-web-version: ${{ steps.bump_versions.outputs.NEW_WEB_VERSION }}
  new-api-version: ${{ steps.bump_versions.outputs.NEW_API_VERSION }}
  version-type: ${{ steps.analyze-commits.outputs.version_type }}
  web-changed: ${{ steps.bump_versions.outputs.WEB_CHANGED }}
  api-changed: ${{ steps.bump_versions.outputs.API_CHANGED }}
```

### Environment Variables
```yaml
env:
  WEB_APP_PATH: apps/web
  API_APP_PATH: apps/api
  # Remove PACKAGES_PATH as it's no longer needed
```

### Commit Message Patterns
```bash
# Major version (breaking changes)
:boom: BREAKING CHANGE: remove deprecated API

# Minor version (new features)  
:sparkles: add new user dashboard
:tada: launch new feature

# Patch version (everything else)
:bug: fix login issue
:recycle: refactor user service
:memo: update documentation
:art: improve code formatting
```

## Error Handling

### 1. No Changes Detected
- **Current**: Exits early and skips version bump
- **New**: Continue to create deployment PR without version info

### 2. Invalid Commit Messages
- **Current**: Defaults to patch
- **New**: Continue defaulting to patch (safe fallback)

### 3. Missing Package.json Files
- **Current**: Handles gracefully with file existence checks
- **New**: Keep existing error handling

### 4. Git Operations Failures
- **Current**: GitHub Actions will fail the workflow
- **New**: Keep existing behavior (fail fast on git errors)

## Testing Strategy

Manual testing will be performed by creating test PRs with different scenarios to verify the workflow behaves correctly.

## Implementation Notes

### Backward Compatibility
- Maintain all existing environment variables and outputs
- Keep the same PR title format when versions are bumped
- Preserve the same trigger conditions and permissions
- Ensure downstream processes continue to work unchanged

### Performance Considerations
- Simplified logic will actually improve performance by removing complex dependency analysis
- Reduced file system operations (no more package dependency checking)
- Faster commit analysis with clearer patterns

### Security Considerations
- No changes to existing security model
- Same GitHub App token usage
- Same permission requirements
- No additional secrets needed
