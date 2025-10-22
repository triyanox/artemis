# @artemis-lang/parser

Syntax parser and Abstract Syntax Tree (AST) generator for the Artemis programming language.

## Installation

```bash
npm install @artemis-lang/parser
```

## Usage

```javascript
import Parser from '@artemis-lang/parser';
import Lexer from '@artemis-lang/lexer';

const code = '(def x 42)';
const lexer = new Lexer(code);
const tokens = lexer.tokenize();

const parser = new Parser(tokens);
const ast = parser.parse();

console.log(ast);
```

## Features

- **AST Generation**: Converts tokens into Abstract Syntax Tree
- **Plugin Architecture**: Extensible parser with plugin system
- **Error Handling**: Comprehensive syntax error reporting
- **Node Types**: Full support for all Artemis language constructs

## Supported Language Constructs

### Literals
- Numbers (integers, binary, hexadecimal)
- Strings
- Booleans
- Lists `[1, 2, 3]`
- Maps `{key: value}`
- Sets `#[1, 2, 3]`

### Variables
- Variable definition: `(def name value)`

### Functions
- Function definition: `(fn name [params] (body))`
- Function calls: `(functionName args)`

### Control Flow
- If statements: `(if (condition) (then) (else))`
- Match statements: `(match value { pattern : action })`

### Loops
- While loops: `(while (condition) (body))`
- For loops: `(for [var start end step] (body))`

### Operators
- Binary operators: `(+ a b)`, `(* x y)`
- Unary operators: `(! value)`, `(~ bits)`
- Comparison: `(> a b)`, `(== x y)`
- Logical: `(&& a b)`, `(|| x y)`

### Special
- Return statements: `(return value)`
- JavaScript interop: `(js $ code $)`
- Property access: `(get object "property")`

## AST Node Types

The parser generates nodes with the following types:

- `Program`: Root node
- `VariableDefinition`: Variable declarations
- `FunctionDefinition`: Function declarations
- `FunctionCall`: Function invocations
- `If`: If statements
- `While`: While loops
- `For`: For loops
- `Match`: Pattern matching
- `Return`: Return statements
- `BinaryExpression`: Binary operations
- `UnaryExpression`: Unary operations
- `Literal`: Literal values (number, string, boolean)
- `List`: Array literals
- `Map`: Object literals
- `Set`: Set literals

## Example

```javascript
import Parser from '@artemis-lang/parser';
import Lexer from '@artemis-lang/lexer';

const code = `
  (fn factorial [n] (
    (if ((== n 0)) (
      (return 1)
    )(
      (return (* n (factorial (- n 1))))
    ))
  ))
`;

const lexer = new Lexer(code);
const tokens = lexer.tokenize();

const parser = new Parser(tokens);
const ast = parser.parse();

console.log(JSON.stringify(ast, null, 2));
```

## Version

Current version: 0.3.4

## Changes in v0.3.4

- Fixed parser crash with bounds checking in `nextBy()` method
- Improved error messages
- Enhanced null safety

## Documentation

For complete language documentation, see the [main README](https://github.com/triyanox/artemis#readme).

## License

[MIT](https://github.com/triyanox/artemis/blob/main/LICENSE)

## Links

- [GitHub Repository](https://github.com/triyanox/artemis)
- [NPM Package](https://www.npmjs.com/package/@artemis-lang/parser)
- [Documentation](https://github.com/triyanox/artemis#readme)
