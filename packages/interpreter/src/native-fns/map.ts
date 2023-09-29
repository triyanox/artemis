import { NodeType } from '@artemis-lang/parser';
import Environment from '../env';
import Fn from '../lib/constructs/function';
import NativeFn from './native-fn';

const map = new NativeFn('map', (interpreter, args: Array<NodeType<'Fn'>>) => {
  const fnNode = args[1];
  const fn = new Fn(fnNode.args, fnNode.body, new Environment(interpreter.global));
  const matcherMap = {
    array: {
      matcher: (args: any[]) => Array.isArray(args[0]),
      fn: (args: any[]) => args[0].map((arg: any) => fn.call([arg]))
    },
    string: {
      matcher: (args: any[]) => typeof args[0] === 'string',
      fn: (args: any[]) => args[0].map((arg: any) => fn.call([arg]))
    },
    set: {
      matcher: (args: any[]) => args[0] instanceof Set,
      fn: (args: any[]) =>
        // @ts-ignore
        new Set(Array.from(args[0].values()).map((arg: any) => fn.call([arg])))
    },
    map: {
      matcher: (args: any[]) => args[0] instanceof Map,
      fn: (args: any[]) =>
        // @ts-ignore
        new Map(Array.from(args[0].entries()).map((arg: any) => fn.call([arg])))
    },
    number: {
      matcher: (args: any[]) => typeof args[0] === 'number',
      fn: (args: any[]) => args[0].toString().map((arg: any) => fn.call([arg]))
    }
  };
  const match = Object.values(matcherMap).find((matcher) => matcher.matcher(args));
  if (match) {
    return match.fn(args);
  }
  throw new Error(`Cannot map '${args[0]}'`);
});

export default map;
