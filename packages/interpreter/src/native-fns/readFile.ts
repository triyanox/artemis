import NativeFn from './native-fn';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const readFile = new NativeFn('readFile', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "readFile function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "readFile function"');
  }
  return readFileSync(resolve(args[0]), 'utf8');
});

export default readFile;
