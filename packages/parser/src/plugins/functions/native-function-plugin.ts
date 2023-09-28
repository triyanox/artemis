import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const nativeFunctionCallPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.match('lp') && parser.nextByType(1) === 'nativeFn' && parser.nextByType(2) !== 'dot'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    const name = parser.consume('nativeFn', 'Expected native function call');
    const params = [];
    while (parser.peek().type !== 'rp' && !parser.isAtEnd()) {
      params.push(parser.parseExpression());
    }
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.NativeFnCall,
      name: name.value,
      params: params
    };
  }
);

export default nativeFunctionCallPlugin;
