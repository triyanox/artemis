import { NodeType } from '@artemis-lang/parser';
import Environment from '../env';
import Fn from '../lib/constructs/function';
import NativeFn from './native-fn';

const filter = new NativeFn('filter', (interpreter, args) => {
  const fnNode: NodeType<'Fn'> = args[1];
  const fn = new Fn(fnNode.args, fnNode.body, new Environment(interpreter.global));
  const matcherMap = {
    array: {
      matcher: (args: any[]) => Array.isArray(args[0]),
      fn: (args: any[]) => args[0].filter((arg: any) => fn.call([arg]))
    },
    string: {
      matcher: (args: any[]) => typeof args[0] === 'string',
      fn: (args: any[]) => args[0].filter((arg: any) => fn.call([arg]))
    },
    set: {
      matcher: (args: any[]) => args[0] instanceof Set,
      fn: (args: any[]) =>
        // @ts-ignore
        new Set(Array.from(args[0].values()).filter((arg: any) => fn.call([arg])))
    },
    map: {
      matcher: (args: any[]) => args[0] instanceof Map,
      fn: (args: any[]) =>
        new Map(
          // @ts-ignore
          Array.from(args[0].entries()).filter((arg: any) => fn.call([arg]))
        )
    },
    number: {
      matcher: (args: any[]) => typeof args[0] === 'number',
      fn: (args: any[]) => args[0].toString().filter((arg: any) => fn.call([arg]))
    }
  };
  const match = Object.values(matcherMap).find((matcher) => matcher.matcher(args));
  if (match) {
    return match.fn(args);
  }
  throw new Error(`Cannot filter '${args[0]}'`);
});

export default filter;
