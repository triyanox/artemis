import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const signedNumberPlugin = new ParserPlugin(
  (parser) => {
    return (
      (parser.match('operator', '+') || parser.match('operator', '-')) &&
      parser.nextBy(1).type === 'number'
    );
  },
  (parser) => {
    const op = parser.consume('operator', 'Expected operator');
    return {
      type: NodeTypes.NumberLiteral,
      value: op.value + parser.consume('number', 'Expected number').value
    };
  }
);

export default signedNumberPlugin;
