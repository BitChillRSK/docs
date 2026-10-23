# Deployment lock

Automatic production deployment is off in this repository until the relaunch cutover.

- A push to `main` runs no workflow. It does not connect to a server or replace the published docs.
- A pull request runs no workflow, as before.
- The manual workflow **Deployment lock (relaunch cutover)** explains the cutover prerequisites, checks the ones that the repository can show, and then fails on purpose. It reads no secrets and has no deployment step.

The old production deployment is removed: SSH to the v1 host, update of the v1 checkout to `main`, and `docker compose down` and `up --build -d` of the container that serves the docs domain.
Do not restore it for the relaunch.
The relaunch docs replace the published docs only as an owner release step. The owner decides where the v1 docs stay available as an archive.

## Release preparation

The owner does these steps before a reviewed change removes the lock:

1. Merge and verify the deployment guard in every relaunch repository before any relaunch application change.
2. Remove the repository secrets `SSH_HOST`, `SSH_PRIVATE_KEY`, and `SSH_USER` before any relaunch application merge, and keep them removed until the cutover. No workflow on `main` uses them after this change. The old workflow stays in earlier runs and on older branches. GitHub can re-run an earlier run for 30 days with its original commit and ref (`main`), and the old script deploys the current `main`. A limit of the `production` environment to `main` alone does not stop such a re-run. A manual run of the old workflow from an older branch or tag is not documented by GitHub; treat it as possible. If v1 still needs an SSH deployment during the wind-down, use a control that also stops re-runs, for example required reviewers on `production` with the owner as the only reviewer. That control is not tested.
3. Tag the deployed v1 head as `legacy-v1`, immediately before the cutover.
4. Approve the archive location and publication plan for the v1 docs.
5. Approve the relaunch target, its container and image names, and its routing labels, so that two containers cannot claim the docs domain.
6. Confirm the external audit and deployment status, and the actual contract addresses, before publication.
7. Replace this lock with a reviewed deployment workflow for that approved target.

After each merge of relaunch changes into `main`, confirm again that this lock is present and that no workflow deploys on push, before any manual release action.
