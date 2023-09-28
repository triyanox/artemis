#!/bin/bash
(cd packages/lexer && pnpm run build)
(cd packages/parser && pnpm run build)
(cd packages/interpreter && pnpm run build)
(cd packages/cli && pnpm run build)
wait
