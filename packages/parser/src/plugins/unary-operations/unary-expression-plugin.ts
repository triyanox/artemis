import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const unaryExpressionPlugin = new ParserPlugin(
  (parser) => {
    const uniopSyms = ['!', '~', '++', '--'];
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'operator' &&
      uniopSyms.includes(parser.nextBy(1).text)
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    const operator = parser.consume('operator', 'Expected operator');
    const operand = parser.parseExpression();
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.UnaryExpressionLiteral,
      operator: operator.value,
      operand: operand
    };
  }
);

export default unaryExpressionPlugin;
