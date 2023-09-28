#! /usr/bin/env node
import Interpreter from '@artemis-lang/interpreter';
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

yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command(
    'run <file>',
    'Interpret a file',
    (yargs) => {
      yargs.positional('file', {
        describe: 'The file to interpret',
        type: 'string'
      });
    },
    (argv) => {
      interpretFile(argv.file as string);
    }
  )
  .command(
    'ast <file>',
    'Print the AST of a file',
    (yargs) => {
      yargs.positional('file', {
        describe: 'The file to interpret',
        type: 'string'
      });
    },
    (argv) => {
      astFromFile(argv.file as string).then((ast) => {
        console.log(JSON.stringify(ast, null, 2));
      });
    }
  )
  .command(
    'lex <file>',
    'Print the lexemes of a file',
    (yargs) => {
      yargs.positional('file', {
        describe: 'The file to interpret',
        type: 'string'
      });
    },
    (argv) => {
      lexFromFile(argv.file as string).then((tokens) => {
        console.log(JSON.stringify(tokens, null, 2));
      });
    }
  )
  .command(
    'save-ast <file> <out>',
    'Save the AST of a file to a file',
    (yargs) => {
      yargs
        .positional('file', {
          describe: 'The file to interpret',
          type: 'string'
        })
        .positional('out', {
          describe: 'The file to save the AST to',
          type: 'string'
        });
    },
    (argv) => {
      saveAstToFile(argv.file as string, argv.out as string);
    }
  )
  .command(
    'save-lex <file> <out>',
    'Save the lexemes of a file to a file',
    (yargs) => {
      yargs
        .positional('file', {
          describe: 'The file to interpret',
          type: 'string'
        })
        .positional('out', {
          describe: 'The file to save the lexemes to',
          type: 'string'
        });
    },
    (argv) => {
      saveLexToFile(argv.file as string, argv.out as string);
    }
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .help().argv;

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

async function writeFileAsync(filePath: string, data: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
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

async function astFromFile(filePath: string) {
  try {
    const data = await readFileAsync(filePath);
    return Interpreter.ast(data);
  } catch (ex) {
    if (ex instanceof Error) {
      console.error('\n', chalk.redBright(ex.stack));
    }
  }
}

async function lexFromFile(filePath: string) {
  try {
    const data = await readFileAsync(filePath);
    return Interpreter.tokens(data);
  } catch (ex) {
    if (ex instanceof Error) {
      console.error('\n', chalk.redBright(ex.stack));
    }
  }
}

async function saveAstToFile(filePath: string, outPath: string) {
  try {
    const data = await readFileAsync(filePath);
    const ast = Interpreter.ast(data);
    await writeFileAsync(outPath, JSON.stringify(ast, null, 2));
  } catch (ex) {
    if (ex instanceof Error) {
      console.error('\n', chalk.redBright(ex.stack));
    }
  }
}

async function saveLexToFile(filePath: string, outPath: string) {
  try {
    const data = await readFileAsync(filePath);
    const tokens = Interpreter.tokens(data);
    await writeFileAsync(outPath, JSON.stringify(tokens, null, 2));
  } catch (ex) {
    if (ex instanceof Error) {
      console.error('\n', chalk.redBright(ex.stack));
    }
  }
}
