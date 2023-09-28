import NodeTypes from '../../node/node-types';
import ParserPlugin from '../../parser-plugin';

const ifPlugin = new ParserPlugin(
  (parser) => {
    return (
      parser.match('lp') && parser.nextByType(1) === 'keyword' && parser.nextBy(1).value === 'if'
    );
  },
  (parser) => {
    parser.consume('lp', 'Expected left parenthesis');
    parser.consume('keyword', 'Expected keyword');
    parser.consume('lp', 'Expected left parenthesis');
    const condition = parser.parseExpression();
    parser.consume('rp', 'Expected right parenthesis');
    parser.consume('lp', 'Expected left parenthesis');
    const thenBranch = parser.parseExpression();
    parser.consume('rp', 'Expected right parenthesis');
    if (parser.match('lp')) {
      parser.consume('lp', 'Expected left parenthesis');
      const elseBranch = parser.parseExpression();
      parser.consume('rp', 'Expected right parenthesis');
      parser.consume('rp', 'Expected right parenthesis');
      return {
        type: NodeTypes.If,
        condition: condition,
        thenBranch: thenBranch,
        elseBranch: elseBranch
      };
    }
    parser.consume('rp', 'Expected right parenthesis');
    return {
      type: NodeTypes.If,
      condition: condition,
      thenBranch: thenBranch,
      elseBranch: null
    };
  }
);

export default ifPlugin;
