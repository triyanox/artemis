import NativeFn from './native-fn';

const startsWith = new NativeFn('startsWith', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "startsWith function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "startsWith function"');
  }
  if (typeof args[1] !== 'string') {
    throw new Error('Expected a string as second argument in "startsWith function"');
  }
  return args[0].startsWith(args[1]);
});

export default startsWith;
