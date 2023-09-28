import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const floatPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.match('number') &&
      parser.nextBy(1).type === 'dot' &&
      parser.nextBy(2).type === 'number'
    );
  },
  (parser) => {
    const left = parser.consume('number', 'Expected number').value;
    parser.consume('dot', 'Expected dot');
    const right = parser.consume('number', 'Expected number').value;
    return {
      type: NodeTypes.NumberLiteral,
      value: left + '.' + right
    };
  }
);

export default floatPlugin;
