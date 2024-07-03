export const snakeToCamel = (item: any): any => {
  if (Array.isArray(item)) {
    return item.map((el: any) => snakeToCamel(el))
  } else if (typeof item === 'function' || item !== Object(item)) {
    return item
  }
  return Object.fromEntries(Object.entries(item as Record<string, any>).map(([key, value]: [string, any]) => [key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, '')), snakeToCamel(value)]))
}

export const camelToSnake = (item: any): any => {
  if (Array.isArray(item)) {
    return item.map((el: any) => camelToSnake(el))
  } else if (typeof item === 'function' || item !== Object(item)) {
    return item
  }
  return Object.fromEntries(Object.entries(item as Record<string, any>).map(([key, value]: [string, any]) => [key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`), camelToSnake(value)]))
}
