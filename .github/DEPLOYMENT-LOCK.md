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
2. Limit the `production` environment to the `main` branch, or remove the SSH deployment secrets, until the cutover. Older branches and tags still contain the old workflow, and GitHub can run it from those refs through the API.
3. Tag the deployed v1 head as `legacy-v1`, immediately before the cutover.
4. Approve the archive location and publication plan for the v1 docs.
5. Approve the relaunch target, its container and image names, and its routing labels, so that two containers cannot claim the docs domain.
6. Confirm the external audit and deployment status, and the actual contract addresses, before publication.
7. Replace this lock with a reviewed deployment workflow for that approved target.

After each merge of relaunch changes into `main`, confirm again that this lock is present and that no workflow deploys on push, before any manual release action.
