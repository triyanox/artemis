import NativeFn from './native-fn';

const trimEnd = new NativeFn('trimEnd', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "trimEnd function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "trimEnd function"');
  }
  return args[0].trimEnd();
});

export default trimEnd;
