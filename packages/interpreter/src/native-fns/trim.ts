import NativeFn from './native-fn';

const trim = new NativeFn('trim', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "trim function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "trim function"');
  }
  return args[0].trim();
});

export default trim;
