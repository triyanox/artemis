import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const binaryExpressionDefPlugin = new ParserPlugin(
  (parser) => {
    const binopSyms = [
      '+',
      '-',
      '*',
      '/',
      '%',
      '^',
      '>',
      '<',
      '>=',
      '<=',
      '==',
      '!=',
      '&&',
      '||',
      '??',
      '=>',
      '>>',
      '<<',
      '>>>'
    ];
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'lp' &&
      parser.nextByType(4) === 'operator' &&
      binopSyms.includes(parser.nextBy(4).text)
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    parser.consume('lp', 'Expected left parenthesis');
    const operator = parser.consume('operator', 'Expected operator');
    const left = parser.parseExpression();
    const right = parser.parseExpression();
    parser.consume('rp', 'Expected right parenthesis');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.BinaryExpression,
      name: name.value,
      operator: operator.value,
      left: left,
      right: right
    };
  }
);

export default binaryExpressionDefPlugin;
