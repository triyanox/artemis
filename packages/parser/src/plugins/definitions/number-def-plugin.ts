import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const numberDefPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'number'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    const value = parser.consume('number', 'Expected number');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Number,
      name: name.value,
      value: value.value
    };
  }
);

export default numberDefPlugin;
