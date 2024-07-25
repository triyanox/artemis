# `Artemis`: the fun-sized ts-powered script machine

## what's in the box?
- easy to learn (we promise)
- general purpose (like a swiss army knife)
- built on typescript (because why not?)

## how to get it
```bash
npm install -g @artemis-lang/cli
```

## how to play

```bash
 _____     _             _
|  _  |___| |_ ___ _____|_|___
|     |  _|  _| -_|     | |_ -|
|__|__|_| |_| |___|_|_|_|_|___|

https://github.com/triyanox/artemis

>  artemis <command> [options]

toys in the box:
  artemis run <file>             make it go
  artemis ast <file>             peek inside
  artemis lex <file>             see the building blocks
  artemis save-ast <file> <out>  keep the insides for later
  artemis save-lex <file> <out>  save the blocks for later

extras:
  --version  what version are we on?
  --help     help me, i'm lost
```

## the fun stuff

### talking to yourself
```rs
/* psst... secret message */
/* this one's
   really long */
```

### making things
```rs
(def b "ohai")           /* words */
(def c 1)                /* counting */
(def d true)             /* yes/no */
(def f [1, 2, 3])        /* lists */
(def g {a: 1, b: 2})     /* treasure maps */
(def h #[1, 2, 3])       /* unique lists */
(def bin 0b1010)         /* robot talk */
(def hex 0x12F)          /* wizard numbers */
```

### doing things
```rs
(fn add [a b] ((+ a b)))
(fn wrapper [] ((add 1 2)))
(def a (wrapper))
(println a)

(fn addTwo [a]((def sum (+ a 2))(return sum)))
(println (addTwo 1))
```

### making decisions
```rs
(if true ((println "yay!"))) 
(if true ((println "yay!")) (println "aww..."))
```

### going in circles
```rs
(def a 0)
(while ((< a 10)) ((println a)(def a (+ a 1))))

(for [i 10 20] ((println i)))
(for [i 20 30 2] ((println i)))
```

### playing matchmaker
```rs
(def a [])
(match a {
  1 : (println "one!"),
  2 : (for [i 0 10] ((println i))),
  3 : (for [i 0 10] (( def mul ( * (+ i 4 ) 3 ) ) (println mul) )),
  _ : (for [i 0 2] (
        (for [j 0 3] (
          (push a 69)
          (println "inner" j)
          (pop a)
        ))
        (push a 69)
        (println "outer" i)
        (pop a)
      ))
})
```

### math and logic toys
```rs
(&& true false)
(|| true false)
(! true)
(== 1 2)
(!= 1 2)

(+ 1 2)
(- 1 2)
(* 1 2)
(/ 1 2)
(% 1 2)
(^ 1 2)

(~ 1)
(<< 1 2)
(>> 1 2)
(>>> 1 2)
```

### built-in goodies
```rs
(def a [1, 2, 3])
(print "hi!")
(println "bye!")
(push a 1)
(pop a)
(def l (length a))
(log l)
(fn add [l] ((+ l 1)))
(def m (map a add))
(log a)
(def hi "hi")
(def hi (toUpperCase hi))
(log hi)
(println (repeat hi 2))

(def fileContent (readFile "README.md"))
(println fileContent)
(writeFile "bambo.md" "ohai!")
```

### playing with js
```rs
(js $
  const a = 12;
  const b = 23;
  const c = a + b;
  console.log(c);
  const d = "ohai";
  console.log(d);
$)

(def a (js $ 12 $))
(println a)
```

### grabbing things
```rs
(def random (get Math "random"))
(def random (get global "Math.random"))

(fn rand [n] ((* n (random))))
(def a (rand 100))
(println a)

(def now (get global "Date.now"))
(println (now))

(def env (get global "process.env"))
(println (get env "HOME"))

(def a {a: 1})
(set a "b" 2)
(println (get a "b"))
```

## show me more!
check out the [playgrounds](https://github.com/triyanox/artemis/blob/main/examples/)

## the boring stuff
[MIT](https://github.com/triyanox/artemis/blob/main/LICENSE) (but you can still have fun with it)
