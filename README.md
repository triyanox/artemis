# **artemis** - A simple, easy to learn, and easy to use programming language written in typescript.

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
  - [Export/Import](#exportimport)
  - [JS-Interop](#js-interop)

## Installation

```bash
npm install -g @artemis-lang/cli
```

## Usage

```bash
artemis <file>
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

This is a list of built-in functions:

- `print`: Prints a message to the console without a newline.
- `println`: Prints a message to the console with a newline.
- `exit`: Exits the program with a given exit code.
- `log`: Logs a message to the console with a given log level.
- `assert`: Throws an error if a given condition is not true.
- `assertEq`: Throws an error if two values are not equal.
- `assertGt`: Throws an error if a value is not greater than another value.
- `assertLt`: Throws an error if a value is not less than another value.
- `assertGte`: Throws an error if a value is not greater than or equal to another value.
- `assertLte`: Throws an error if a value is not less than or equal to another value.
- `assertTruthy`: Throws an error if a value is not truthy.
- `assertFalsy`: Throws an error if a value is not falsy.
- `assertThrows`: Throws an error if a function does not throw an error.
- `assertNotThrows`: Throws an error if a function throws an error.
- `length`: Returns the length of an array or string.
- `at`: Returns the element at a given index in an array or string.
- `push`: Adds an element to the end of an array.
- `pop`: Removes and returns the last element of an array.
- `remove`: Removes an element at a given index from an array.
- `keys`: Returns an array of keys in an object.
- `values`: Returns an array of values in an object.
- `shift`: Removes and returns the first element of an array.
- `unshift`: Adds an element to the beginning of an array.
- `includes`: Returns true if an array or string includes a given element.
- `slice`: Returns a new array or string with a portion of the original array or string.
- `splice`: Changes an array by removing or replacing elements.
- `concat`: Returns a new array that is the result of joining two or more arrays.
- `reverse`: Reverses the order of elements in an array.
- `sort`: Sorts the elements of an array.
- `join`: Joins the elements of an array into a string.
- `split`: Splits a string into an array of substrings.
- `trim`: Removes whitespace from the beginning and end of a string.
- `trimStart`: Removes whitespace from the beginning of a string.
- `trimEnd`: Removes whitespace from the end of a string.
- `replace`: Replaces a substring in a string with another substring.
- `replaceAll`: Replaces all occurrences of a substring in a string with another substring.
- `toLowerCase`: Converts a string to lowercase.
- `toUpperCase`: Converts a string to uppercase.
- `charAt`: Returns the character at a given index in a string.
- `charCodeAt`: Returns the Unicode value of the character at a given index in a string.
- `codePointAt`: Returns the Unicode code point of the character at a given index in a string.
- `padEnd`: Pads a string with a given character until it reaches a given length.
- `padStart`: Pads a string with a given character until it reaches a given length, starting from the beginning of the string.
- `repeat`: Returns a new string that repeats a given string a given number of times.
- `startsWith`: Returns true if a string starts with a given substring.
- `endsWith`: Returns true if a string ends with a given substring.
- `find`: Returns the first element in an array that satisfies a given condition.
- `findIndex`: Returns the index of the first element in an array that satisfies a given condition.
- `indexOf`: Returns the index of the first occurrence of a given element in an array or string.
- `lastIndexOf`: Returns the index of the last occurrence of a given element in an array or string.
- `map`: Returns a new array that is the result of applying a given function to each element of an array.
- `filter`: Returns a new array that contains only the elements of an array that satisfy a given condition.
- `reduce`: Applies a given function to each element of an array, accumulating a single value.
- `reduceRight`: Applies a given function to each element of an array in reverse order, accumulating a single value.
- `some`: Returns true if at least one element of an array satisfies a given condition.
- `every`: Returns true if all elements of an array satisfy a given condition.
- `fill`: Changes all elements of an array to a given value.
- `copyWithin`: Copies a portion of an array to another location in the same array.

### Export/Import

**artemis** supports exporting and importing variables and functions.

```rs
/* export */
(def a 1)
(def b 2)
(def c 3)

(export a b c)
```

```rs
/* import */
(import "file.artemis" [a b c])
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
