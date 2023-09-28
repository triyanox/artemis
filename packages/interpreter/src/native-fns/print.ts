import NativeFn from './native-fn';

const print = new NativeFn('print', (_interpreter, args) => {
  if (args) {
    process.stdout.write(args.join(' '));
  }
});

export default print;
