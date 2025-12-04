# Contributing to Nile

## Getting started

Thank you for your interest in contributing to [Nile](https://thenile.dev). We appreciate it and looking forward to working together.

Here are a few ways you can contribute:

- Open issues to report any questions or concerns related to Nile, its documentation, templates or examples.
- Respond to issues with advice or suggestions.
- Participate in coversations in [our Discord](https://discord.com/invite/8UuBB84tTy) and [Github discussions](https://github.com/orgs/niledatabase/discussions)
- Contribute fixes and improvements to the docs and examples in this repository
- Contribute new documents and examples

It is important to us that contributing to Nile will be a pleasant experience, if necessary, please refer to our [code of conduct](./CODE_OF_CONDUCT.md) for participation guidelines.

## Contributing Code and Documentation

### Cloning the repository

1. Start by forking this repository. Either from github UI or their CLI:

    ```bash
    gh repo fork https://github.com/niledatabase/niledatabase
    ```

2. Then clone your fork:

    ```bash
    git clone https://github.com/<github_username>/niledatabase.git
    cd niledatabase
    ```

### Directory Structure

To get started, it helps to be familiar with how this repository is laid out. Here's an overview of the key directories:

```bash
/
|-- www
   |-- app/docs
   |-- app/templates
|-- examples
    |-- quickstart
        |-- <language>
    |-- user_management
        |-- <feature>
           |-- <language>
```

As we can see, we have separate directories for our [website](./www/DEVELOPERS.md), [documentation](./www/app/docs//README.md), [templates](./www/app/templates/README.md) and [examples](./examples/README.md). Each is a bit different, so they each have a separate developer guide with more details on how to make changes and validate them locally.

### Using pnpm for Dependency Management

This repository uses [pnpm](https://pnpm.io/) for efficient dependency management. Please ensure you have pnpm installed.

To enable pnpm (recommended):
```bash
corepack enable pnpm
```

To install project dependencies:
```bash
pnpm install
```

To run scripts defined in `package.json` (e.g., `format`, `build`, `dev`):
```bash
pnpm run <script-name>
```

### Creating a Pull Request

Once you have changes to contribute, please open a pull request from a branch in your fork to this repository, and we will review it promptly.

To make the review process more pleasant, please make sure the pull request includes:

- The type of change you are making (correcting a mistake in the docs, new document, fix an issue in an example, enhance an example)
- The intent of the change. What was the situation before the change, what is the situation after and why is the new situation better.
- Make sure you run `pnpm run format` and commit the changes it makes. This will make our linter happy.

## Discuss with the Community

If you are stuck, need help, or wondering if a certain contribution will be welcome, please ask! Either in [our Discord](https://discord.com/invite/8UuBB84tTy) or [Github discussions](https://github.com/orgs/niledatabase/discussions)
