# @artemis-lang/interpreter

Code interpreter and execution engine for the Artemis programming language.

## Installation

```bash
npm install @artemis-lang/interpreter
```

## Usage

```javascript
import Interpreter from '@artemis-lang/interpreter';

// Interpret code
Interpreter.interpret('(println "Hello, World!")');

// Get AST
const ast = Interpreter.ast('(def x 42)');
console.log(ast);

// Get tokens
const tokens = Interpreter.tokens('(+ 1 2)');
console.log(tokens);
```

## Features

- **Code Execution**: Interprets and executes Artemis code
- **AST Generation**: Converts code to Abstract Syntax Tree
- **Tokenization**: Lexical analysis and token generation
- **Built-in Functions**: 80+ native functions
- **JavaScript Interop**: Execute JavaScript code within Artemis
- **Global Access**: Access Node.js globals and environment

### Built-in Functions

The interpreter includes comprehensive built-in functions:

- **I/O**: print, println, log
- **Type Conversion**: int
- **List Operations**: push, pop, shift, unshift, slice, splice, concat, reverse, sort, join, map, filter, reduce
- **String Operations**: split, trim, replace, toUpperCase, toLowerCase, repeat
- **Map Operations**: get, set, has, del, keys, values
- **File I/O**: readFile, writeFile
- **Math**: sqrt, and access to Math object
- **Assertions**: assert, assertEq, assertGt, assertLt, and more

## API

### `Interpreter.interpret(code: string)`

Interprets and executes Artemis code.

```javascript
Interpreter.interpret('(def x 10) (println x)');
// Output: 10
```

### `Interpreter.ast(code: string)`

Generates an Abstract Syntax Tree from the code.

```javascript
const ast = Interpreter.ast('(+ 1 2)');
// Returns AST object
```

### `Interpreter.tokens(code: string)`

Generates tokens from the code.

```javascript
const tokens = Interpreter.tokens('(def x 42)');
// Returns array of tokens
```

## Version

Current version: 0.3.4

## Changes in v0.3.4

- Fixed while loop variable scoping
- Fixed empty string handling in Map operations
- Added Math object to global environment
- Fixed Array get() function
- Improved error handling

## Documentation

For complete language documentation, see the [main README](https://github.com/triyanox/artemis#readme).

## License

[MIT](https://github.com/triyanox/artemis/blob/main/LICENSE)

## Links

- [GitHub Repository](https://github.com/triyanox/artemis)
- [NPM Package](https://www.npmjs.com/package/@artemis-lang/interpreter)
- [Documentation](https://github.com/triyanox/artemis#readme)
