import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const jsCodePlugin = new ParserPlugin(
  (parser) => {
    return parser.match('jsCode');
  },
  (parser) => {
    const code = parser.consume('jsCode', 'Expected js code');
    return {
      type: NodeTypes.JsCode,
      value: code.value.slice(1, -1)
    };
  }
);

export default jsCodePlugin;
