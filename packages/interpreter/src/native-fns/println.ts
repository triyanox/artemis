import NativeFn from './native-fn';

const println = new NativeFn('println', (_interpreter, args) => {
  if (args) {
    process.stdout.write(args.join(' ') + '\n');
  }
});

export default println;
