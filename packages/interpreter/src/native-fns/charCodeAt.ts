import NativeFn from './native-fn';

const charCodeAt = new NativeFn('charCodeAt', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "charCodeAt function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "charCodeAt function"');
  }
  if (typeof args[1] !== 'number') {
    throw new Error('Expected a number as second argument in "charCodeAt function"');
  }
  return args[0].charCodeAt(args[1]);
});

export default charCodeAt;
