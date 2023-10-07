import NativeFn from './native-fn';

const set = new NativeFn('set', (interpreter, args) => {
  const target = args[0];
  const accessor = args[1];
  const value = args[2];
  const matchers = {
    map: {
      match: (map: any) => map instanceof Map,
      access: (map: any, acc: any) => {
        if (!acc) {
          throw 'Expected a key as second argument for Map setter';
        }
        const keys = acc.split('.');
        let currentMap = map;
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          let nextMap = currentMap.get(key);
          if (nextMap === undefined) {
            nextMap = new Map();
            currentMap.set(key, nextMap);
          }
          currentMap = nextMap;
        }
        currentMap.set(keys[keys.length - 1], value);
        return value;
      }
    },
    object: {
      match: (obj: any) => typeof obj === 'object',
      access: (obj: any, acc: any) => {
        if (!acc) {
          throw 'Expected a key as second argument for Object setter';
        }
        const keys = acc.split('.');
        let currentObj = obj;
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          let nextObj = currentObj[key];
          if (nextObj === undefined) {
            nextObj = {};
            currentObj[key] = nextObj;
          }
          currentObj = nextObj;
        }
        currentObj[keys[keys.length - 1]] = value;
        return value;
      }
    }
  };
  const matcher = Object.values(matchers).find((m) => m.match(target));
  if (!matcher) {
    throw 'Expected a valid target for set';
  }
  return matcher.access(target, accessor);
});

export default set;
