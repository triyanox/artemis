import Interpreter from '..';
import { Node } from '@artemis/parser';
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
      } else {
        break;
      }
    }
  }
}

export default While;
