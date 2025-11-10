type AnyFunction = (...args: never[]) => unknown;

export type DebouncedFunction<T extends AnyFunction> = (...args: Parameters<T>) => void;

export function debounce<T extends AnyFunction>(func: T, ms: number): DebouncedFunction<T> {
  let timerId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), ms);
  };
}
