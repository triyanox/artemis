import NativeFn from './native-fn';

const padEnd = new NativeFn('padEnd', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "padEnd function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "padEnd function"');
  }
  if (typeof args[1] !== 'number') {
    throw new Error('Expected a number as second argument in "padEnd function"');
  }
  return args[0].padEnd(args[1]);
});

export default padEnd;
