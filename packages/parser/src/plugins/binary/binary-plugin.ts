import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const binaryPlugin = new ParserPlugin(
  (parser) => {
    return parser.match('binary');
  },
  (parser) => {
    const left = parser.consume('binary', 'Expected binary').value;
    console.log(left);
    return {
      type: NodeTypes.BinaryLiteral,
      value: left
    };
  }
);

export default binaryPlugin;
