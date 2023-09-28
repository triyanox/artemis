import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const matchPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextBy(1).value === 'match' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'lb'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const ref = parser.consume('identifier', 'Expected identifier');
    parser.consume('lb', 'Expected left brace');
    const value = new Map();
    while (parser.peek().type !== 'rb' && !parser.isAtEnd()) {
      const key = parser.parseExpression();
      parser.consume('colon', 'Expected colon');
      const val = parser.parseExpression();
      value.set(key, val);
      if (parser.peek().type === 'comma') parser.consume('comma', 'Expected comma');
    }
    parser.consume('rb', 'Expected right brace');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Match,
      value: value,
      ref: {
        type: NodeTypes.Reference,
        value: ref.value
      }
    };
  }
);
export default matchPlugin;
