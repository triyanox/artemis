import NativeFn from './native-fn';

const charAt = new NativeFn('charAt', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "charAt function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "charAt function"');
  }
  if (typeof args[1] !== 'number') {
    throw new Error('Expected a number as second argument in "charAt function"');
  }
  return args[0].charAt(args[1]);
});

export default charAt;
