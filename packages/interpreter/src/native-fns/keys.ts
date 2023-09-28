import NativeFn from './native-fn';

const keys = new NativeFn('keys', (_interpreter, args) => {
  if (args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "keys function"`);
  }
  if (args[0] instanceof Map) {
    return Array.from(args[0].keys());
  }
  throw new Error('Expected map as first argument in "keys function"');
});

export default keys;
