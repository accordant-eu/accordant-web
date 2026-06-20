# Self-Hosted GitHub Actions Runner (srv1055555)

This document describes the self-hosted runner used for `accordant-eu/accordant-web` deployments.

## Why Self-Hosted?

GitHub-hosted runners cannot reliably SSH/SCP into `srv1055555` due to firewall rules and IP range restrictions. Running the workflow directly on the target VPS eliminates all external network hops for deployment.

## Runner Details

| Property              | Value                                              |
|-----------------------|----------------------------------------------------|
| Host                  | srv1055555                                         |
| Runner Name           | srv1055555                                         |
| Systemd Service       | actions.runner.accordant-eu-accordant-web.srv1055555.service |
| User                  | github-runner (uid 1002)                           |
| Install Path          | /home/github-runner/actions-runner                 |
| Labels                | self-hosted, accordant-web                         |
| Workflow Job          | `runs-on: self-hosted`                             |

## Service Management

```bash
# Status
systemctl status actions.runner.accordant-eu-accordant-web.srv1055555.service

# Restart
sudo systemctl restart actions.runner.accordant-eu-accordant-web.srv1055555.service

# Logs (journal)
journalctl -u actions.runner.accordant-eu-accordant-web.srv1055555.service -f
```

## Heartbeat / Monitoring

The runner is monitored via the Rufus heartbeat system (`HEARTBEAT.md`):

- Check runs every 30 minutes during Madrid business hours
- Command: `systemctl is-active --quiet ... && echo "runner: ok" || echo "runner: down"`

## Re-creating the Runner (One-Time Setup)

If the runner needs to be recreated:

1. On `srv1055555` as root:

```bash
useradd -m -s /bin/bash github-runner 2>/dev/null || true
rm -rf /home/github-runner/actions-runner
mkdir -p /home/github-runner/actions-runner
chown github-runner:github-runner /home/github-runner/actions-runner

cd /home/github-runner/actions-runner
curl -o actions-runner.tar.gz -L https://github.com/actions/runner/releases/download/v2.323.0/actions-runner-linux-x64-2.323.0.tar.gz
tar xzf actions-runner.tar.gz
rm actions-runner.tar.gz

./bin/installdependencies.sh

# Generate a fresh registration token via GitHub UI or API, then:
su - github-runner -c '
  cd /home/github-runner/actions-runner
  ./config.sh --url https://github.com/accordant-eu/accordant-web \
    --token <FRESH_TOKEN> \
    --name srv1055555 \
    --labels self-hosted,accordant-web \
    --work _work \
    --unattended --replace
'

./svc.sh install github-runner
./svc.sh start
```

2. Verify in GitHub → Settings → Actions → Runners.

## Workflow Integration

The deploy workflow (`.github/workflows/deploy.yml`) uses:

```yaml
jobs:
  build-and-deploy:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'npm'
      - run: npm ci
      - run: npx @11ty/eleventy
      - name: Deploy
        run: |
          TARGET=/srv/accordant-web
          cd "$TARGET"
          git pull --ff-only
          rm -rf "$TARGET/_site"
          cp -r "$GITHUB_WORKSPACE/_site" "$TARGET/"
          echo "Deployed: $(git rev-parse --short HEAD)"
```

No external SSH/SCP is required — everything runs locally on the VPS.

## Notes

- The runner uses the default `node20` bundled with the action runner (sufficient for current workflows).
- Node 24 is installed on the host and used via `actions/setup-node`.
- The runner is intentionally minimal — only the web deploy workflow runs on it.
