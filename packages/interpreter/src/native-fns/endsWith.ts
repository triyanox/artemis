import NativeFn from './native-fn';

const endsWith = new NativeFn('endsWith', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "endsWith function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "endsWith function"');
  }
  if (typeof args[1] !== 'string') {
    throw new Error('Expected a string as second argument in "endsWith function"');
  }
  return args[0].endsWith(args[1]);
});

export default endsWith;
