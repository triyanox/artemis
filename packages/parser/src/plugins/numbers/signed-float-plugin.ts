import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const signedFloatPlugin = new ParserPlugin(
  (parser) => {
    return (
      (parser.match('operator', '+') || parser.match('operator', '-')) &&
      parser.nextBy(1).type === 'number' &&
      parser.nextBy(2).type === 'dot'
    );
  },
  (parser) => {
    const op = parser.consume('operator', 'Expected operator');
    const left = parser.consume('number', 'Expected number').value;
    parser.consume('dot', 'Expected dot');
    const right = parser.consume('number', 'Expected number').value;
    return {
      type: NodeTypes.NumberLiteral,
      value: op.value + left + '.' + right
    };
  }
);

export default signedFloatPlugin;
