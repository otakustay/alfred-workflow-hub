alfred-workflow-hub
===================

alfred workflow for open github pages in browser

## Install

**YOU MUST HAVE NODEJS INSTALLED**

The NodeJS should be installed as `/usr/local/bin/node`, this workflow assumes this environment

```
npm install
npm run-script compile
open hub.alfredworkflow
```

You may change the hotkeys in alfred

## Usage

```
gh {repository} [branch] {page}
```

- `repository` should be either:
    - A `/` separated repository name, such as `underscore/underscore`
    - A single repository name, since the `defaultUser` setting is configured
- `branch` is used when browse code or commits pages, it can be omitted and defaults to `master`
- `page` can be either:
    - `issues` to browse issue list, alias `issue`
    - `pulls` to browse pull requests, alias `pull`
    - `wiki` to browse wiki
    - `pulse` to browse pulse
    - `graphs` to browse graphs, alias `graph`
    - `branches` to browse branches, alias `branch`, `br`
    - `releases` to browse releases, alias `release`, `tags`, `tag`
    - `contributors` to browse contributors, alias `contributor`
    - `ask` to create a new issue, alias `submit`
    - `write` to create a new wiki page
    - `code` to browse code for selected branch
    - `commits` to browse commits for selected branch, alias `commit`

## Configure

```
gh-config {key} [value]
```

- `key` can be any string without whitespace
- `value` can be any string without whitespace, if omitted, alfred will display the value of `key`

### Currently supported keys

- `defaultUser` sets the default repository user so the first part of `repository` could be omitted
