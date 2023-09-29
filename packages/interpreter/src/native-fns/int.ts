import NativeFn from './native-fn';

const int = new NativeFn('int', (_interpreter, args) => {
  if (!args || args.length !== 1) {
    throw new Error(`Expected 1 argument for "int" function got ${args.length}`);
  }
  return parseInt(args[0]);
});

export default int;
