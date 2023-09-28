import NativeFn from './native-fn';

const trimStart = new NativeFn('trimStart', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "trimStart function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "trimStart function"');
  }
  return args[0].trimStart();
});

export default trimStart;
