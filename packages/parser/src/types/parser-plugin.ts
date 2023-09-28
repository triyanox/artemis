import Parser from '../lib/parser';
import Node from './node';

interface IParserPlugin<T extends Node = Node> {
  matcher: (parser: Parser) => boolean;
  handler: (parser: Parser) => T;
}

export type ParserPluginOptions = {};
export default IParserPlugin;
