import NativeFn from './native-fn';

const indexOf = new NativeFn('indexOf', (_interpreter, args) => {
  const matcherMap = {
    array: {
      matcher: (args: any[]) => Array.isArray(args[0]),
      fn: (args: any[]) => args[0].indexOf(args[1])
    },
    string: {
      matcher: (args: any[]) => typeof args[0] === 'string',
      fn: (args: any[]) => args[0].indexOf(args[1])
    },
    set: {
      matcher: (args: any[]) => args[0] instanceof Set,
      fn: (args: any[]) => Array.from(args[0].values()).indexOf(args[1])
    },
    map: {
      matcher: (args: any[]) => args[0] instanceof Map,
      fn: (args: any[]) => Array.from(args[0].entries()).indexOf(args[1])
    },
    number: {
      matcher: (args: any[]) => typeof args[0] === 'number',
      fn: (args: any[]) => args[0].toString().indexOf(args[1])
    }
  };
  const match = Object.values(matcherMap).find((matcher) => matcher.matcher(args));
  if (match) {
    return match.fn(args);
  }
  throw new Error(`Cannot execute \"at\" on '${args[0]}'`);
});

export default indexOf;
