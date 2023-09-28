import NativeFn from './native-fn';

const pop = new NativeFn('pop', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "pop function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error('Expected a list as first argument in "pop function"');
  }
  return args[0].pop();
});

export default pop;
