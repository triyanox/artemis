import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const referencePlugin = new ParserPlugin(
  (parser) => {
    return parser.match('identifier');
  },
  (parser) => {
    return {
      type: NodeTypes.Reference,
      value: parser.consume('identifier', 'Expected identifier').value
    };
  }
);

export default referencePlugin;
