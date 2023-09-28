const NodeTypes = {
  Program: 'Program',
  Binary: 'Binary',
  Hex: 'Hex',
  Number: 'Number',
  String: 'String',
  Boolean: 'Boolean',
  List: 'List',
  Map: 'Map',
  Set: 'Set',
  BinaryLiteral: 'BinaryLiteral',
  HexLiteral: 'HexLiteral',
  NumberLiteral: 'NumberLiteral',
  StringLiteral: 'StringLiteral',
  BooleanLiteral: 'BooleanLiteral',
  ListLiteral: 'ListLiteral',
  MapLiteral: 'MapLiteral',
  SetLiteral: 'SetLiteral',
  Fn: 'Fn',
  FnCall: 'FnCall',
  NativeFnCall: 'NativeFnCall',
  Result: 'Result',
  NativeFnResult: 'NativeFnResult',
  Reference: 'Reference',
  If: 'If',
  While: 'While',
  For: 'For',
  Match: 'Match',
  BinaryExpression: 'BinaryExpression',
  UnaryExpression: 'UnaryExpression',
  BinaryExpressionLiteral: 'BinaryExpressionLiteral',
  UnaryExpressionLiteral: 'UnaryExpressionLiteral',
  JsCode: 'JsCode',
  Return: 'Return'
} as const;

export default NodeTypes;
