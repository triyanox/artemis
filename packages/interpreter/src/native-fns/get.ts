import NativeFn from './native-fn';

const get = new NativeFn('get', (_interpreter, args) => {
  if (args.length !== 2) {
    throw new TypeError(`get expected 2 arguments, got ${args.length}`);
  }

  if (!(args[0] instanceof Map)) {
    throw new TypeError(`get expected a Map as first argument, got ${typeof args[0]}`);
  }

  const map = args[0];
  const key = args[1];
  return map.get(key);
});

export default get;
