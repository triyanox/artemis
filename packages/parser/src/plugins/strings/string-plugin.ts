import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const stringPlugin = new ParserPlugin(
  (parser) => {
    return parser.match('string');
  },
  (parser) => {
    return {
      type: NodeTypes.StringLiteral,
      value: parser.consume('string', 'Expected string').value
    };
  }
);

export default stringPlugin;
