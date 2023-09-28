#! /usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_interpreter = __toESM(require("@artemis-lang/interpreter"));
var import_chalk = __toESM(require("chalk"));
var import_fs = __toESM(require("fs"));
var import_yargs = __toESM(require("yargs"));
var import_helpers = require("yargs/helpers");
console.info(
  import_chalk.default.hex("#f423f4")(`
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
    return `${import_chalk.default.hex("#f423f4")(">  ")}${import_chalk.default.greenBright(arg)}`;
  });
  cl.apply(console, newArgs);
};
var filePath = (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).command(
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
    import_fs.default.readFile(filePath2, "utf8", (err, data) => {
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
    import_interpreter.default.interpret(data);
  } catch (ex) {
    if (ex instanceof Error) {
      console.error("\n", import_chalk.default.redBright(ex.stack));
    }
  }
}
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
});
interpretFile(filePath);
