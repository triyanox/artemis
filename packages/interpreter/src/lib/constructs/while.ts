import Interpreter from '..';
import { Node } from '@artemis-lang/parser';
import Environment from '../../env';

class While {
  condition: Node;
  body: Node[];
  env: Environment;

  constructor(condition: Node, body: Node[], env: Environment) {
    this.condition = condition;
    this.body = body;
    this.env = env;
  }

  call(): any {
    const whileEnv = new Environment(this.env);
    let returnValue;

    while (true) {
      const interpreter = new Interpreter();
      if (interpreter.visit(this.condition, whileEnv)) {
        interpreter.visitProgram(
          {
            type: 'Program',
            body: this.body
          },
          whileEnv
        );

        if (whileEnv.getReturn() !== undefined) {
          returnValue = whileEnv.getReturn();
          break;
        }
      } else {
        break;
      }
    }

    if (returnValue !== undefined) {
      this.env.setToParent('return', returnValue);
    }
  }
}

export default While;
