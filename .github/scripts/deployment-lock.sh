#!/usr/bin/env bash
# Relaunch cutover deployment lock.
#
# This repository has no approved relaunch deployment target yet. The old
# production deployment is removed, so a merge to main cannot deploy the
# relaunch over the v1 service or migrate the v1 database. This script
# explains the cutover prerequisites, checks the ones that the repository can
# show, and always fails. It never connects to a server, deploys, migrates, or
# starts a service. A reviewed target-specific deployment change replaces it.
#
# Environment:
#   RELEASE_SHA  full commit SHA that the operator intends to release
#   GITHUB_SHA   commit of the workflow run (set by GitHub Actions)
# Exit status: 2 for invalid input, 1 when the deployment is locked.

set -euo pipefail

summary="${GITHUB_STEP_SUMMARY:-/dev/null}"
repository="${GITHUB_REPOSITORY:-this repository}"
release_sha="${RELEASE_SHA:-}"
run_sha="${GITHUB_SHA:-}"

if [[ ! "$release_sha" =~ ^[0-9a-f]{40}$ ]]; then
  echo "::error title=Invalid input::release_sha must be the full 40-character lowercase commit SHA of the selected ref."
  exit 2
fi

if [[ "$release_sha" != "$run_sha" ]]; then
  echo "::error title=Invalid input::release_sha ${release_sha} is not the commit of this run (${run_sha:-unknown})."
  exit 2
fi

if legacy_sha="$(git rev-parse -q --verify 'refs/tags/legacy-v1^{commit}' 2>/dev/null)"; then
  legacy_status="present at ${legacy_sha}"
else
  legacy_status="missing"
fi

unavailable="not available in this repository"

{
  echo "## Deployment locked until the relaunch cutover"
  echo
  echo "Repository: ${repository}"
  echo "Requested commit: ${release_sha}"
  echo
  echo "| Prerequisite | Status |"
  echo "|---|---|"
  echo "| Deployment guards merged and verified in all seven relaunch repositories | owner check |"
  echo "| Deployed v1 head tagged \`legacy-v1\` by the owner | ${legacy_status} |"
  echo "| Approved relaunch target, isolated from the v1 checkout, containers, networks, volumes, ports, cron, and secrets | ${unavailable} |"
  echo "| New empty relaunch database with distinct credentials, checked against its expected identity before migrations (services with a database) | ${unavailable} |"
  echo "| Reviewed target-specific deployment workflow that replaces this lock | ${unavailable} |"
  echo
  echo "No deployment, migration, or service start ran."
} | tee -a "$summary"

echo "::error title=Deployment locked::No approved relaunch deployment target exists in ${repository}. No deployment, migration, or service start ran. Replace this lock with a reviewed target-specific deployment change."
exit 1
