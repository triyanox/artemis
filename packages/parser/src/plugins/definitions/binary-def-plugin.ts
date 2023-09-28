import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const binaryDefPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.peek().type === 'lp' &&
      parser.nextByType(1) === 'keyword' &&
      parser.nextByType(2) === 'identifier' &&
      parser.nextByType(3) === 'binary'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    const name = parser.consume('identifier', 'Expected identifier');
    const value = parser.consume('binary', 'Expected binary');
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.Binary,
      name: name.value,
      value: value.value
    };
  }
);

export default binaryDefPlugin;
