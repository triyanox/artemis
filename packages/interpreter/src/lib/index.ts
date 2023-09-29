import Parser, { Node } from '@artemis-lang/parser';
import Lexer from '@artemis-lang/lexer';
import { NodeType } from '@artemis-lang/parser';
import { Program } from '@artemis-lang/parser';
import Environment from '../env';
import { loadGlobals } from '../globals';
import { loadNative } from '../native-fns';
import For from './constructs/for';
import Fn from './constructs/function';
import If from './constructs/if';
import Match from './constructs/match';
import While from './constructs/while';

export default class Interpreter {
  private globalEnv: Environment;

  constructor() {
    this.globalEnv = new Environment();
    loadNative(this);
    loadGlobals(this);
  }

  public static interpret(code: string) {
    const lexer = new Lexer(code);
    const parser = new Parser(lexer);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    return interpreter.execute(ast);
  }

  public static ast(code: string) {
    const lexer = new Lexer(code);
    const parser = new Parser(lexer);
    return parser.parse();
  }

  public static tokens(code: string) {
    const lexer = new Lexer(code);
    return lexer.tokenize().tokens;
  }

  get global(): Environment {
    return this.globalEnv;
  }

  native(name: string, fn: (...args: any[]) => any) {
    this.globalEnv.set(name, fn);
  }

  visitProgram(program: Program, env: Environment) {
    let result = null;
    for (const statement of program.body) {
      result = this.visit(statement, env);
    }
    return result;
  }

  execute(program: Program) {
    return this.visitProgram(program, this.globalEnv);
  }

  visit(node: Node, env: Environment): any {
    switch (node.type) {
      case 'Number':
        return this.visitNumber(node as NodeType<'Number'>, env);
      case 'NumberLiteral':
        return this.visitNumberLiteral(node as NodeType<'NumberLiteral'>, env);
      case 'String':
        return this.visitString(node as NodeType<'String'>, env);
      case 'StringLiteral':
        return this.visitStringLiteral(node as NodeType<'StringLiteral'>, env);
      case 'Boolean':
        return this.visitBoolean(node as NodeType<'Boolean'>, env);
      case 'BooleanLiteral':
        return this.visitBooleanLiteral(node as NodeType<'BooleanLiteral'>, env);
      case 'List':
        return this.visitList(node as NodeType<'List'>, env);
      case 'ListLiteral':
        return this.visitListLiteral(node as NodeType<'ListLiteral'>, env);
      case 'Set':
        return this.visitSet(node as NodeType<'Set'>, env);
      case 'SetLiteral':
        return this.visitSetLiteral(node as NodeType<'SetLiteral'>, env);
      case 'Map':
        return this.visitMap(node as NodeType<'Map'>, env);
      case 'MapLiteral':
        return this.visitMapLiteral(node as NodeType<'MapLiteral'>, env);
      case 'BinaryExpression':
        return this.visitBinaryExpression(node as NodeType<'BinaryExpression'>, env);
      case 'BinaryExpressionLiteral':
        return this.visitBinaryExpressionLiteral(node as NodeType<'BinaryExpressionLiteral'>, env);
      case 'Fn':
        return this.visitFn(node as NodeType<'Fn'>, env);
      case 'FnCall':
        return this.visitFnCall(node as NodeType<'FnCall'>, env);
      case 'Reference':
        return this.visitReference(node as NodeType<'Reference'>, env);
      case 'NativeFnCall':
        return this.visitNativeFnCall(node as NodeType<'NativeFnCall'>, env);
      case 'Result':
        return this.visitResult(node as NodeType<'Result'>, env);
      case 'For':
        return this.visitFor(node as NodeType<'For'>, env);
      case 'If':
        return this.visitIf(node as NodeType<'If'>, env);
      case 'While':
        return this.visitWhile(node as NodeType<'While'>, env);
      case 'Match':
        return this.visitMatch(node as NodeType<'Match'>, env);
      case 'NativeFnResult':
        return this.visitNativeFnResult(node as NodeType<'NativeFnResult'>, env);
      case 'UnaryExpression':
        return this.visitUnaryExpression(node as NodeType<'UnaryExpression'>, env);
      case 'UnaryExpressionLiteral':
        return this.visitUnaryExpressionLiteral(node as NodeType<'UnaryExpressionLiteral'>, env);
      case 'Binary':
        return this.visitBinary(node as NodeType<'Binary'>, env);
      case 'BinaryLiteral':
        return this.visitBinaryLiteral(node as NodeType<'BinaryLiteral'>, env);
      case 'Hex':
        return this.visitHex(node as NodeType<'Hex'>, env);
      case 'HexLiteral':
        return this.visitHexLiteral(node as NodeType<'HexLiteral'>, env);
      case 'JsCode':
        return (node as NodeType<'JsCode'>).value;
      case 'Return':
        return this.visitFnReturn(node as NodeType<'Return'>, env);
      default:
        throw new Error(`Unknown node type '${node.type}'`);
    }
  }

  visitFnReturn(node: NodeType<'Return'>, env: Environment): any {
    const value = this.visit(node.value, env);
    env.set('return', value);
    try {
      const parentEnv = env.getParent();
      if (parentEnv) {
        parentEnv.set('return', value);
      }
    } catch {}
    return value;
  }

  visitNumber(node: NodeType<'Number'>, env: Environment): any {
    env.set(node.name, Number(node.value));
  }

  visitNumberLiteral(node: NodeType<'NumberLiteral'>, _env: Environment): any {
    return Number(node.value);
  }

  visitBinary(node: NodeType<'Binary'>, env: Environment): any {
    env.set(node.name, this.visitBinaryLiteral(node as unknown as NodeType<'BinaryLiteral'>, env));
  }

  visitBinaryLiteral(node: NodeType<'BinaryLiteral'>, _env: Environment): any {
    return Number(node.value);
  }

  visitHex(node: NodeType<'Hex'>, env: Environment): any {
    env.set(node.name, this.visitHexLiteral(node as unknown as NodeType<'HexLiteral'>, env));
  }

  visitHexLiteral(node: NodeType<'HexLiteral'>, _env: Environment): any {
    return Number(node.value);
  }

  visitString(node: NodeType<'String'>, env: Environment): any {
    env.set(node.name, String(node.value).replace(/^"(.*)"$/, '$1'));
  }

  visitStringLiteral(node: NodeType<'StringLiteral'>, _env: Environment): any {
    return String(node.value).replace(/^"(.*)"$/, '$1');
  }

  visitBoolean(node: NodeType<'Boolean'>, env: Environment): any {
    env.set(node.name, Boolean(node.value));
  }

  visitBooleanLiteral(node: NodeType<'BooleanLiteral'>, _env: Environment): any {
    return Boolean(node.value);
  }

  visitList(node: NodeType<'List'>, env: Environment): any {
    const list = node.value.map((item) => this.visit(item, env));
    env.set(node.name, list);
  }

  visitListLiteral(node: NodeType<'ListLiteral'>, env: Environment): any {
    return node.value.map((item) => this.visit(item, env));
  }

  visitSet(node: NodeType<'Set'>, env: Environment): any {
    const set = new Set(
      Array.from(node.value.values())
        .map((item) => this.visit(item as Node, env))
        .entries()
    );
    env.set(node.name, set);
  }

  visitSetLiteral(node: NodeType<'SetLiteral'>, env: Environment): any {
    return new Set(
      Array.from(node.value.values())
        .map((item) => this.visit(item as Node, env))
        .entries()
    );
  }

  visitMap(node: NodeType<'Map'>, env: Environment): any {
    const map = new Map(
      Array.from(node.value.entries()).map(([key, value]) => [key, this.visit(value as Node, env)])
    );
    env.set(node.name, map);
  }

  visitMapLiteral(node: NodeType<'MapLiteral'>, env: Environment): any {
    return new Map(
      Array.from(node.value.entries()).map(([key, value]) => {
        return [key, this.visit(value as Node, env)];
      })
    );
  }

  visitUnaryExpression(node: NodeType<'UnaryExpression'>, env: Environment): any {
    env.set(
      node.name,
      this.visitUnaryExpressionLiteral(node as unknown as NodeType<'UnaryExpressionLiteral'>, env)
    );
  }

  visitUnaryExpressionLiteral(node: NodeType<'UnaryExpressionLiteral'>, env: Environment): any {
    const allowedOperations = {
      '!': (a: any) => !a,
      '~': (a: any) => ~a,
      '++': (a: any) => ++a,
      '--': (a: any) => --a
    };
    const operand = this.visit(node.operand, env);
    if (node.operator in allowedOperations) {
      return allowedOperations[node.operator as keyof typeof allowedOperations](operand);
    }
    throw new Error(`Unknown operator '${node.operator}'`);
  }

  visitBinaryExpressionLiteral(node: NodeType<'BinaryExpressionLiteral'>, env: Environment): any {
    const left = this.visit(node.left, env);
    const right = this.visit(node.right, env);
    const allowedOperations = {
      '+': (a: any, b: any) => a + b,
      '-': (a: any, b: any) => a - b,
      '*': (a: any, b: any) => a * b,
      '**': (a: any, b: any) => a ** b,
      '/': (a: any, b: any) => a / b,
      '%': (a: any, b: any) => a % b,
      '^': (a: any, b: any) => a ^ b,
      '>': (a: any, b: any) => a > b,
      '<': (a: any, b: any) => a < b,
      '>=': (a: any, b: any) => a >= b,
      '<=': (a: any, b: any) => a <= b,
      '==': (a: any, b: any) => a == b,
      '!=': (a: any, b: any) => a != b,
      '&&': (a: any, b: any) => a && b,
      '||': (a: any, b: any) => a || b,
      '??': (a: any, b: any) => a ?? b,
      '>>': (a: any, b: any) => a >> b,
      '<<': (a: any, b: any) => a << b,
      '>>>': (a: any, b: any) => a >>> b
    };
    if (node.operator in allowedOperations) {
      return allowedOperations[node.operator as keyof typeof allowedOperations](left, right);
    }
    throw new Error(`Unknown operator '${node.operator}'`);
  }

  visitBinaryExpression(node: NodeType<'BinaryExpression'>, env: Environment): any {
    env.set(
      node.name,
      this.visitBinaryExpressionLiteral(node as unknown as NodeType<'BinaryExpressionLiteral'>, env)
    );
  }

  visitFn(node: NodeType<'Fn'>, env: Environment): any {
    const fn = new Fn(node.args, node.body, env);
    env.set(node.name, fn);
  }

  visitFnCall(node: NodeType<'FnCall'>, env: Environment): any {
    const fn = env.get(node.name) as Fn;
    const args = node.params.map((arg) => this.visit(arg, env));
    return fn.call(args);
  }

  visitNativeFnResult(node: NodeType<'NativeFnResult'>, env: Environment): any {
    const fn = env.get(node.nativeFn) as Function;
    const args = node.params.map((arg) => this.visit(arg, env));
    env.set(node.name, fn(args));
  }

  visitNativeFnCall(node: NodeType<'NativeFnCall'>, env: Environment): any {
    const fn = env.get(node.name) as Function;
    const args = node.params.map((arg) => this.visit(arg, env));
    return fn(args);
  }

  visitReference(node: NodeType<'Reference'>, env: Environment): any {
    return env.get(node.value);
  }

  visitResult(node: NodeType<'Result'>, env: Environment): any {
    const fn = env.get(node.fnName) as Fn;
    const args = node.params.map((arg) => this.visit(arg, env));
    env.set(node.name, fn.call(args));
  }

  visitFor(node: NodeType<'For'>, env: Environment): any {
    const forLoop = new For(node.index, node.start, node.end, node.step, node.body, env);
    forLoop.call();
  }

  visitIf(node: NodeType<'If'>, env: Environment): any {
    const ifStatement = new If(node.condition, node.thenBranch, node.elseBranch, env);
    ifStatement.call();
  }

  visitWhile(node: NodeType<'While'>, env: Environment): any {
    const whileLoop = new While(node.condition, node.body, env);
    whileLoop.call();
  }

  visitMatch(node: NodeType<'Match'>, env: Environment): any {
    const match = new Match(node.condition, node.value, env);
    return match.call();
  }
}
