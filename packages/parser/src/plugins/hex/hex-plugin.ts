import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const hexPlugin = new ParserPlugin(
  (parser) => {
    return parser.match('hex');
  },
  (parser) => {
    const left = parser.consume('hex', 'Expected hex').value;
    return {
      type: NodeTypes.HexLiteral,
      value: left
    };
  }
);

export default hexPlugin;
