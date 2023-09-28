import NativeFn from './native-fn';

const repeat = new NativeFn('repeat', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "repeat function"`);
  }
  if (typeof args[0] !== 'string') {
    throw new Error('Expected a string as first argument in "repeat function"');
  }
  if (typeof args[1] !== 'number') {
    throw new Error('Expected a number as second argument in "repeat function"');
  }
  return args[0].repeat(args[1]);
});

export default repeat;
