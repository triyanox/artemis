import NativeFn from './native-fn';

const assertGte = new NativeFn('assertGte', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "assertGte function"`);
  }
  if (!(args[0] >= args[1])) {
    throw new Error('Assertion failed');
  }
});

export default assertGte;
