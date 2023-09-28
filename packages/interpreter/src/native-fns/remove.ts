import NativeFn from './native-fn';

const remove = new NativeFn('remove', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "remove function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected string as first argument');
  }
  if (typeof args[1] !== 'number') {
    throw new Error('Expected number as second argument');
  }
  return args[0].substring(0, args[1]) + args[0].substring(args[1] + 1);
});

export default remove;
