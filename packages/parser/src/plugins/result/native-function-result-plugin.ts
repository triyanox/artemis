import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const nativeFnRsultPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.match('lp') &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextBy(1).value === 'def' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'lp' &&
      parser.nextByType(4) === 'nativeFn'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    parser.consume('lp', 'Expected left parenthesis');
    const fnName = parser.consume('nativeFn', 'Expected native function call');
    const params = [];
    while (parser.peek().type !== 'rp' && !parser.isAtEnd()) {
      params.push(parser.parseExpression());
    }
    parser.consume('rp', 'Expected right parenthesis');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.NativeFnResult,
      name: name.value,
      nativeFn: fnName.value,
      params: params
    };
  }
);

export default nativeFnRsultPlugin;
