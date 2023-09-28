import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const listDefPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'lbk'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    parser.consume('lbk', 'Expected left bracket');
    const value = [];
    while (parser.peek().type !== 'rbk' && !parser.isAtEnd()) {
      value.push(parser.parseExpression());
      if (parser.peek().type === 'comma') parser.consume('comma', 'Expected comma');
    }
    parser.consume('rbk', 'Expected right bracket');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.List,
      name: name.value,
      value: value
    };
  }
);

export default listDefPlugin;
