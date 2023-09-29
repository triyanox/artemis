import assert from './assert';
import assertEq from './assertEq';
import assertFalsy from './assertFalsy';
import assertGt from './assertGt';
import assertGte from './assertGte';
import assertLt from './assertLt';
import assertLte from './assertLte';
import assertNotThrows from './assertNotThrows';
import assertThrows from './assertThrows';
import assertTruthy from './assertTruthy';
import at from './at';
import concat from './concat';
import exit from './exit';
import includes from './includes';
import keys from './keys';
import length from './length';
import log from './log';
import pop from './pop';
import print from './print';
import println from './println';
import push from './push';
import remove from './remove';
import reverse from './reverse';
import shift from './shift';
import slice from './slice';
import sort from './sort';
import splice from './splice';
import unshift from './unshift';
import values from './values';
import split from './split';
import trim from './trim';
import trimStart from './trimStart';
import trimEnd from './trimEnd';
import replace from './replace';
import replaceAll from './replaceAll';
import toLowerCase from './toLowerCase';
import toUpperCase from './toUpperCase';
import charAt from './charAt';
import charCodeAt from './charCodeAt';
import codePointAt from './codePointAt';
import padEnd from './padEnd';
import padStart from './padStart';
import repeat from './repeat';
import startsWith from './startsWith';
import endsWith from './endsWith';
import find from './find';
import findIndex from './findIndex';
import indexOf from './indexOf';
import lastIndexOf from './lastIndexOf';
import map from './map';
import filter from './filter';
import reduce from './reduce';
import reduceRight from './reduceRight';
import some from './some';
import every from './every';
import fill from './fill';
import copyWithin from './copyWithin';
import join from './join';
import Interpreter from '..';
import js from './js';
import int from './int';
import sqrt from './sqrt';
import set from './set';
import has from './has';
import get from './get';
import del from './del';
import readFile from './readFile';
import writeFile from './writeFile';

const nativeFns = [
  print,
  println,
  exit,
  log,
  assert,
  assertEq,
  assertGt,
  assertLt,
  assertGte,
  assertLte,
  assertTruthy,
  assertFalsy,
  assertThrows,
  assertNotThrows,
  length,
  at,
  push,
  pop,
  remove,
  keys,
  values,
  shift,
  unshift,
  includes,
  slice,
  splice,
  concat,
  reverse,
  sort,
  join,
  split,
  trim,
  trimStart,
  trimEnd,
  replace,
  replaceAll,
  toLowerCase,
  toUpperCase,
  charAt,
  charCodeAt,
  codePointAt,
  padEnd,
  padStart,
  repeat,
  startsWith,
  endsWith,
  find,
  findIndex,
  indexOf,
  lastIndexOf,
  map,
  filter,
  reduce,
  reduceRight,
  some,
  every,
  fill,
  copyWithin,
  js,
  int,
  sqrt,
  set,
  has,
  get,
  del,
  readFile,
  writeFile
];

/**
 * Load native functions into the interpreter.
 */
function loadNative(interpreter: Interpreter) {
  for (const nativeFn of nativeFns) {
    interpreter.native(nativeFn.name, nativeFn.fn.bind(null, interpreter));
  }
}

export default nativeFns;
export { loadNative };
export { default as NativeFn } from './native-fn';
