import Interpreter from '..';
import { Node } from '@artemis-lang/parser';
import Environment from '../../env';

class For {
  index: string;
  start: Node;
  end: Node;
  step: Node | null;
  body: Node[];
  env: Environment;

  constructor(
    index: string,
    start: Node,
    end: Node,
    step: Node | null,
    body: Node[],
    env: Environment
  ) {
    this.index = index;
    this.start = start;
    this.end = end;
    this.step = step;
    this.body = body;
    this.env = env;
  }

  call(): any {
    const interpreter = new Interpreter();
    const start = interpreter.visit(this.start, this.env);
    const end = interpreter.visit(this.end, this.env);
    const step = this.step ? interpreter.visit(this.step, this.env) : 1;
    const forEnv = new Environment(this.env);

    let returnValue;

    for (let i = start; i < end; i += step) {
      forEnv.set(this.index, i);
      const interpreter = new Interpreter();
      const result = interpreter.visitProgram(
        {
          type: 'Program',
          body: this.body
        },
        forEnv
      );

      if (forEnv.getReturn() !== undefined) {
        returnValue = forEnv.getReturn();
        break;
      }
    }

    if (returnValue !== undefined) {
      this.env.setToParent('return', returnValue);
    }
  }
}

export default For;
