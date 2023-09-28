import NativeFn from './native-fn';

const shift = new NativeFn('shift', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "shift function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error('Expected a list as first argument in "shift function"');
  }
  return args[0].shift();
});

export default shift;
