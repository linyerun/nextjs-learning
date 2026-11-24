/** 接口出参统一转换：时间字段转为 Unix 毫秒时间戳，其余字段原样保留 */
export function withTimestamp<T extends { createdAt: Date; updatedAt: Date }>(
  data: T,
): Omit<T, "createdAt" | "updatedAt"> & { createdAt: number; updatedAt: number } {
  return {
    ...data,
    createdAt: data.createdAt.getTime(),
    updatedAt: data.updatedAt.getTime(),
  };
}
