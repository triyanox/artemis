import Parser from '../lib/parser';
import Node from '../types/node';
import IParserPlugin, { ParserPluginOptions } from '../types/parser-plugin';

class ParserPlugin<T extends Node = Node> implements IParserPlugin<T> {
  matcher: (parser: Parser) => boolean;
  handler: (parser: Parser) => T;

  constructor(
    matcher: (parser: Parser) => boolean,
    handler: (parser: Parser) => T,
    _options?: ParserPluginOptions
  ) {
    this.matcher = matcher;
    this.handler = handler;
  }
}

export default ParserPlugin;
