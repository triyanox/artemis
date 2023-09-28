import NativeFn from './native-fn';

const assertLte = new NativeFn('assertLte', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "assertLte function"`);
  }
  if (!(args[0] <= args[1])) {
    throw new Error('Assertion failed');
  }
});

export default assertLte;
