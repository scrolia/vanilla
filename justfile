set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "./node_modules/.bin/"
biome := node_bin + "biome"
tsc := node_bin + "tsc"
tsdown := node_bin + "tsdown"
vitest := node_bin + "vitest"
typedoc := node_bin + "typedoc"
vite := node_bin + "vite"

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
    cd ./{{pkg}} && ../{{tsc}} --noEmit

# Lint code
lint:
    ls-lint
    typos
    just tsc

# Format code
fmt:
    ./{{biome}} check --write .

# Build package
build:
    cd ./{{pkg}} && ../{{tsdown}} -c ./tsdown.config.ts

# Run tests:
test:
    cd ./{{test}} && ./{{vitest}} run

# Run tests with different runtimes
test-all:
    cd ./test && pnpm run test
    cd ./test && deno run test
    cd ./test && bun run test

# Generate APIs documentation
api:
    cd ./{{pkg}} && ../{{typedoc}}

# Start the server in `common` example
example:
    cd ./{{example}} && ./{{vite}}

# Add/Remove dev version tag for the package
version-dev VERSION="":
    node ./scripts/version-dev.mjs ./{{pkg}}/package.json {{VERSION}}

# Publish package with dev tag as dry-run
publish-dev-try:
    cd ./{{pkg}} && pnpm publish --no-git-checks --tag dev --dry-run

# Publish package with dev tag
publish-dev:
    cd ./{{pkg}} && pnpm publish --no-git-checks --tag dev

# Publish package as dry-run
publish-try:
    cd ./{{pkg}} && pnpm publish --no-git-checks --dry-run

# Publish package
publish:
    cd ./{{pkg}} && pnpm publish

# Clean builds
clean:
    rm -rf ./{{example}}/dist
    rm -rf ./{{pkg}}/dist

# Clean everything
clean-all:
    rm -rf ./node_modules
    rm -rf ./{{example}}/node_modules
    rm -rf ./{{pkg}}/node_modules
    just clean
