class Environment {
  private values: { [key: string]: any } = {};
  private returnValue: any = undefined;

  constructor(private parent?: Environment) {}

  getParent(): Environment | undefined {
    return this.parent;
  }

  set(name: string, value: any): void {
    this.values[name] = value;
  }

  setToParent(name: string, value: any): void {
    if (this.parent) {
      this.parent.set(name, value);
    }
  }

  getFromParent(name: string): any {
    if (this.parent) {
      return this.parent.get(name);
    }
    throw new Error(`Variable '${name}' not found.`);
  }

  setReturn(value: any): void {
    this.returnValue = value;
  }

  getReturn(): any {
    return this.returnValue;
  }

  get(name: string): any {
    if (name in this.values) {
      return this.values[name];
    }
    if (this.parent) {
      return this.parent.get(name);
    }
    throw new Error(`Variable '${name}' not found.`);
  }

  getNested(root: string, keys: string[]) {
    let value = this.get(root) as Record<string, any>;
    for (let key of keys) {
      value = value[key];
    }
    return value;
  }
}

export default Environment;
