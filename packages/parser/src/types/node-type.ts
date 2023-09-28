import NodeType from '../node/node-types';
import plugins from '../plugins';
import IParserPlugin from './parser-plugin';

type NodeType<T extends keyof typeof NodeType> = typeof plugins extends IParserPlugin<infer R>[]
  ? Extract<R, { type: T }>
  : never;

export default NodeType;
