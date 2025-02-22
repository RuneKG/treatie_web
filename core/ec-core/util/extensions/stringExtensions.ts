export const HasValue = (value?: string | null): boolean => {
  return typeof value === 'string' && value.length > 0;
};
