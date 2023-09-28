import NativeFn from './native-fn';

const length = new NativeFn('length', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "length function"`);
  }
  if (typeof args[0] === 'string') {
    return args[0].length;
  }
  if (Array.isArray(args[0])) {
    return args[0].length;
  }
  throw new Error(`Expected string or array, got ${typeof args[0]} in "length function"`);
});

export default length;
