import NativeFn from './native-fn';

const replaceAll = new NativeFn('replaceAll', (_interpreter, args) => {
  if (!args || args?.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args?.length ?? 0} in "replaceAll function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "replaceAll function"');
  }
  if (typeof args[1] !== 'string') {
    throw new Error('Expected a string as second argument in "replaceAll function"');
  }
  if (typeof args[2] !== 'string') {
    throw new Error('Expected a string as third argument in "replaceAll function"');
  }
  return args[0].replaceAll(args[1], args[2]);
});

export default replaceAll;
