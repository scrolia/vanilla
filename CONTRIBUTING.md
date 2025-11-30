[< Back](./README.md)

# Contributing to Scrolia Vanilla

Thanks for your interest in contributing!

This is a guideline for contributing to Scrolia Vanilla.

## Before the Contribution

Please install the following dependencies:

| Dependencies                                   | Description                            |
| ---------------------------------------------- | -------------------------------------- |
| [Node.js](https://nodejs.org/en)               | JavaScript runtime                     |
| [just](https://just.systems)                   | Command runner                         |
| [ls-lint](https://ls-lint.org/)                | Linting tool for directories and files |
| [typos-cli](https://github.com/crate-ci/typos) | Spell checker                          |

## Commands

The following commands are available:

### Installing

This command will install Node.js dependencies.

```sh
just i
```

### Default Command

This command will do linting, formatting and testing.

```sh
just
```

### Linting

This command will lint the code.

```sh
just lint
```

### Formatting

This command will format the code.

```sh
just fmt
```

### Building

This command will build the code.

```sh
just build
```

### Testing

This command will run all tests.

```sh
just test
```

This command will run all tests with all JavaScript runtimes.

> `deno` and `bun` must be installed to run this command.

```sh
just test-all
```

### Cleaning

This command will clean the unnecessary files.

```sh
just clean
```

This command will clean all unnecessary files including the `node_modules` directory.

```sh
just clean-all
```

## Committing

When committing changes to the code, use the following prefixes:

- `chore`: updates in dependencies/tools
- `build`: changes to the build system
- `fix`: fixes a bug
- `feat`: adds a new feature
- `refactor`: other code changes
- `perf`: performance improvements
- `security`: security related changes
- `style`: style changes
- `test`: adding or updating tests
- `docs`: documentation only changes
- `ci`: CI configuration updates
- `release`: new version release

For example:

```
feat: add xxx feature
docs: fix typos
```
