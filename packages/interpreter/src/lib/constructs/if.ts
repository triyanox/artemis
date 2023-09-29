import Interpreter from '..';
import { Node } from '@artemis-lang/parser';
import Environment from '../../env';

class If {
  condition: Node;
  thenBranch: Node;
  elseBranch: Node | null;
  env: Environment;

  constructor(condition: Node, thenBranch: Node, elseBranch: Node | null, env: Environment) {
    this.condition = condition;
    this.thenBranch = thenBranch;
    this.elseBranch = elseBranch;
    this.env = env;
  }

  call(): any {
    const interpreter = new Interpreter();

    let returnValue;
    if (interpreter.visit(this.condition, this.env)) {
      const call = interpreter.visit(this.thenBranch, this.env);

      if (this.env.getReturn() !== undefined) {
        returnValue = this.env.getReturn();
      } else {
        returnValue = call;
      }
    } else if (this.elseBranch) {
      const call = interpreter.visit(this.elseBranch, this.env);

      if (this.env.getReturn() !== undefined) {
        returnValue = this.env.getReturn();
      } else {
        returnValue = call;
      }
    }
    if (returnValue !== undefined) {
      this.env.setToParent('return', returnValue);
    }

    return returnValue;
  }
}

export default If;
