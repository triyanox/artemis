import NativeFn from './native-fn';

const push = new NativeFn('push', (interpreter, args) => {
  if (!args || args?.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "push function"`);
  }
  if (!Array.isArray(args[0])) {
    throw new Error(`Expected a list as first argument in "push function"`);
  }
  args[0].push(args[1]);
});

export default push;
