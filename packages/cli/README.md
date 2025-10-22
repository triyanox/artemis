# @artemis-lang/cli

Command-line interface for the Artemis programming language.

## Installation

```bash
npm install -g @artemis-lang/cli
```

## Usage

```bash
artemis <command> [options]
```

### Commands

**Run a program:**
```bash
artemis run <file>
```

**Print the Abstract Syntax Tree:**
```bash
artemis ast <file>
```

**Print lexical tokens:**
```bash
artemis lex <file>
```

**Save AST to file:**
```bash
artemis save-ast <file> <output>
```

**Save tokens to file:**
```bash
artemis save-lex <file> <output>
```

### Options

- `--version` - Show version number
- `--help` - Show help

## Example

Create a file `hello.art`:

```lisp
(println "Hello, Artemis!")
```

Run it:

```bash
artemis run hello.art
```

## Documentation

For complete language documentation, see the [main README](https://github.com/triyanox/artemis#readme).

## Version

Current version: 0.3.4

## License

[MIT](https://github.com/triyanox/artemis/blob/main/LICENSE)

## Links

- [GitHub Repository](https://github.com/triyanox/artemis)
- [NPM Package](https://www.npmjs.com/package/@artemis-lang/cli)
- [Documentation](https://github.com/triyanox/artemis#readme)
