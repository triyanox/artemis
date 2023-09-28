import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const booleanDefPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'boolean'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    const value = parser.consume('boolean', 'Expected boolean');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Boolean,
      name: name.value,
      value: value.value === 'true'
    };
  }
);

export default booleanDefPlugin;
