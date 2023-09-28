#! /usr/bin/env node
import Interpreter from '@artemis/interpreter';
import chalk from 'chalk';
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

console.info(
  chalk.hex('#f423f4')(`
 _____     _             _
|  _  |___| |_ ___ _____|_|___
|     |  _|  _| -_|     | |_ -|
|__|__|_| |_| |___|_|_|_|_|___|

https://github.com/triyanox/artemis
`)
);

const cl = console.log;

console.log = function (...args: any[]) {
  const newArgs = args.map((arg) => {
    return `${chalk.hex('#f423f4')('>  ')}${chalk.greenBright(arg)}`;
  });
  cl.apply(console, newArgs);
};

const filePath = yargs(hideBin(process.argv))
  .command(
    '<filepath>',
    'Interpretes the code and prints to stdout',
    () => {},
    (argv) => {
      console.info(argv);
    }
  )
  // @ts-ignore
  .demandCommand(1).argv._[0];

async function readFileAsync(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function interpretFile(filePath: string): Promise<void> {
  try {
    const data = await readFileAsync(filePath);
    Interpreter.interpret(data);
  } catch (ex) {
    if (ex instanceof Error) {
      console.error('\n', chalk.redBright(ex.stack));
    }
  }
}

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
});

interpretFile(filePath);
