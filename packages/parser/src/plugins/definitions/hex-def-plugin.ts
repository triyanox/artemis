import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const hexDefPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'hex'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    const value = parser.consume('hex', 'Expected hex');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Hex,
      name: name.value,
      value: value.value
    };
  }
);

export default hexDefPlugin;
