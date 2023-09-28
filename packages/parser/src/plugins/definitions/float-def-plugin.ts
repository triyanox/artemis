import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const floatDefPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'number' &&
      parser.nextByType(4) === 'dot' &&
      parser.nextByType(5) === 'number'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    const left = parser.consume('number', 'Expected number').value;
    parser.consume('dot', 'Expected dot');
    const right = parser.consume('number', 'Expected number').value;
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Number,
      name: name.value,
      value: left + '.' + right
    };
  }
);

export default floatDefPlugin;
