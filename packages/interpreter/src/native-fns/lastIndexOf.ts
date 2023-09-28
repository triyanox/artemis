import NativeFn from './native-fn';

const lastIndexOf = new NativeFn('lastIndexOf', (_interpreter, args) => {
  const matchMap = {
    string: (args: any) => {
      if (!args || args?.length !== 2) {
        throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "lastIndexOf function"`);
      }
      if (typeof args[0] !== 'string') {
        throw new Error('Expected a string as first argument in "lastIndexOf function"');
      }
      if (typeof args[1] !== 'string') {
        throw new Error('Expected a string as second argument in "lastIndexOf function"');
      }
      return args[0].lastIndexOf(args[1]);
    },
    array: (args: any) => {
      if (!args || args?.length !== 2) {
        throw new Error(`Expected 2 arguments, got ${args?.length ?? 0} in "lastIndexOf function"`);
      }
      if (!Array.isArray(args[0])) {
        throw new Error('Expected a list or string as first argument in "lastIndexOf function"');
      }
      return args[0].lastIndexOf(args[1]);
    }
  };
  if (typeof args[0] === 'string') {
    return matchMap.string(args);
  }
  if (Array.isArray(args[0])) {
    return matchMap.array(args);
  }
});

export default lastIndexOf;
