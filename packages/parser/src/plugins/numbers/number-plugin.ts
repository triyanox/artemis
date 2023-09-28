import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const numberPlugin = new ParserPlugin(
  (parser) => {
    return parser.match('number');
  },
  (parser) => {
    return {
      type: NodeTypes.NumberLiteral,
      value: parser.consume('number', 'Expected number').value
    };
  }
);

export default numberPlugin;
