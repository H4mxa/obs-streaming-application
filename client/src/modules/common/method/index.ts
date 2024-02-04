type TypesBase =
  | "bigint"
  | "boolean"
  | "function"
  | "number"
  | "object"
  | "string"
  | "symbol"
  | "undefined";

export const onCheckType = (
  source: any,
  type: TypesBase
): source is TypesBase => {
  return typeof source === type;
};

export const execFunc = <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
) => {
  if (onCheckType(func, "function")) {
    func(...args);
  }
};

export const checkKeyInObject = (T: Record<string, unknown>, key: string) => {
  return Object.keys(T).includes(key);
};

export const omit = <T extends Record<string, any>, k extends keyof T>(
  obj: T,
  ...props: k[]
) => {
  const result = { ...obj };
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
};

export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
