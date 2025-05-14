export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
): Partial<T> {
  const entries = Object.entries(obj).filter(
    ([_, value]) => value !== undefined && value !== null,
  ) as [keyof T, T[keyof T]][];
  return Object.fromEntries(entries) as Partial<T>;
}
