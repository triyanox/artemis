import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const functionCallPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.match('lp') && parser.nextByType(1) === 'identifier' && parser.nextByType(2) !== 'dot'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    const name = parser.consume('identifier', 'Expected identifier');
    const params = [];
    while (parser.peek().type !== 'rp' && !parser.isAtEnd()) {
      params.push(parser.parseExpression());
    }
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.FnCall,
      name: name.value,
      params: params
    };
  }
);

export default functionCallPlugin;
