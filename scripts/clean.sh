#!/bin/bash
(cd packages/lexer && rm -rf dist && rm -rf node_modules) &
(cd packages/parser && rm -rf dist && rm -rf node_modules) &
(cd packages/interpreter && rm -rf dist && rm -rf node_modules) &
(cd packages/cli && rm -rf bin && rm -rf node_modules) &
wait
