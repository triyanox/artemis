import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const listPlugin = new ParserPlugin(
  (parser) => {
    return parser.match('lbk');
  },
  (parser) => {
    parser.consume('lbk', 'Expected left bracket');
    const value = [];
    while (parser.peek().type !== 'rbk' && !parser.isAtEnd()) {
      value.push(parser.parseExpression());
      if (parser.peek().type === 'comma') parser.consume('comma', 'Expected comma');
    }
    parser.consume('rbk', 'Expected right bracket');
    return {
      type: NodeTypes.ListLiteral,
      value: value
    };
  }
);

export default listPlugin;
