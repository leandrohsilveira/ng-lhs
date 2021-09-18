import { mapTo, Observable, timer } from "rxjs";

export interface IPageable {
  page: number;
  size: number;
  begin: number;
  end: number;
}

export type ListPage<T> = {
  items: T[];
  count: number;
}

export type SimulateAsyncInput = { min?: number; variance?: number };

export function simulateAsync({
  min,
  variance,
}: SimulateAsyncInput = {}): Observable<void> {
  return timer((min ?? 1000) + Math.random() * (variance ?? 1000)).pipe(
    mapTo(undefined)
  );
}

export class Pageable implements IPageable {
  private constructor(
    public page: number,
    public size: number,
    public begin: number,
    public end: number
  ) {}

  static ofPage(page: number, size: number) {
    return new Pageable(page, size, (page - 1) * size, page * size);
  }

  slice<T>(array: T[]) {
    const end = this.end > array.length ? array.length : this.end;
    return [...array].slice(this.begin, end)
  }
}
