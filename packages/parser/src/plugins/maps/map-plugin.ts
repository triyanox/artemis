import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const mapPlugin = new ParserPlugin(
  (parser) => {
    return parser.match('lb');
  },
  (parser) => {
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
    return {
      type: NodeTypes.MapLiteral,
      value: value
    };
  }
);

export default mapPlugin;
