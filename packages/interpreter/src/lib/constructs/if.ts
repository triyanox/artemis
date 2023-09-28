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
    if (interpreter.visit(this.condition, this.env)) {
      interpreter.visit(this.thenBranch, this.env);
    } else if (this.elseBranch) {
      interpreter.visit(this.elseBranch, this.env);
    }
  }
}

export default If;
