import NodeType from '../node/node-types';
import Node from './node';

interface Program extends Node {
  type: typeof NodeType.Program;
  body: Node[];
}

export default Program;
