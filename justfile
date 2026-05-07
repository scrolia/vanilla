set shell := ["bash", "-cu"]
set windows-shell := ["pwsh", "-Command"]

tsc := "pnpm exec tsc"
biome := "pnpm exec biome"
tsdown := "pnpm exec tsdown"
vitest := "pnpm exec vitest"
typedoc := "pnpm exec typedoc"
vite := "pnpm exec vite"
publish := "pnpm publish"

pkg := "package"

test := "test"

example := "examples/common"

# Default action
_:
    just --list -u

# Install
i:
    pnpm install

# Lint with TypeScript Compiler
tsc:
    cd ./{{pkg}} && {{tsc}} --noEmit

# Lint code
lint:
    ls-lint -config ./.ls-lint.yaml
    typos
    just tsc

# Lint code with Biome
lint-biome:
    {{biome}} lint .

# Format code
fmt:
    {{biome}} check --write .

# Build package
build:
    cd ./{{pkg}} && {{tsdown}} -c ./tsdown.config.ts

# Run tests:
test:
    cd ./{{test}} && {{vitest}} run

# Check code
check:
    just lint
    just fmt
    just build
    just test

# Generate APIs documentation
api:
    cd ./{{pkg}} && {{typedoc}}

# Start the server in `common` example
example:
    cd ./{{example}} && {{vite}}

# Add/Remove dev version tag for the package
version-dev VERSION="":
    node ./scripts/version-dev.mjs ./{{pkg}}/package.json {{VERSION}}

# Publish package with dev tag as dry-run
publish-dev-try:
    cd ./{{pkg}} && {{publish}} --no-git-checks --tag dev --dry-run

# Publish package with dev tag
publish-dev:
    cd ./{{pkg}} && {{publish}} --no-git-checks --tag dev

# Publish package as dry-run
publish-try:
    cd ./{{pkg}} && {{publish}} --no-git-checks --dry-run

# Publish package
publish:
    cd ./{{pkg}} && {{publish}}

# Clean builds (Linux)
clean-linux:
    rm -rf ./{{example}}/dist
    rm -rf ./{{pkg}}/dist

# Clean builds (macOS)
clean-macos:
    just clean-linux

# Clean builds (Windows)
clean-windows:
    Remove-Item -Recurse -Force ./{{example}}/dist
    Remove-Item -Recurse -Force ./{{pkg}}/dist

# Clean builds
clean:
    just clean-{{os()}}

# Clean everything (Linux)
clean-all-linux:
    just clean

    rm -rf ./{{example}}/node_modules

    rm -rf ./{{pkg}}/node_modules

    rm -rf ./node_modules

# Clean everything (macOS)
clean-all-macos:
    just clean-all-linux

# Clean everything (Windows)
clean-all-windows:
    just clean

    Remove-Item -Recurse -Force ./{{example}}/node_modules

    Remove-Item -Recurse -Force ./{{pkg}}/node_modules

    Remove-Item -Recurse -Force ./node_modules

# Clean everything
clean-all:
    just clean-all-{{os()}}
