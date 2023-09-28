import NativeFn from './native-fn';

const splice = new NativeFn('splice', (_interpreter, args) => {
  if (!args || args?.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args?.length ?? 0} in "splice function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error('Expected a list as first argument in "splice function"');
  }
  return args[0].splice(args[1], args[2]);
});

export default splice;
