import NativeFn from './native-fn';

const set = new NativeFn('set', (_interpreter, args) => {
  if (args.length !== 3) {
    throw new TypeError(`set expected 3 arguments, got ${args.length}`);
  }
  if (!(args[0] instanceof Map)) {
    throw new TypeError(`set expected a Map as first argument, got ${typeof args[0]}`);
  }
  const map = args[0];
  const key = args[1];
  const value = args[2];

  map.set(key, value);

  return map;
});

export default set;
