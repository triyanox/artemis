import NativeFn from './native-fn';

const assert = new NativeFn('assert', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "assert function"`);
  }
  if (!args[0]) {
    throw new Error('Assertion failed');
  }
});

export default assert;
