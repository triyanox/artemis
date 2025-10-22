# @artemis-lang/lexer

Lexical analyzer (tokenizer) for the Artemis programming language.

## Installation

```bash
npm install @artemis-lang/lexer
```

## Usage

```javascript
import Lexer from '@artemis-lang/lexer';

const code = '(def x 42)';
const lexer = new Lexer(code);
const tokens = lexer.tokenize();

console.log(tokens);
```

## Features

- **Tokenization**: Converts source code into tokens
- **Multi-line Comments**: Supports `/* ... */` style comments
- **Keywords**: Recognizes language keywords (def, fn, if, while, for, match, return)
- **Operators**: All 18 operators (arithmetic, logical, bitwise, comparison)
- **Literals**: Strings, numbers, booleans, binary, hexadecimal
- **Native Functions**: 80+ built-in function identifiers
- **S-expressions**: Parentheses, brackets, braces

## Token Types

The lexer recognizes the following token types:

- **keyword**: `def`, `fn`, `if`, `else`, `while`, `for`, `match`, `return`, `class`, `extends`, `new`
- **nativeFn**: Built-in functions like `println`, `push`, `map`, `filter`, etc.
- **operator**: `+`, `-`, `*`, `/`, `%`, `^`, `>`, `<`, `>=`, `<=`, `==`, `!=`, `&&`, `||`, `!`, `~`, `<<`, `>>`, `>>>`
- **number**: Integer literals
- **binary**: Binary literals (0b1010)
- **hex**: Hexadecimal literals (0xFF)
- **boolean**: `true`, `false`
- **string**: Double-quoted strings
- **identifier**: Variable and function names
- **lp/rp**: Left/right parentheses `(` `)`
- **lb/rb**: Left/right braces `{` `}`
- **lbk/rbk**: Left/right brackets `[` `]`
- **comma**: `,`
- **colon**: `:`
- **hash**: `#` (for sets)

## Example

```javascript
import Lexer from '@artemis-lang/lexer';

const code = `
  (def greeting "Hello")
  (println greeting)
`;

const lexer = new Lexer(code);
const tokens = lexer.tokenize();

// tokens will be an array of token objects
// Each token has: { type, value, line, column }
```

## Version

Current version: 0.3.4

## Documentation

For complete language documentation, see the [main README](https://github.com/triyanox/artemis#readme).

## License

[MIT](https://github.com/triyanox/artemis/blob/main/LICENSE)

## Links

- [GitHub Repository](https://github.com/triyanox/artemis)
- [NPM Package](https://www.npmjs.com/package/@artemis-lang/lexer)
- [Documentation](https://github.com/triyanox/artemis#readme)
