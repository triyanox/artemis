#!/usr/bin/env node

/**
 * Comprehensive Test Runner for Artemis Language
 *
 * This script tests:
 * 1. All example files
 * 2. Lexer functionality
 * 3. Parser functionality
 * 4. Interpreter functionality
 * 5. Edge cases
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Interpreter from '../packages/interpreter/dist/index.js';
import Lexer from '../packages/lexer/dist/index.js';
import Parser from '../packages/parser/dist/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Track results
const results = {
  passed: [],
  failed: [],
  errors: []
};

// Capture console output
let capturedOutput = [];
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

function captureOutput(enable) {
  if (enable) {
    capturedOutput = [];
    console.log = (...args) => {
      capturedOutput.push(args.map(a => String(a)).join(' '));
    };
    console.error = (...args) => {
      capturedOutput.push('[ERROR] ' + args.map(a => String(a)).join(' '));
    };
  } else {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  }
}

function getCapturedOutput() {
  return capturedOutput.join('\n');
}

// Test helper
function test(name, fn) {
  try {
    captureOutput(true);
    fn();
    captureOutput(false);
    results.passed.push({ name, output: getCapturedOutput() });
    originalConsoleLog(`✅ PASS: ${name}`);
  } catch (error) {
    captureOutput(false);
    results.failed.push({ name, error: error.message, stack: error.stack });
    originalConsoleLog(`❌ FAIL: ${name}`);
    originalConsoleLog(`   Error: ${error.message}`);
  }
}

// Test suite for lexer
function testLexer() {
  originalConsoleLog('\n=== LEXER TESTS ===\n');

  test('Lexer: Numbers', () => {
    const lexer = new Lexer('42 3.14 0');
    const tokens = lexer.tokenize().tokens;
    if (tokens.filter(t => t.type === 'number').length !== 3) {
      throw new Error('Expected 3 number tokens');
    }
  });

  test('Lexer: Binary literals', () => {
    const lexer = new Lexer('0b1010 0b1111');
    const tokens = lexer.tokenize().tokens;
    const binaryTokens = tokens.filter(t => t.type === 'binary');
    if (binaryTokens.length !== 2) {
      throw new Error(`Expected 2 binary tokens, got ${binaryTokens.length}`);
    }
  });

  test('Lexer: Hex literals', () => {
    const lexer = new Lexer('0x12F 0xABC');
    const tokens = lexer.tokenize().tokens;
    const hexTokens = tokens.filter(t => t.type === 'hex');
    if (hexTokens.length !== 2) {
      throw new Error(`Expected 2 hex tokens, got ${hexTokens.length}`);
    }
  });

  test('Lexer: Strings', () => {
    const lexer = new Lexer('"hello" "world"');
    const tokens = lexer.tokenize().tokens;
    const stringTokens = tokens.filter(t => t.type === 'string');
    if (stringTokens.length !== 2) {
      throw new Error(`Expected 2 string tokens, got ${stringTokens.length}`);
    }
  });

  test('Lexer: Booleans', () => {
    const lexer = new Lexer('true false');
    const tokens = lexer.tokenize().tokens;
    const boolTokens = tokens.filter(t => t.type === 'boolean');
    if (boolTokens.length !== 2) {
      throw new Error(`Expected 2 boolean tokens, got ${boolTokens.length}`);
    }
  });

  test('Lexer: Keywords', () => {
    const lexer = new Lexer('def fn if else while for match return');
    const tokens = lexer.tokenize().tokens;
    const keywordTokens = tokens.filter(t => t.type === 'keyword');
    if (keywordTokens.length !== 8) {
      throw new Error(`Expected 8 keyword tokens, got ${keywordTokens.length}`);
    }
  });

  test('Lexer: Operators', () => {
    const lexer = new Lexer('+ - * / % ^ > < >= <= == != && || ! ~ << >> >>>');
    const tokens = lexer.tokenize().tokens;
    const opTokens = tokens.filter(t => t.type === 'operator');
    if (opTokens.length !== 18) {
      throw new Error(`Expected 18 operator tokens, got ${opTokens.length}`);
    }
  });

  test('Lexer: Comments (multiline)', () => {
    const lexer = new Lexer('/* comment */ 42');
    const tokens = lexer.tokenize().tokens;
    const commentTokens = tokens.filter(t => t.type === 'multilineComment');
    if (commentTokens.length !== 1) {
      throw new Error(`Expected 1 comment token, got ${commentTokens.length}`);
    }
  });

  test('Lexer: Identifiers', () => {
    const lexer = new Lexer('myVar _test var123');
    const tokens = lexer.tokenize().tokens;
    const idTokens = tokens.filter(t => t.type === 'identifier');
    if (idTokens.length !== 3) {
      throw new Error(`Expected 3 identifier tokens, got ${idTokens.length}`);
    }
  });

  test('Lexer: Parentheses and brackets', () => {
    const lexer = new Lexer('( ) [ ] { }');
    const tokens = lexer.tokenize().tokens;
    const parenTokens = tokens.filter(t =>
      ['lp', 'rp', 'lbk', 'rbk', 'lb', 'rb'].includes(t.type)
    );
    if (parenTokens.length !== 6) {
      throw new Error(`Expected 6 paren/bracket tokens, got ${parenTokens.length}`);
    }
  });
}

// Test suite for parser
function testParser() {
  originalConsoleLog('\n=== PARSER TESTS ===\n');

  test('Parser: Number literal', () => {
    const lexer = new Lexer('42');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'NumberLiteral') {
      throw new Error('Expected NumberLiteral node');
    }
  });

  test('Parser: Float literal', () => {
    const lexer = new Lexer('3.14');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'NumberLiteral') {
      throw new Error('Expected NumberLiteral node for float');
    }
    if (ast.body[0].value !== '3.14') {
      throw new Error(`Expected value '3.14', got '${ast.body[0].value}'`);
    }
  });

  test('Parser: String literal', () => {
    const lexer = new Lexer('"hello"');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'StringLiteral') {
      throw new Error('Expected StringLiteral node');
    }
  });

  test('Parser: Boolean literal', () => {
    const lexer = new Lexer('true');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'BooleanLiteral') {
      throw new Error('Expected BooleanLiteral node');
    }
  });

  test('Parser: Variable definition', () => {
    const lexer = new Lexer('(def x 42)');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'Number') {
      throw new Error('Expected Number (definition) node');
    }
  });

  test('Parser: List literal', () => {
    const lexer = new Lexer('[1, 2, 3]');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'ListLiteral') {
      throw new Error('Expected ListLiteral node');
    }
  });

  test('Parser: Map literal', () => {
    const lexer = new Lexer('{a: 1, b: 2}');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'MapLiteral') {
      throw new Error('Expected MapLiteral node');
    }
  });

  test('Parser: Set literal', () => {
    const lexer = new Lexer('#[1, 2, 3]');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'SetLiteral') {
      throw new Error('Expected SetLiteral node');
    }
  });

  test('Parser: Binary expression', () => {
    const lexer = new Lexer('(+ 1 2)');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'BinaryExpressionLiteral') {
      throw new Error('Expected BinaryExpressionLiteral node');
    }
  });

  test('Parser: Function definition', () => {
    const lexer = new Lexer('(fn add [a b] ((+ a b)))');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'Fn') {
      throw new Error('Expected Fn node');
    }
  });

  test('Parser: If statement', () => {
    const lexer = new Lexer('(if (true) ((println "yes")))');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'If') {
      throw new Error('Expected If node');
    }
  });

  test('Parser: While loop', () => {
    const lexer = new Lexer('(while ((< x 10)) ((println x)))');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'While') {
      throw new Error('Expected While node');
    }
  });

  test('Parser: For loop', () => {
    const lexer = new Lexer('(for [i 0 10] ((println i)))');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'For') {
      throw new Error('Expected For node');
    }
  });

  test('Parser: Match statement', () => {
    const lexer = new Lexer('(match x { 1 : (println "one"), _ : (println "other") })');
    const parser = new Parser(lexer);
    const ast = parser.parse();
    if (ast.body.length !== 1 || ast.body[0].type !== 'Match') {
      throw new Error('Expected Match node');
    }
  });
}

// Test suite for interpreter
function testInterpreter() {
  originalConsoleLog('\n=== INTERPRETER TESTS ===\n');

  test('Interpreter: Number literal', () => {
    const result = Interpreter.interpret('42');
    if (result !== 42) {
      throw new Error(`Expected 42, got ${result}`);
    }
  });

  test('Interpreter: Float literal', () => {
    const result = Interpreter.interpret('3.14');
    if (result !== 3.14) {
      throw new Error(`Expected 3.14, got ${result}`);
    }
  });

  test('Interpreter: String literal', () => {
    const result = Interpreter.interpret('"hello"');
    if (result !== 'hello') {
      throw new Error(`Expected "hello", got ${result}`);
    }
  });

  test('Interpreter: Boolean literal', () => {
    const result = Interpreter.interpret('true');
    if (result !== true) {
      throw new Error(`Expected true, got ${result}`);
    }
  });

  test('Interpreter: Variable definition and reference', () => {
    const result = Interpreter.interpret('(def x 42) x');
    if (result !== 42) {
      throw new Error(`Expected 42, got ${result}`);
    }
  });

  test('Interpreter: Binary expression (addition)', () => {
    const result = Interpreter.interpret('(+ 1 2)');
    if (result !== 3) {
      throw new Error(`Expected 3, got ${result}`);
    }
  });

  test('Interpreter: Binary expression (subtraction)', () => {
    const result = Interpreter.interpret('(- 5 3)');
    if (result !== 2) {
      throw new Error(`Expected 2, got ${result}`);
    }
  });

  test('Interpreter: Binary expression (multiplication)', () => {
    const result = Interpreter.interpret('(* 4 3)');
    if (result !== 12) {
      throw new Error(`Expected 12, got ${result}`);
    }
  });

  test('Interpreter: Binary expression (division)', () => {
    const result = Interpreter.interpret('(/ 10 2)');
    if (result !== 5) {
      throw new Error(`Expected 5, got ${result}`);
    }
  });

  test('Interpreter: Comparison operators', () => {
    const result1 = Interpreter.interpret('(> 5 3)');
    const result2 = Interpreter.interpret('(< 3 5)');
    const result3 = Interpreter.interpret('(== 5 5)');
    if (result1 !== true || result2 !== true || result3 !== true) {
      throw new Error('Comparison operators failed');
    }
  });

  test('Interpreter: Logical operators', () => {
    const result1 = Interpreter.interpret('(&& true true)');
    const result2 = Interpreter.interpret('(|| false true)');
    const result3 = Interpreter.interpret('(! false)');
    if (result1 !== true || result2 !== true || result3 !== true) {
      throw new Error('Logical operators failed');
    }
  });

  test('Interpreter: List literal', () => {
    const result = Interpreter.interpret('[1, 2, 3]');
    if (!Array.isArray(result) || result.length !== 3) {
      throw new Error('Expected array of length 3');
    }
  });

  test('Interpreter: Function definition and call', () => {
    const result = Interpreter.interpret('(fn add [a b] ((+ a b))) (add 1 2)');
    if (result !== 3) {
      throw new Error(`Expected 3, got ${result}`);
    }
  });

  test('Interpreter: If statement (true branch)', () => {
    Interpreter.interpret('(if (true) ((println "yes")))');
    const output = getCapturedOutput();
    if (!output.includes('yes')) {
      throw new Error('Expected "yes" in output');
    }
  });

  test('Interpreter: If-else statement (false branch)', () => {
    Interpreter.interpret('(if (false) ((println "yes")) ((println "no")))');
    const output = getCapturedOutput();
    if (!output.includes('no')) {
      throw new Error('Expected "no" in output');
    }
  });

  test('Interpreter: While loop', () => {
    const result = Interpreter.interpret('(def i 0) (while ((< i 3)) ((def i (+ i 1)))) i');
    if (result !== 3) {
      throw new Error(`Expected i to be 3, got ${result}`);
    }
  });

  test('Interpreter: For loop', () => {
    Interpreter.interpret('(for [i 0 5] ((println i)))');
    const output = getCapturedOutput();
    // Should print 0, 1, 2, 3, 4
    const lines = output.split('\n').filter(l => l.trim());
    if (!lines.includes('0') || !lines.includes('4')) {
      throw new Error(`For loop output incorrect. Got: ${output}`);
    }
  });

  test('Interpreter: Binary literal', () => {
    const result = Interpreter.interpret('0b1010');
    if (result !== 10) {
      throw new Error(`Expected 10, got ${result}`);
    }
  });

  test('Interpreter: Hex literal', () => {
    const result = Interpreter.interpret('0x10');
    if (result !== 16) {
      throw new Error(`Expected 16, got ${result}`);
    }
  });
}

// Test all example files
function testExamples() {
  originalConsoleLog('\n=== EXAMPLE FILES TESTS ===\n');

  const examplesDir = path.join(rootDir, 'examples');
  const files = fs.readdirSync(examplesDir).filter(f => f.endsWith('.art'));

  files.forEach(file => {
    test(`Example: ${file}`, () => {
      const code = fs.readFileSync(path.join(examplesDir, file), 'utf8');
      try {
        Interpreter.interpret(code);
      } catch (error) {
        throw new Error(`Failed to run ${file}: ${error.message}`);
      }
    });
  });
}

// Edge cases
function testEdgeCases() {
  originalConsoleLog('\n=== EDGE CASES TESTS ===\n');

  test('Edge case: Empty program', () => {
    const result = Interpreter.interpret('');
    if (result !== null) {
      throw new Error('Expected null for empty program');
    }
  });

  test('Edge case: Multiple statements', () => {
    const result = Interpreter.interpret('1 2 3');
    if (result !== 3) {
      throw new Error('Expected last value (3)');
    }
  });

  test('Edge case: Nested expressions', () => {
    const result = Interpreter.interpret('(+ (* 2 3) (- 10 5))');
    if (result !== 11) {
      throw new Error(`Expected 11, got ${result}`);
    }
  });

  test('Edge case: Function with no arguments', () => {
    const result = Interpreter.interpret('(fn greet [] ((+ 1 1))) (greet)');
    if (result !== 2) {
      throw new Error(`Expected 2, got ${result}`);
    }
  });

  test('Edge case: Function with return', () => {
    const result = Interpreter.interpret('(fn test [] ((return 42))) (test)');
    if (result !== 42) {
      throw new Error(`Expected 42, got ${result}`);
    }
  });

  test('Edge case: Nested functions', () => {
    const code = '(fn outer [] ((fn inner [] ((+ 1 1))) (inner))) (outer)';
    const result = Interpreter.interpret(code);
    if (result !== 2) {
      throw new Error(`Expected 2, got ${result}`);
    }
  });

  test('Edge case: Match with default', () => {
    const code = '(match 999 { 1 : "one", 2 : "two", _ : "other" })';
    const result = Interpreter.interpret(code);
    if (result !== 'other') {
      throw new Error(`Expected "other", got ${result}`);
    }
  });

  test('Edge case: For loop with step', () => {
    Interpreter.interpret('(for [i 0 10 2] ((println i)))');
    const output = getCapturedOutput();
    const lines = output.split('\n').filter(l => l.trim());
    if (!lines.includes('0') || !lines.includes('8')) {
      throw new Error(`For loop with step failed. Got: ${output}`);
    }
  });

  test('Edge case: Negative numbers', () => {
    const result = Interpreter.interpret('(- 0 5)');
    if (result !== -5) {
      throw new Error(`Expected -5, got ${result}`);
    }
  });

  test('Edge case: Division by zero', () => {
    const result = Interpreter.interpret('(/ 10 0)');
    if (isNaN(result) || !isFinite(result)) {
      // Correct - division by zero returns Infinity
    } else {
      throw new Error(`Division by zero should return Infinity or NaN, got ${result}`);
    }
  });
}

// Main test runner
async function runAllTests() {
  originalConsoleLog('╔════════════════════════════════════════════════════════════╗');
  originalConsoleLog('║        ARTEMIS LANGUAGE COMPREHENSIVE TEST SUITE          ║');
  originalConsoleLog('╚════════════════════════════════════════════════════════════╝');

  try {
    testLexer();
    testParser();
    testInterpreter();
    testExamples();
    testEdgeCases();
  } catch (error) {
    originalConsoleLog(`\n❌ CRITICAL ERROR: ${error.message}`);
    originalConsoleLog(error.stack);
    results.errors.push({ error: error.message, stack: error.stack });
  }

  // Print summary
  originalConsoleLog('\n╔════════════════════════════════════════════════════════════╗');
  originalConsoleLog('║                        TEST SUMMARY                        ║');
  originalConsoleLog('╚════════════════════════════════════════════════════════════╝');
  originalConsoleLog(`\n✅ Passed: ${results.passed.length}`);
  originalConsoleLog(`❌ Failed: ${results.failed.length}`);
  originalConsoleLog(`🔥 Errors: ${results.errors.length}`);

  if (results.failed.length > 0) {
    originalConsoleLog('\n--- FAILED TESTS ---\n');
    results.failed.forEach(({ name, error }) => {
      originalConsoleLog(`❌ ${name}`);
      originalConsoleLog(`   ${error}`);
    });
  }

  // Save results to file
  const reportPath = path.join(rootDir, 'docs', 'test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  originalConsoleLog(`\n📄 Detailed results saved to: ${reportPath}`);

  // Exit with appropriate code
  process.exit(results.failed.length > 0 || results.errors.length > 0 ? 1 : 0);
}

runAllTests();
