import NativeFn from './native-fn';

const assertEq = new NativeFn('assertEq', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "assertEq function"`);
  }
  if (args[0] !== args[1]) {
    throw new Error(`Assertion failed: ${args[0]} !== ${args[1]}`);
  }
});

export default assertEq;
