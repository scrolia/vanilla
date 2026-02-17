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
    just lint
    just fmt
    just build
    just test

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

# Run tests with different runtimes
test-all:
    cd ./test && pnpm run test
    cd ./test && deno run test
    cd ./test && bun run test

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

# Clean builds
clean:
    rm -rf ./{{example}}/dist
    rm -rf ./{{pkg}}/dist

# Clean everything
clean-all:
    just clean

    rm -rf ./{{example}}/node_modules
    rm -rf ./{{pkg}}/node_modules

    rm -rf ./node_modules
