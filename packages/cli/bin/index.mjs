#! /usr/bin/env node

// src/index.ts
import Interpreter from "@artemis-lang/interpreter";
import chalk from "chalk";
import fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
console.info(
  chalk.hex("#f423f4")(`
 _____     _             _
|  _  |___| |_ ___ _____|_|___
|     |  _|  _| -_|     | |_ -|
|__|__|_| |_| |___|_|_|_|_|___|

https://github.com/triyanox/artemis
`)
);
var cl = console.log;
console.log = function(...args) {
  const newArgs = args.map((arg) => {
    return `${chalk.hex("#f423f4")(">  ")}${chalk.greenBright(arg)}`;
  });
  cl.apply(console, newArgs);
};
var filePath = yargs(hideBin(process.argv)).command(
  "<filepath>",
  "Interpretes the code and prints to stdout",
  () => {
  },
  (argv) => {
    console.info(argv);
  }
).demandCommand(1).argv._[0];
async function readFileAsync(filePath2) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath2, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
async function interpretFile(filePath2) {
  try {
    const data = await readFileAsync(filePath2);
    Interpreter.interpret(data);
  } catch (ex) {
    if (ex instanceof Error) {
      console.error("\n", chalk.redBright(ex.stack));
    }
  }
}
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
});
interpretFile(filePath);
