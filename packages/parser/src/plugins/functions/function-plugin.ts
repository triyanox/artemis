import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const functionPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextBy(1).value === 'fn' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'lbk'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    parser.consume('lbk', 'Expected left bracket');
    const args = [];
    while (parser.peek().type !== 'rb' && !parser.isAtEnd()) {
      args.push(parser.consume('identifier', 'Expected identifier').value);
    }
    parser.consume('rbk', 'Expected right bracket');
    parser.consume('lp', 'Expected left parenthesis');
    const body = [];
    while (parser.peek().type !== 'rp' && !parser.isAtEnd()) {
      body.push(parser.parseExpression());
    }
    parser.consume('rp', 'Expected right parenthesis');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Fn,
      name: name.value,
      args,
      body
    };
  }
);

export default functionPlugin;
