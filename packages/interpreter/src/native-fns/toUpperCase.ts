import NativeFn from './native-fn';

const toUpperCase = new NativeFn('toUpperCase', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "toUpperCase function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "toUpperCase function"');
  }
  return args[0].toUpperCase();
});

export default toUpperCase;
