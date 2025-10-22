# Artemis

A simple, expressive scripting language with Lisp-inspired syntax, built on TypeScript.

Artemis combines the elegance of S-expressions with modern programming features, making it perfect for scripting, learning, and rapid prototyping.

## Features

- S-expression syntax inspired by Lisp and Scheme
- Dynamic typing with multiple data types
- First-class functions with closures
- Pattern matching
- Built-in collection types (Lists, Maps, Sets)
- JavaScript interoperability
- File I/O operations
- Comprehensive standard library

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Language Guide](#language-guide)
  - [Comments](#comments)
  - [Variables](#variables)
  - [Data Types](#data-types)
  - [Functions](#functions)
  - [Control Flow](#control-flow)
  - [Loops](#loops)
  - [Pattern Matching](#pattern-matching)
  - [Operators](#operators)
  - [Collections](#collections)
- [Built-in Functions](#built-in-functions)
  - [I/O Functions](#io-functions)
  - [List Functions](#list-functions)
  - [String Functions](#string-functions)
  - [Map Functions](#map-functions)
  - [Math Functions](#math-functions)
  - [Assertion Functions](#assertion-functions)
- [Advanced Features](#advanced-features)
  - [JavaScript Interop](#javascript-interop)
  - [Global Access](#global-access)
- [CLI Usage](#cli-usage)
- [Examples](#examples)
- [License](#license)

## Installation

Install globally using npm:

```bash
npm install -g @artemis-lang/cli
```

## Quick Start

Create a file `hello.art`:

```lisp
(println "Hello, Artemis!")
```

Run it:

```bash
artemis run hello.art
```

## Language Guide

### Comments

Artemis supports multi-line comments:

```lisp
/* This is a single-line comment */

/*
   This is a
   multi-line comment
*/
```

### Variables

Define variables using `def`:

```lisp
(def name "Artemis")
(def version 1)
(def isActive true)

(println name)  /* Output: Artemis */
```

Variables are dynamically typed and can be reassigned:

```lisp
(def x 10)
(def x "now a string")
(def x [1, 2, 3])
```

### Data Types

#### Strings

```lisp
(def greeting "Hello World")
(def multiline "Line 1\nLine 2")
```

#### Numbers

```lisp
(def integer 42)
(def binary 0b1010)    /* 10 in decimal */
(def hex 0xFF)         /* 255 in decimal */
```

#### Booleans

```lisp
(def isTrue true)
(def isFalse false)
```

#### Lists

```lisp
(def numbers [1, 2, 3, 4, 5])
(def mixed [1, "two", true, [3, 4]])
(def empty [])
```

#### Maps

```lisp
(def person {name: "Alice", age: 30})
(def config {debug: true, port: 8080})
(def empty {})
```

#### Sets

```lisp
(def uniqueNumbers #[1, 2, 3, 4, 5])
(def uniqueItems #["a", "b", "c"])
```

### Functions

#### Defining Functions

```lisp
/* Simple function */
(fn greet [name] (
  (println "Hello, " name)
))

/* Function with return value */
(fn add [a b] (
  (return (+ a b))
))

/* Function with multiple statements */
(fn calculate [x y] (
  (def sum (+ x y))
  (def product (* x y))
  (println "Sum:" sum)
  (return product)
))
```

#### Calling Functions

```lisp
(greet "World")              /* Hello, World */
(def result (add 5 3))       /* result = 8 */
(println (calculate 4 5))    /* Sum: 9, returns 20 */
```

#### Higher-Order Functions

```lisp
/* Function returning a function */
(fn makeAdder [n] (
  (fn add [x] ((return (+ x n))))
))

(def add5 (makeAdder 5))
(println (add5 10))  /* 15 */
```

### Control Flow

#### If Statements

```lisp
/* Simple if */
(if ((> x 10)) (
  (println "x is greater than 10")
))

/* If-else */
(if ((== x 10)) (
  (println "x equals 10")
)(
  (println "x does not equal 10")
))

/* Nested if statements */
(if ((> score 90)) (
  (println "Grade: A")
)(
  (if ((> score 80)) (
    (println "Grade: B")
  )(
    (println "Grade: C")
  ))
))
```

### Loops

#### While Loops

```lisp
/* Simple while loop */
(def i 0)
(while ((< i 5)) (
  (println i)
  (def i (+ i 1))
))
/* Output: 0 1 2 3 4 */

/* While loop with multiple statements */
(def count 0)
(while ((< count 3)) (
  (println "Count:" count)
  (def count (+ count 1))
  (println "Next iteration")
))
```

#### For Loops

```lisp
/* Basic for loop: start to end */
(for [i 0 5] (
  (println i)
))
/* Output: 0 1 2 3 4 */

/* For loop with step */
(for [i 0 10 2] (
  (println i)
))
/* Output: 0 2 4 6 8 */

/* Countdown */
(for [i 10 0 -1] (
  (println i)
))
```

### Pattern Matching

```lisp
(def value 2)

(match value {
  1 : (println "One"),
  2 : (println "Two"),
  3 : (println "Three"),
  _ : (println "Other")
})
/* Output: Two */

/* Pattern matching with expressions */
(def x 5)
(match x {
  1 : (println "First"),
  2 : (for [i 0 3] ((println i))),
  _ : (println "Default case")
})
```

### Operators

#### Arithmetic Operators

```lisp
(+ 5 3)      /* Addition: 8 */
(- 10 4)     /* Subtraction: 6 */
(* 6 7)      /* Multiplication: 42 */
(/ 15 3)     /* Division: 5 */
(% 17 5)     /* Modulo: 2 */
(^ 2 8)      /* Exponentiation: 256 */
```

#### Comparison Operators

```lisp
(== 5 5)     /* Equal: true */
(!= 5 3)     /* Not equal: true */
(> 10 5)     /* Greater than: true */
(< 3 8)      /* Less than: true */
(>= 5 5)     /* Greater or equal: true */
(<= 4 9)     /* Less or equal: true */
```

#### Logical Operators

```lisp
(&& true true)      /* Logical AND: true */
(|| false true)     /* Logical OR: true */
(! false)           /* Logical NOT: true */
```

#### Bitwise Operators

```lisp
(~ 5)        /* Bitwise NOT */
(<< 4 2)     /* Left shift: 16 */
(>> 16 2)    /* Right shift: 4 */
(>>> 16 2)   /* Unsigned right shift: 4 */
```

### Collections

#### Working with Lists

```lisp
(def fruits ["apple", "banana", "cherry"])

/* Access elements */
(get fruits 0)           /* "apple" */
(at fruits 1)            /* "banana" */

/* Modify lists */
(push fruits "date")     /* Add to end */
(pop fruits)             /* Remove from end */
(shift fruits)           /* Remove from start */
(unshift fruits "fig")   /* Add to start */

/* List operations */
(length fruits)          /* Get length */
(includes fruits "banana") /* Check if exists */
(slice fruits 0 2)       /* Get slice */
(reverse fruits)         /* Reverse */
(sort fruits)            /* Sort */
(join fruits ", ")       /* Join to string */
```

#### Working with Maps

```lisp
(def person {name: "Alice", age: 30})

/* Access and modify */
(get person "name")      /* "Alice" */
(set person "age" 31)    /* Update value */
(set person "city" "NYC") /* Add new key */

/* Map operations */
(has person "name")      /* Check if key exists: true */
(del person "age")       /* Delete key */
(keys person)            /* Get all keys */
(values person)          /* Get all values */
```

## Built-in Functions

### I/O Functions

```lisp
(print "Hello")          /* Print without newline */
(println "Hello")        /* Print with newline */
(log value)              /* Console log for debugging */
```

### List Functions

```lisp
(length list)            /* Get length */
(push list item)         /* Add to end */
(pop list)               /* Remove from end */
(shift list)             /* Remove from start */
(unshift list item)      /* Add to start */
(at list index)          /* Get element at index */
(slice list start end)   /* Get slice */
(splice list start deleteCount ...items) /* Modify list */
(concat list1 list2)     /* Concatenate lists */
(reverse list)           /* Reverse list */
(sort list)              /* Sort list */
(includes list item)     /* Check if item exists */
(indexOf list item)      /* Find index of item */
(lastIndexOf list item)  /* Find last index */
(find list fn)           /* Find first matching */
(findIndex list fn)      /* Find index of first matching */
(map list fn)            /* Map function over list */
(filter list fn)         /* Filter list */
(reduce list fn initial) /* Reduce list */
(some list fn)           /* Check if some match */
(every list fn)          /* Check if all match */
(fill list value)        /* Fill with value */
```

### String Functions

```lisp
(length str)             /* Get string length */
(toUpperCase str)        /* Convert to uppercase */
(toLowerCase str)        /* Convert to lowercase */
(trim str)               /* Trim whitespace */
(trimStart str)          /* Trim start */
(trimEnd str)            /* Trim end */
(split str delimiter)    /* Split into list */
(join list delimiter)    /* Join list to string */
(replace str search replacement)     /* Replace first */
(replaceAll str search replacement)  /* Replace all */
(charAt str index)       /* Get character at index */
(charCodeAt str index)   /* Get char code */
(indexOf str substring)  /* Find substring */
(lastIndexOf str substring) /* Find last occurrence */
(startsWith str prefix)  /* Check prefix */
(endsWith str suffix)    /* Check suffix */
(repeat str count)       /* Repeat string */
(padStart str length pad) /* Pad at start */
(padEnd str length pad)  /* Pad at end */
```

### Map Functions

```lisp
(get map key)            /* Get value by key */
(set map key value)      /* Set key-value pair */
(has map key)            /* Check if key exists */
(del map key)            /* Delete key */
(keys map)               /* Get all keys as list */
(values map)             /* Get all values as list */
```

### Math Functions

```lisp
(sqrt n)                 /* Square root */
(+ a b ...)              /* Addition */
(- a b ...)              /* Subtraction */
(* a b ...)              /* Multiplication */
(/ a b ...)              /* Division */
(% a b)                  /* Modulo */
(^ base exp)             /* Exponentiation */

/* Access Math object */
(def PI (get Math "PI"))
(def random (get Math "random"))
```

### File I/O Functions

```lisp
(readFile "path/to/file.txt")        /* Read file */
(writeFile "path/to/file.txt" content) /* Write file */
```

### Assertion Functions

```lisp
(assert condition)       /* Assert truthy */
(assertEq a b)           /* Assert equal */
(assertGt a b)           /* Assert greater than */
(assertLt a b)           /* Assert less than */
(assertGte a b)          /* Assert greater or equal */
(assertLte a b)          /* Assert less or equal */
(assertTruthy value)     /* Assert truthy */
(assertFalsy value)      /* Assert falsy */
(assertThrows fn)        /* Assert function throws */
(assertNotThrows fn)     /* Assert function doesn't throw */
```

## Advanced Features

### JavaScript Interop

Execute JavaScript code directly within Artemis:

```lisp
/* Execute JavaScript */
(js $
  const x = 10;
  const y = 20;
  console.log(x + y);
$)
/* Output: 30 */

/* Return values from JavaScript */
(def result (js $ 42 * 2 $))
(println result)  /* 84 */

/* Access Node.js APIs */
(js $
  const fs = require('fs');
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
$)
```

### Global Access

Access JavaScript global objects and functions:

```lisp
/* Access Math object */
(def random (get Math "random"))
(def pi (get Math "PI"))

(fn randomNumber [max] (
  (return (* max (random)))
))

/* Access process.env */
(def env (get global "process.env"))
(def home (get env "HOME"))
(println "Home directory:" home)

/* Access Date */
(def now (get global "Date.now"))
(println "Current timestamp:" (now))

/* Set properties on objects */
(def config {})
(set config "debug" true)
(set config "port" 8080)
(println (get config "debug"))  /* true */
```

## CLI Usage

The Artemis CLI provides several commands:

```bash
# Run a program
artemis run program.art

# Print the Abstract Syntax Tree
artemis ast program.art

# Print lexical tokens
artemis lex program.art

# Save AST to file
artemis save-ast program.art output.json

# Save tokens to file
artemis save-lex program.art output.json

# Get help
artemis --help

# Get version
artemis --version
```

## Examples

### Hello World

```lisp
(println "Hello, World!")
```

### Factorial

```lisp
(fn factorial [n] (
  (if ((== n 0)) (
    (return 1)
  )(
    (return (* n (factorial (- n 1))))
  ))
))

(println (factorial 5))  /* 120 */
```

### Fibonacci Sequence

```lisp
(fn fib [n] (
  (if ((<= n 1)) (
    (return n)
  )(
    (return (+ (fib (- n 1)) (fib (- n 2))))
  ))
))

(for [i 0 10] (
  (println (fib i))
))
```

### FizzBuzz

```lisp
(fn fizzBuzz [limit] (
  (for [i 1 (+ limit 1)] (
    (if ((== (% i 15) 0)) (
      (println "FizzBuzz")
    )(
      (if ((== (% i 3) 0)) (
        (println "Fizz")
      )(
        (if ((== (% i 5) 0)) (
          (println "Buzz")
        )(
          (println i)
        ))
      ))
    ))
  ))
))

(fizzBuzz 20)
```

### Word Counter

```lisp
(fn countWords [text] (
  (def wordCount {})
  (def words (split text " "))

  (while ((< 0 (length words))) (
    (def word (shift words))
    (if ((has wordCount word)) (
      (set wordCount word (+ (get wordCount word) 1))
    )(
      (set wordCount word 1)
    ))
  ))

  (return wordCount)
))

(def text "hello world hello artemis world world")
(def counts (countWords text))

/* Print results */
(while ((< 0 (length (keys counts)))) (
  (def word (shift (keys counts)))
  (println word ": " (get counts word))
  (del counts word)
))
```

### File I/O

```lisp
/* Read a file */
(def content (readFile "input.txt"))
(println "File contents:")
(println content)

/* Write to a file */
(def message "Hello from Artemis!")
(writeFile "output.txt" message)
(println "Written to output.txt")
```

### Higher-Order Functions

```lisp
/* Map example */
(def numbers [1, 2, 3, 4, 5])
(fn double [x] ((return (* x 2))))
(def doubled (map numbers double))
(println doubled)  /* [2, 4, 6, 8, 10] */

/* Filter example */
(fn isEven [x] ((return (== (% x 2) 0))))
(def evens (filter numbers isEven))
(println evens)  /* [2, 4] */

/* Reduce example */
(fn sum [acc x] ((return (+ acc x))))
(def total (reduce numbers sum 0))
(println total)  /* 15 */
```

More examples can be found in the [examples](https://github.com/triyanox/artemis/tree/main/examples) directory:

- [Hello World](https://github.com/triyanox/artemis/blob/main/examples/hello-world.art)
- [Factorial](https://github.com/triyanox/artemis/blob/main/examples/fatorial.art)
- [Fibonacci](https://github.com/triyanox/artemis/blob/main/examples/fib-seq.art)
- [FizzBuzz](https://github.com/triyanox/artemis/blob/main/examples/fizz-buzz.art)
- [Word Occurrences](https://github.com/triyanox/artemis/blob/main/examples/word-occurrences.art)
- [File Operations](https://github.com/triyanox/artemis/blob/main/examples/fs.art)
- [Pattern Matching](https://github.com/triyanox/artemis/blob/main/examples/match.art)
- [Loops](https://github.com/triyanox/artemis/blob/main/examples/loops.art)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://github.com/triyanox/artemis/blob/main/LICENSE)

## Project Documentation

- [Project Status](./docs/project-status.md) - Comprehensive status, test results, and roadmap
- [Changelog](./CHANGELOG.md) - Complete history of changes and fixes

## Links

- [GitHub Repository](https://github.com/triyanox/artemis)
- [NPM Package](https://www.npmjs.com/package/@artemis-lang/cli)
- [Issue Tracker](https://github.com/triyanox/artemis/issues)
