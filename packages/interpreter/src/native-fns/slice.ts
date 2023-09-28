import NativeFn from './native-fn';

const slice = new NativeFn('slice', (_interpreter, args) => {
  if (!args || args?.length < 2 || args?.length > 3) {
    throw new Error(`Expected 2 or 3 arguments, got ${args?.length ?? 0} in "slice function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error('Expected a list as first argument in "slice function"');
  }
  if (typeof args[1] !== 'number' || (args[2] && typeof args[2] !== 'number')) {
    throw new Error('Expected a number as second and third argument in "slice function"');
  }
  return args[0].slice(args[1], args[2]);
});

export default slice;
