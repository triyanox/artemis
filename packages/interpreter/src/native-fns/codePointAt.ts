import NativeFn from './native-fn';

const codePointAt = new NativeFn('codePointAt', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "codePointAt function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "codePointAt function"');
  }
  if (typeof args[1] !== 'number') {
    throw new Error('Expected a number as second argument in "codePointAt function"');
  }
  return args[0].codePointAt(args[1]);
});

export default codePointAt;
