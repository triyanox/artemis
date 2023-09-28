import binaryExpressionPlugin from './binary-operations/bin-op-plugin';
import binaryPlugin from './binary/binary-plugin';
import booleanPlugin from './booleans/boolean-plugin';
import binaryDefPlugin from './definitions/binary-def-plugin';
import binaryExpressionDefPlugin from './definitions/binop-def-plugin';
import booleanDefPlugin from './definitions/boolean-def-plugin';
import floatDefPlugin from './definitions/float-def-plugin';
import functionDefPlugin from './definitions/function-def-plugin';
import hexDefPlugin from './definitions/hex-def-plugin';
import listDefPlugin from './definitions/list-def-plugin';
import mapDefPlugin from './definitions/map-def-plugin';
import numberDefPlugin from './definitions/number-def-plugin';
import setDefPlugin from './definitions/set-def-plugin';
import signedFloatDefPlugin from './definitions/signed-float-plugin';
import signedNumberDefPlugin from './definitions/signed-number-def-plugin';
import stringDefPlugin from './definitions/string-def-plugin';
import unaryExpressionDefPlugin from './definitions/uniop-def-plugin';
import forPlugin from './for-statement/for-plugin';
import functionCallPlugin from './functions/function-call-plugin';
import functionPlugin from './functions/function-plugin';
import nativeFunctionCallPlugin from './functions/native-function-plugin';
import hexPlugin from './hex/hex-plugin';
import ifPlugin from './if-statement/if-plugin';
import listPlugin from './lists/list-plugin';
import mapPlugin from './maps/map-plugin';
import matchPlugin from './match/match-plugin';
import floatPlugin from './numbers/float-plugin';
import numberPlugin from './numbers/number-plugin';
import signedFloatPlugin from './numbers/signed-float-plugin';
import signedNumberPlugin from './numbers/signed-number-plugin';
import referencePlugin from './reference/ref-plugin';
import functionResultPlugin from './result/function-result-plugin';
import nativeFnRsultPlugin from './result/native-function-result-plugin';
import setPlugin from './sets/set-plugin';
import stringPlugin from './strings/string-plugin';
import unaryExpressionPlugin from './unary-operations/unary-expression-plugin';
import whilePlugin from './while-statement/while-plugin';
import jsCodePlugin from './js/js-code';
import functionReturnPlugin from './functions/function-return-plugin';

const plugins = [
  jsCodePlugin,
  functionDefPlugin,
  functionPlugin,
  functionReturnPlugin,
  nativeFunctionCallPlugin,
  functionCallPlugin,
  matchPlugin,
  ifPlugin,
  whilePlugin,
  forPlugin,
  nativeFnRsultPlugin,
  functionResultPlugin,
  signedFloatDefPlugin,
  signedFloatPlugin,
  floatDefPlugin,
  floatPlugin,
  signedNumberDefPlugin,
  signedNumberPlugin,
  numberDefPlugin,
  numberPlugin,
  stringDefPlugin,
  stringPlugin,
  booleanDefPlugin,
  booleanPlugin,
  hexPlugin,
  hexDefPlugin,
  binaryPlugin,
  binaryDefPlugin,
  listDefPlugin,
  listPlugin,
  setDefPlugin,
  setPlugin,
  mapDefPlugin,
  mapPlugin,
  unaryExpressionDefPlugin,
  binaryExpressionDefPlugin,
  unaryExpressionPlugin,
  binaryExpressionPlugin,
  referencePlugin
];

export default plugins;
