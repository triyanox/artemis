import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const setPlugin = new ParserPlugin(
  (parser) => {
    return parser.match('hash');
  },
  (parser) => {
    parser.consume('hash', 'Expected hash');
    parser.consume('lbk', 'Expected left bracket');
    const value = new Set();
    while (parser.peek().type !== 'rbk' && !parser.isAtEnd()) {
      value.add(parser.parseExpression());
      if (parser.peek().type === 'comma') parser.consume('comma', 'Expected comma');
    }
    parser.consume('rbk', 'Expected right bracket');
    return {
      type: NodeTypes.SetLiteral,
      value: value
    };
  }
);

export default setPlugin;
