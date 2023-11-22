# `Artemis`: TypeScript-Powered Scripting Language

**artemis** is a simple, easy to learn, and easy to use programming language. It is designed to be a general purpose language, and it's built on top of typescript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Syntax](#syntax)
  - [Comments](#comments)
  - [Variable Definitions](#variable-definitions)
  - [Function Definitions](#function-definitions)
  - [Function Calls](#function-calls)
  - [Control Flow](#control-flow)
  - [Loops](#loops)
  - [Pattern Matching](#pattern-matching)
  - [Operators](#operators)
  - [Built-in Functions](#built-in-functions)
  - [JS-Interop](#js-interop)
- [Examples](#examples)

## Installation

```bash
npm install -g @artemis-lang/cli
```

## Usage

```bash
 _____     _             _
|  _  |___| |_ ___ _____|_|___
|     |  _|  _| -_|     | |_ -|
|__|__|_| |_| |___|_|_|_|_|___|

https://github.com/triyanox/artemis

>  Usage: artemis <command> [options]

Commands:
  artemis run <file>             Interpret a file
  artemis ast <file>             Print the AST of a file
  artemis lex <file>             Print the lexemes of a file
  artemis save-ast <file> <out>  Save the AST of a file to a file
  artemis save-lex <file> <out>  Save the lexemes of a file to a file

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## Syntax

**artemis** syntax inspired by multiple langauges such as python, javascipt and lisps. It is designed to be easy to learn and easy to use.

### Comments

**artemis** supports single line comments and multi line comments.

```rs
/* This is a comment */
/* This is a
multiline comment */
```

### Variable Definitions

**artemis** supports multiple types of variables such as strings, numbers, booleans, list,
maps and sets.

```rs
(def b "Hello World") /* String */
(def c 1) /* Number */
(def d true) /* Boolean */
(def f [1, 2, 3]) /* List */
(def g {a: 1, b: 2}) /* Map */
(def h #[1, 2, 3]) /* Set */
(def bin 0b1010) /* Binary */
(def hex 0x12F) /* Hex */
```

### Function Definitions

**artemis** supports function definitions.

```rs
(fn add [a b] ((+ a b)))
(fn wrapper [] ((add 1 2)))
(def a (wrapper))
(println a)

(fn addTwo [a]((def sum (+ a 2))(return sum)))
(println (addTwo 1))
```

### Function Calls

**artemis** supports function calls.

```rs
(add 1 2) /* you can call functions with arguments */
(add) /* you can call functions without arguments */
(def a (add 1 2)) /* you can assign function calls to variables */
(print a)
```

```bash
# Output
3
```

### Control Flow

**artemis** supports if statements.

```rs
(if true ((println "Hello World"))) /* if statements */
(if true ((println "Hello World")) (println "Goodbye World")) /* if else statements */
```

### Loops

**artemis** supports while loops and for loops.

```rs
/* while loops */
(def a 0)
(while ((< a 10)) ((println a)(def a (+ a 1))))
/* another example of a while loop */
(def iter 0)
(while ((< iter 10)) (
  (def iter (+ iter 1))
  (def pyramid [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  (def pyramid (slice pyramid 0 iter))
  (println pyramid)
  )
)
/* for loops */
(for [i 10 20] ((println i)))
/* also you pass a step argument to for loops */
(for [i 20 30 2] ((println i)))
```

```bash
# Output
0
1
2
3
4
5
6
7
8
9
1
1,2
1,2,3
1,2,3,4
1,2,3,4,5
1,2,3,4,5,6
1,2,3,4,5,6,7
1,2,3,4,5,6,7,8
1,2,3,4,5,6,7,8,9
1,2,3,4,5,6,7,8,9,10
10
11
12
13
14
15
16
17
18
19
20
22
24
26
28
```

### Pattern Matching

**artemis** supports pattern matching.

```rs
  (def a [])
  (match a {
    1 : (println "1"),
    2 : (for [i 0 10] ((println i))),
    3 : (for [i 0 10] (( def mul ( * (+ i 4 ) 3 ) ) (println mul) )),
    _ : (for [i 0 2] (
          (for [j 0 3] (
            (push a 69)
            (println "From inner" j)
            (pop a)
          ))
          (push a 69)
          (println "From outer" i)
          (pop a)
        ))
  })
```

```bash
# Output
"From inner" 0
"From inner" 1
"From inner" 2
"From outer" 0
"From inner" 0
"From inner" 1
"From inner" 2
"From outer" 1
```

### Operators:

**artemis** supports logical operators, arithmetic operators, assignment operators and bitwise operators.

```rs
/* Logical Operators */
(def a true)
(def b false)
(def c 1)
(def d 2)
(&& a b)
(|| a b)
(! a)
(== c d)
(!= c d)

/* Arithmetic Operators */
(def a 1)
(def b 2)
(+ a b)
(- a b)
(* a b)
(/ a b)
(% a b)
(^ a b)

/* Bitwise Operators */
(def a 1)
(def b 2)
(~ a)
(<< a b)
(>> a b)
(>>> a b)
```

### Built-in Functions

**artemis** supports built-in functions.

```rs
(def a [1, 2, 3])
(print "Hello World") /* prints to stdout */
(println "Hello World") /* prints to stdout without a newline */
(push a 1) /* pushes an element to a list */
(pop a) /* pops an element from a list */
(def l (length a)) /* returns the length of a list */
(log l)
(fn add [l] ((+ l 1)))
(def m (map a add)) /* maps a function to a list */
(log a)
(def hi "hi")
(def hi (toUpperCase hi))
(log hi)
(println (repeat hi 2))

/* read files */
(def fileContent (readFile "README.md"))
(println fileContent)
(writeFile "bambo.md" "Hello World!")

/* many other built-ins ... */
```

```bash
# Output
"Hello World"
"Hello World"
3
[ 1, 2, 3 ]
"HI"
"HIHI"
```

### JS-Interop

**artemis** supports js-interop.

```rs
(js $
  const a = 12;
  const b = 23;
  const c = a + b;
  console.log(c);
  const d = "Hello World";
  console.log(d);
$)
```

```bash
# Output
35
Hello World
```

also you can return values from the js block like this:

```rs
(def a (js $ 12 $))
(println a)
```

```bash
# Output
12
```

### Accessors

**artemis** supports accessors.

```rs
/* The global Math object */
(def random (get Math "random"))
/* Or you can use the get method of the global object */
(def random (get global "Math.random"))

(fn rand [n] ((* n (random))))
(def a (rand 100))
(println a)

/* The Date object */
(def now (get global "Date.now"))
(println (now))

(def env (get global "process.env"))
(println (get env "HOME"))

/* You can also set properties on the global object */
(def a {a: 1})
(set a "b" 2)
(println (get a "b"))
```

```bash
# Output
18.442008509443617 # this is a random number
1696641969822 # this is the current timestamp
/Users/artemis # this is my home directory
2 # this is the value of the property "b" on the map "a"
```

## Examples

You can find examples in the [examples](https://github.com/triyanox/artemis/blob/main/examples/) directory.

here some examples:

- [Hello World](https://github.com/triyanox/artemis/blob/main/examples/hello-word.art)
- [Word Occurrences](https://github.com/triyanox/artemis/blob/main//examples/word-occurrences.art)
- [Fibonacci Sequence](https://github.com/triyanox/artemis/blob/main//examples/fib-seq.art)
- [Files](https://github.com/triyanox/artemis/blob/main//examples/fs.art)
- [FizzBuzz](https://github.com/triyanox/artemis/blob/main//examples/fizz-buzz.art)

## License

[MIT](https://github.com/triyanox/artemis/blob/main/LICENSE)
