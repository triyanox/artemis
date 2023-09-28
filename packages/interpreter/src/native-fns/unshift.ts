import NativeFn from './native-fn';

const unshift = new NativeFn('unshift', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "unshift function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error('Expected a list as first argument in "unshift function"');
  }
  return args[0].unshift(args[1]);
});

export default unshift;
