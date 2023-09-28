import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const whilePlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.match('lp') && parser.nextByType(1) === 'keyword' && parser.nextBy(1).value === 'while'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    parser.consume('lp', 'Expected left parenthesis');
    const condition = parser.parseExpression();
    parser.consume('rp', 'Expected right parenthesis');
    parser.consume('lp', 'Expected left parenthesis');
    const body = [];
    while (parser.peek().type !== 'rp' && !parser.isAtEnd()) {
      body.push(parser.parseExpression());
    }
    parser.consume('rp', 'Expected right parenthesis');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.While,
      condition: condition,
      body: body
    };
  }
);

export default whilePlugin;
