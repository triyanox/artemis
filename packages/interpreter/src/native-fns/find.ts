import NativeFn from './native-fn';

const find = new NativeFn('find', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "find function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "find function"');
  }
  if (typeof args[1] !== 'string') {
    throw new Error('Expected a string as second argument in "find function"');
  }
  return args[0].indexOf(args[1]);
});

export default find;
