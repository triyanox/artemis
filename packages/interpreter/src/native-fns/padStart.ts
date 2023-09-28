import NativeFn from './native-fn';

const padStart = new NativeFn('padStart', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "padStart function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "padStart function"');
  }
  if (typeof args[1] !== 'number') {
    throw new Error('Expected a number as second argument in "padStart function"');
  }
  return args[0].padStart(args[1]);
});

export default padStart;
