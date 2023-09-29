import NativeFn from './native-fn';

const del = new NativeFn('del', (_interpreter, args) => {
  if (args.length !== 2) {
    throw new TypeError(`del expected 2 arguments, got ${args.length}`);
  }

  if (args[0] instanceof Map) {
    const map = args[0];
    const key = args[1];
    map.delete(key);
    return map;
  }

  if (Array.isArray(args[0])) {
    const list = args[0];
    const index = args[1];
    list.splice(index, 1);
    return list;
  }

  if (typeof args[0] === 'string') {
    const str = args[0];
    const index = args[1];
    return str.slice(0, index) + str.slice(index + 1);
  }

  throw new TypeError(
    `del expected a Map, List or String as first argument, got ${typeof args[0]}`
  );
});

export default del;
