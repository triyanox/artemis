import Interpreter from '..';
import { Node } from '@artemis-lang/parser/src';
import Environment from '../../env';

class For {
  index: string;
  start: number;
  end: number;
  step: number;
  body: Node[];
  env: Environment;

  constructor(
    index: string,
    start: string,
    end: string,
    step: string | null,
    body: Node[],
    env: Environment
  ) {
    this.index = index;
    this.start = Number(start);
    this.end = Number(end);
    this.step = step ? Number(step) : 1;
    this.body = body;
    this.env = env;
  }

  call(): any {
    const forEnv = new Environment(this.env);
    for (let i = this.start; i < this.end; i += this.step) {
      forEnv.set(this.index, i);
      const interpreter = new Interpreter();
      interpreter.visitProgram(
        {
          type: 'Program',
          body: this.body
        },
        forEnv
      );
    }
  }
}

export default For;
