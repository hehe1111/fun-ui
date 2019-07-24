export function getTypeOf(target) {
  const regex = /\[object (.*)\]/;
  const typeString = Object.prototype.toString.call(target);
  return typeString.match(regex)[1].toLowerCase();
}
