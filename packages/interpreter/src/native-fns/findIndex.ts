import NativeFn from './native-fn';

const findIndex = new NativeFn('findIndex', (_interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "findIndex function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error('Expected a list as first argument in "findIndex function"');
  }
  return args[0].findIndex((item) => item === args[1]);
});

export default findIndex;
