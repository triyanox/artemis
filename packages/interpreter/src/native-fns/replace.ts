import NativeFn from './native-fn';

const replace = new NativeFn('replace', (_interpreter, args) => {
  if (!args || args?.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args?.length ?? 0} in "replace function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "replace function"');
  }
  if (typeof args[1] !== 'string') {
    throw new Error('Expected a string as second argument in "replace function"');
  }
  if (typeof args[2] !== 'string') {
    throw new Error('Expected a string as third argument in "replace function"');
  }
  return args[0].replace(args[1], args[2]);
});

export default replace;
