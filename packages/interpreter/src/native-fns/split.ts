import NativeFn from './native-fn';

const split = new NativeFn('split', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "split function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "split function"');
  }
  if (typeof args[1] !== 'string') {
    throw new Error('Expected a string as second argument in "split function"');
  }
  return args[0].split(args[1]);
});

export default split;
