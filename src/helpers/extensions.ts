export {};

declare global {
  interface Array<T> {
    groupBy(o: T): Array<T>;
  }
}

// eslint-disable-next-line no-extend-native
Array.prototype.groupBy = function (key) {
  return this.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
