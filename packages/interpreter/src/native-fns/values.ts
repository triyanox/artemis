import NativeFn from './native-fn';

const values = new NativeFn('values', (_interpreter, args) => {
  if (!args || args?.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args?.length ?? 0} in "values function"`);
  }
  if (typeof args[0] === 'string') {
    return args[0].split('');
  }
  if (Array.isArray(args[0])) {
    return args[0];
  }
  if (args[0] instanceof Map) {
    return Array.from(args[0].values());
  }
  throw new Error(`Expected string or array or map, got ${typeof args[0]} in "values function"`);
});

export default values;
