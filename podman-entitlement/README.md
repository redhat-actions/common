## Podman Entitlement GitHub Action

When building container images that install Red Hat content
which is not part of Universal Base Image repositories,
Red Hat entitlements are needed to access the full Red Hat Enterprise Linux
repositories.

To avoid modifying the Dockerfiles with extra steps that would
handle the registration, this Action registers a temporary system
using organization's activation key, and uses `/etc/containers/mounts.conf`
to configure subsequent `podman build` invocations to have access
to the entitlements.

## Inputs

| Input | Description |
| ---   | --- |
| `org` | Red Hat account organization |
| `activationkey` | Red Hat account activation key |
| `image` | Container image to use to run `subscription-manager register` with the above parameters <br> Optional, defaults to `registry.access.redhat.com/ubi9` |

## Usage

On https://access.redhat.com/management/activation_keys, create
new Subscription Manager activation key.

Set up secrets in your repository, for example `redhat_org` for your
Red Hat account organization and `redhat_activationkey` for your Red Hat
account activation key. Your Organization ID is shown on the above-mentioned
Activation Keys page on Red Hat portal.

In your workflow YAML which calls `podman build`, add invocation
of `redhat-actions/common/podman-entitlement` before that `podman build`
step:

```yaml
      - uses: redhat-actions/common/podman-entitlement
        with:
          org: ${{ secrets.redhat_org }}
          activationkey: ${{ secrets.redhat_activationkey }}
      - run: podman build -t localhost/the-image:the-tag src
```

