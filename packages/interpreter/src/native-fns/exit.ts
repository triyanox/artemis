import NativeFn from './native-fn';

const exit = new NativeFn('exit', (interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "exit function"`);
  }
  process.exit(args[0]);
});

export default exit;
