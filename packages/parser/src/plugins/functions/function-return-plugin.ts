import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const functionReturnPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextBy(1).value === 'return'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const value = parser.parseExpression();
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Return,
      value
    };
  }
);

export default functionReturnPlugin;
