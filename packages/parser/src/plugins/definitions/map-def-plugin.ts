import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const mapDefPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'lb'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    parser.consume('lb', 'Expected left brace');
    const value = new Map();
    while (parser.peek().type !== 'rb' && !parser.isAtEnd()) {
      const key = parser.consume('identifier', 'Expected identifier');
      parser.consume('colon', 'Expected colon');
      const val = parser.parseExpression();
      value.set(key.value, val);
      if (parser.peek().type === 'comma') parser.consume('comma', 'Expected comma');
    }
    parser.consume('rb', 'Expected right brace');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Map,
      name: name.value,
      value: value
    };
  }
);

export default mapDefPlugin;
