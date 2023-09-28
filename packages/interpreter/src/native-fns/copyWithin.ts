import NativeFn from './native-fn';

const copyWithin = new NativeFn('copyWithin', (_interpreter, args) => {
  const matcherMap = {
    array: {
      matcher: (args: any[]) => Array.isArray(args[0]),
      fn: (args: any[]) => args[0].copyWithin(args[1], args[2], args[3])
    },
    string: {
      matcher: (args: any[]) => typeof args[0] === 'string',
      fn: (args: any[]) => args[0].copyWithin(args[1], args[2], args[3])
    },
    set: {
      matcher: (args: any[]) => args[0] instanceof Set,
      fn: (args: any[]) =>
        new Set(Array.from(args[0].values()).copyWithin(args[1], args[2], args[3]))
    },
    map: {
      matcher: (args: any[]) => args[0] instanceof Map,
      fn: (args: any[]) =>
        new Map(
          //@ts-ignore
          Array.from(args[0].entries()).copyWithin(args[1], args[2], args[3])
        )
    },
    number: {
      matcher: (args: any[]) => typeof args[0] === 'number',
      fn: (args: any[]) => args[0].toString().copyWithin(args[1], args[2], args[3])
    }
  };
  const match = Object.values(matcherMap).find((matcher) => matcher.matcher(args));
  if (match) {
    return match.fn(args);
  }
  throw new Error(`Cannot copyWithin '${args[0]}'`);
});

export default copyWithin;
