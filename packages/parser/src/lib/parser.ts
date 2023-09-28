import { Token } from 'moo';
import IParserPlugin from '../types/parser-plugin';
import NodeTypes from '../node/node-types';
import Program from '../types/program';
import error from '../error';
import plugins from '../plugins';
import Lexer from '@artemis-lang/lexer/src';

class Parser {
  tokens: Token[];
  current: number;
  plugins: IParserPlugin[];
  input: string;
  constructor(lexer: Lexer) {
    this.tokens = this.init(lexer.tokenize().tokens);
    this.input = lexer.code;
    this.current = 0;
    this.plugins = plugins;
  }

  init(tokens: moo.Token[]) {
    return tokens.filter(
      (v) =>
        v.type !== 'ws' &&
        v.type !== 'nl' &&
        v.type !== 'multilineComment' &&
        v.type !== 'singlelineComment'
    );
  }

  isAtEnd() {
    return this.current >= this.tokens.length;
  }

  isAtStart() {
    return this.current <= 0;
  }

  peek() {
    return this.tokens[this.current];
  }

  previous() {
    return this.tokens[this.current - 1];
  }

  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  match(type: string, value?: string) {
    if (this.isAtEnd()) return false;
    if (value) return this.peek().type === type && this.peek().value === value;
    return this.peek().type === type;
  }

  consume(type: string, message: string) {
    if (this.match(type)) return this.advance();
    throw error(message, this.peek(), this.input);
  }

  plugin(plugin: IParserPlugin) {
    this.plugins.push(plugin);
  }

  add(...plugins: IParserPlugin[]) {
    this.plugins.push(...plugins);
  }

  next() {
    if (!this.isAtEnd()) return this.tokens[this.current++];
    return this.tokens[this.current];
  }

  nextBy(n: number) {
    if (!this.isAtEnd()) return this.tokens[this.current + n];
    return this.tokens[this.current];
  }

  nextByType(n: number) {
    return this.nextBy(n).type;
  }

  parse() {
    const program: Program = {
      type: NodeTypes.Program,
      body: []
    };

    while (!this.isAtEnd()) {
      program.body.push(this.parseExpression());
    }

    return program;
  }

  parseExpression() {
    for (const plugin of this.plugins) {
      if (plugin.matcher(this)) return plugin.handler(this);
    }
    throw error('Unexpected token', this.peek(), this.input);
  }
}

export default Parser;
