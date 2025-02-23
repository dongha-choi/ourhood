export const kebabToCamel = (str: string): string =>
  str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

export const camelToKebab = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
