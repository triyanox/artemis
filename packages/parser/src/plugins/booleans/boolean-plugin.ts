import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const booleanPlugin = new ParserPlugin(
  (parser) => {
    return parser.match('boolean');
  },
  (parser) => {
    return {
      type: NodeTypes.BooleanLiteral,
      value: parser.consume('boolean', 'Expected boolean').value === 'true'
    };
  }
);

export default booleanPlugin;
