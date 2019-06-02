export function accessNested (obj, key) {
  return key.split('.').reduce((o, c) => (typeof o === 'undefined' || o === null) ? o : o[c], obj)
}
