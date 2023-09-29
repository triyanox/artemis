import NativeFn from './native-fn';

const sqrt = new NativeFn('sqrt', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "sqrt function"`);
  }
  if (typeof args[0] !== 'number') {
    throw new Error('Expected a number as first argument in "sqrt function"');
  }
  return Math.sqrt(args[0]);
});

export default sqrt;
