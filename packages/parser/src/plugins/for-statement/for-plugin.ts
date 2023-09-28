import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const forPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.match('lp') &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextBy(1).value === 'for' &&
      parser.nextByType(2) === 'lbk'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    parser.consume('lbk', 'Expected left bracket');
    const index = parser.consume('identifier', 'Expected identifier');
    const start = parser.consume('number', 'Expected number');
    const end = parser.consume('number', 'Expected number');
    const step = parser.match('number') ? parser.consume('number', 'Expected number') : null;
    parser.consume('rbk', 'Expected right bracket');
    parser.consume('lp', 'Expected left parenthesis');
    const body = [];
    while (parser.peek().type !== 'rp' && !parser.isAtEnd()) {
      body.push(parser.parseExpression());
    }
    parser.consume('rp', 'Expected right parenthesis');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.For,
      index: index.value,
      start: start.value,
      end: end.value,
      step: step ? step.value : null,
      body: body
    };
  }
);

export default forPlugin;
