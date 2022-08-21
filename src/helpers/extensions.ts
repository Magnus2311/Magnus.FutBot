export {};

declare global {
  interface Array<T> {
    groupBy(o: string): Array<T>;
  }
}

// eslint-disable-next-line no-extend-native
Array.prototype.groupBy = function (key: string) {
  return this.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
