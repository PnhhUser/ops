export interface IBaseRepository<T> {
  getById(id: number): Promise<T | null>;

  getAll(): Promise<T[] | null>;

  add(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(id: number): Promise<boolean>;
}
