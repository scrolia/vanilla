set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "./node_modules/.bin/"
biome := node_bin + "biome"
tsc := node_bin + "tsc"
tsdown := node_bin + "tsdown"
vitest := node_bin + "vitest"
typedoc := node_bin + "typedoc"
vite := node_bin + "vite"

package := "package"

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

# Setup the project
setup:
    brew install ls-lint typos-cli
    just i

# Lint with TypeScript Compiler
tsc:
    cd ./{{package}} && ../{{tsc}} --noEmit

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
    cd ./{{package}} && ../{{tsdown}} -c ./tsdown.config.ts

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
    cd ./{{package}} && ../{{typedoc}}

# Start the server in `common` example
example:
    cd ./{{example}} && ./{{vite}}

# Clean builds
clean:
    rm -rf ./{{example}}/dist
    rm -rf ./{{package}}/dist

# Clean everything
clean-all:
    rm -rf ./node_modules
    rm -rf ./{{example}}/node_modules
    rm -rf ./{{package}}/node_modules
    just clean
