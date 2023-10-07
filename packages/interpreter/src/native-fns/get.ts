import NativeFn from './native-fn';

const get = new NativeFn('get', (_interpreter, args) => {
  const target = args[0];
  const accessor = args[1];
  const matchers = {
    array: {
      match: (arr: any) => Array.isArray(arr),
      access: (arr: any, acc: any) => {
        if (!acc || !Number.isInteger(acc)) {
          throw 'Expected a number as second argument for List getter';
        }
        return Array(arr).at(acc);
      }
    },
    map: {
      match: (map: any) => map instanceof Map,
      access: (map: any, acc: any) => {
        if (!acc) {
          throw 'Expected a key as second argument for Map getter';
        }
        const keys = acc.split('.');
        let value = map;
        for (const key of keys) {
          value = value.get(key);
          if (value === undefined) {
            throw `Key '${key}' not found in Map`;
          }
        }
        return value;
      }
    },
    object: {
      match: (obj: any) => typeof obj === 'object',
      access: (obj: any, acc: any) => {
        if (!acc) {
          throw 'Expected a key as second argument for Object getter';
        }
        const keys = acc.split('.');
        let value = obj;
        for (const key of keys) {
          value = value[key];
          if (value === undefined) {
            throw `Key '${key}' not found in Object`;
          }
        }
        return value;
      }
    },
    string: {
      match: (str: any) => typeof str === 'string',
      access: (str: any, acc: any) => {
        if (!acc || !Number.isInteger(acc)) {
          throw 'Expected a number as second argument for String getter';
        }
        return str.charAt(acc);
      }
    }
  };
  const matcher = Object.values(matchers).find((m) => m.match(target));
  if (!matcher) {
    throw 'Expected a valid target for get';
  }
  return matcher.access(target, accessor);
});
export default get;
