import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const binaryExpressionPlugin = new ParserPlugin(
  (parser) => {
    const binopSyms = [
      '+',
      '-',
      '*',
      '**',
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
      '>>',
      '<<',
      '>>>'
    ];
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'operator' &&
      binopSyms.includes(parser.nextBy(1).text)
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    const operator = parser.consume('operator', 'Expected operator');
    const left = parser.parseExpression();
    const right = parser.parseExpression();
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.BinaryExpressionLiteral,
      operator: operator.value,
      left: left,
      right: right
    };
  }
);

export default binaryExpressionPlugin;
