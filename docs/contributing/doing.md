---
id: doing
title: Contributing
sidebar_label: Working
---

# Working

## Managing Issues

Well crafted issues improve the speed that work can be triaged, understood, and completed. To help guide this process [issue templates](https://github.com/Microsoft/fast-dna/tree/master/.github/ISSUE_TEMPLATE) exist to allow users to choose an appropriate [bug report](https://github.com/Microsoft/fast-dna/blob/master/.github/ISSUE_TEMPLATE/Bug_report.md), [feature request](https://github.com/Microsoft/fast-dna/blob/master/.github/ISSUE_TEMPLATE/Feature_request.md), or [custom template](https://github.com/Microsoft/fast-dna/blob/master/.github/ISSUE_TEMPLATE/Custom.md).

Here's a good resource for [Do's and Don'ts](https://hackernoon.com/45-github-issues-dos-and-donts-dfec9ab4b612) when working with bugs, issues, and requests.

[GitHub Labels](https://developer.github.com/v3/issues/labels/) are used to manage issues broadly considered work items grouped by color and prefixed by label name.

## Creating branches

Create a unique branch name tracking `origin/master` to perform your work.

```bash
git checkout -b <users/alias/feature-branch-name> origin/master
```

- Use all lower cased hyphen-delimited branch names for readability
- Format as <users/alias/branch-name>. For example, users/jdoe/task-issue-title
- Create as new branch for each work issue using the `-b` argument.
- Commit messages should use lowercase imperative present tense. Use commands. Instead of “I added tests for ...” use “add tests for ...”

## Pull requests

When landing a pull request (PR), individuals must modify the original commit message to include comprehensive details. This detail along with other git history meta information deploys as part of the documentation changelog history. Changlogs are generated by [Lerna](https://lernajs.io/) using [Conventional commits](https://conventionalcommits.org/).

PR comments should include the issue number per the [github closing issue keywords](https://help.github.com/articles/closing-issues-using-keywords/) documentation.

One or more collaborators will automatically be assigned to review each PR based on areas of [ownership](https://github.com/Microsoft/fast-dna/blob/master/.github/CODEOWNERS).

**`<type>`** is required to be at least one of the following:

- chore: A change that does not impact distributed packages
- feat: Adding, updating, or removing a feature
- fix: A bug fix.

**`<description>`** is required and speaks to what the user gets from this PR:

- Be concise
- Use lowercase
- Use imperative, present tense (e.g. `add` not `adds`)
- Do not end with a period. Period.
- Avoid redundant words

Accepted title format

```comment
<type>: <description>
```

Example titles

```comment
feat: add a border radius to MSFT button
chore: add unit-tests for all components
fix: update MSFT design system to use 3px border radius
```

### Formatting messages

Optionally, include more detail in the message.

`<body>` is used to provide clarity and context to the description.

`<footer>` is used to provide additional metadata about the pull request such as issue fixing (fix #19, close #19, resolve #19). Additionally, is used to denote breaking changes.

Accepted message format

```comment
<body>

<footer>
```

Example message

```comment
Sequence indicators markup is now located after the slider markup to at the top for improved accessibility because the screen reader can read all of the slide options individually before interacting with the slider.

closes #213

BREAKING CHANGE : Describe [what and why](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) this change was required.
```

### Interim commits

The above outlines the format for the **final** commit, but contributors will have many interim commits while working on their branch. These commits should be succinct, concise, and consistent for best readability. Always remember, a diff will tell you _what_ changed in a commit, but only the commit message can properly tell you _why_.

Typical interim commits may look like the following:

```terminal
5ba3db6 Update toggle markup for accessibility
84564a0 Add MSFT styles
e142fd1 Rebase with master
887815f Remove toggle underline on hover
ac8326d Fix ts-lint errors
```

As a core philosophy we prefer [rebasing over merging](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

## Common commands

All "packages" share common script names for consistency along with their own documentation guides.

To clean all packages.

```bash
lerna clean
```

When package files change the symbolic links will require updating.

```bash
lerna bootstrap
```

To run all tests on all packages.

```bash
lerna run test
```

To run all tests on a single package.

```bash
cd packages/package-name
npm run test
```

Most packages have a *watch* command that will rebuild the package's distribution when a file changes. This process can be useful when doing development across multiple packages.

```bash
npm run watch
```