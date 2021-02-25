# Commit Data Action

[![commit-data CI](https://github.com/redhat-actions/common/workflows/commit-data%20CI/badge.svg)](https://github.com/redhat-actions/common/actions)

[![Tag](https://img.shields.io/github/v/tag/redhat-actions/common)](https://github.com/redhat-actions/common/tags)
[![License](https://img.shields.io/github/license/redhat-actions/common)](./LICENSE)

This is a small action which captures some logic I'd find myself needing in lots of different workflows.

Firstly, I wanted to retrieve the tag corresponding to the commit for the current workflow, and perform some action if this is a "tag workflow".

For example, I like to tag my Docker images with the git tag if there is one, else I tag the images with `latest`.

Or, you may want to automatically create a GitHub release corresponding to each tag, using [`actions/create-release`](https://github.com/actions/create-release).

Secondly, I often want to get the short commit SHA (conventionally the first 7 characters).

This action takes no input, it just needs the git metadata which it gets from disk.

## Inputs

| Name | Description | Default |
| ---- | ---- | ---- |
| working_directory | Working directory to use for relative path to fetch commit data. | Defaults to current context |

## Outputs

| Name | Description |
| ---- | ----------- |
| branch | HEAD branch. Empty if the current ref is a tag. |
| is_pr | 'true' if this is a PR workflow, else 'false'. |
| pr_head | The pull request head ref (the ref the PR is "coming from"). Empty if (!is_pr). |
| pr_base | The pull request base ref (the ref that is "receiving" the PR). Empty if (!is_pr). |
| short_sha | The first 7 characters of the HEAD commit. |
| tags | All tags that point at the HEAD commit. <br>If there are no tags, this is the empty string. <br>If there are multiple tags, they are sorted alphabetically and separated by spaces. |
| tag  | If `tags` is not empty, this is the first tag alphabetically. <br>This way, you can know that this output contains exactly one tag, or the empty string. |
| tags_count | The integer number of `tags`. |
