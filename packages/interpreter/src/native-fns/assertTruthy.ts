import NativeFn from './native-fn';

const assertTruthy = new NativeFn('assertTruthy', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "assertTruthy function"`);
  }
  if (!args[0]) {
    throw new Error('Assertion failed');
  }
});

export default assertTruthy;
