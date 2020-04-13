export interface Store<T> {
  index: Set<number>;
  archive: Map<number, T>;

  has(key: number): boolean;

  put(key: number, val: T): Store<T>;

  get(key: number): T;

  pop(key: number): T;

  delete(key: number): boolean;

  getIndex(): Set<number>;
}


