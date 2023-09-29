import NativeFn from './native-fn';

const has = new NativeFn('has', (_interpreter, args) => {
  if (args.length !== 2) {
    throw new TypeError(`has expected 2 arguments, got ${args.length}`);
  }

  if (!(args[0] instanceof Map)) {
    throw new TypeError(`has expected a Map as first argument, got ${typeof args[0]}`);
  }

  const map = args[0];
  const key = args[1];
  return map.has(key);
});

export default has;
