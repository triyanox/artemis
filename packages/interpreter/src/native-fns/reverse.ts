import NativeFn from './native-fn';

const reverse = new NativeFn('reverse', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "reverse function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error('Expected a list as first argument in "reverse function"');
  }
  return args[0].reverse();
});

export default reverse;
