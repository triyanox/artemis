import moo from 'moo';
import spec from '../spec';

class Lexer {
  lexer: moo.Lexer;
  tokens: moo.Token[];
  code: string;

  constructor(code: string) {
    this.lexer = moo.compile(spec);
    this.code = code;
    this.tokens = [];
  }

  tokenize() {
    this.lexer.reset(this.code);
    let tokens: any[] = [];
    let token: any;
    while ((token = this.lexer.next())) {
      tokens.push(token);
    }
    this.tokens = tokens;
    return this;
  }
}

export default Lexer;
