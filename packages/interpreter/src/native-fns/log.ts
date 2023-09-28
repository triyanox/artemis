import NativeFn from './native-fn';

const log = new NativeFn('log', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "log function"`);
  }
  console.log(args[0]);
});

export default log;
