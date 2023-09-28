import NodeType from '../../parser/types/node-type';
import Environment from '../env';
import Fn from '../lib/constructs/function';
import NativeFn from './native-fn';

const sort = new NativeFn('sort', (interpreter, args) => {
  const fnNode: NodeType<'Fn'> = args[0];
  const fn = new Fn(fnNode.args, fnNode.body, new Environment(interpreter.global));
  const matcherMap = {
    array: {
      matcher: (args: any[]) => Array.isArray(args[0]),
      fn: (args: any[]) => args[0].sort((a: any, b: any) => fn.call([a, b]))
    },
    string: {
      matcher: (args: any[]) => typeof args[0] === 'string',
      fn: (args: any[]) => args[0].sort((a: any, b: any) => fn.call([a, b]))
    },
    set: {
      matcher: (args: any[]) => args[0] instanceof Set,
      fn: (args: any[]) =>
        new Set(Array.from(args[0].values()).sort((a: any, b: any) => fn.call([a, b])))
    },
    map: {
      matcher: (args: any[]) => args[0] instanceof Map,
      fn: (args: any[]) =>
        new Map(
          // @ts-ignore
          Array.from(args[0].entries()).sort((a: any, b: any) => fn.call([a, b]))
        )
    },
    number: {
      matcher: (args: any[]) => typeof args[0] === 'number',
      fn: (args: any[]) => args[0].toString().sort((a: any, b: any) => fn.call([a, b]))
    }
  };
  const match = Object.values(matcherMap).find((matcher) => matcher.matcher(args));
  if (match) {
    return match.fn(args);
  }
  throw new Error(`Cannot sort '${args[0]}'`);
});

export default sort;
