import NativeFn from './native-fn';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const writeFile = new NativeFn('writeFile', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "writeFile function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "writeFile function"');
  }
  if (typeof args[1] !== 'string') {
    throw new Error('Expected a string as second argument in "writeFile function"');
  }
  return writeFileSync(resolve(args[0]), args[1], 'utf8');
});

export default writeFile;
