import {
  concatAll,
  constant,
  first,
  intercalate,
  last,
  max,
  min,
  reverse,
  semigroupVoid,
  struct,
  tuple,
} from "fp-ts/Semigroup";
import * as S from "fp-ts/string";
import * as N from "fp-ts/number";

console.log(S.Semigroup.concat("a", "b"));
console.log(N.SemigroupSum.concat(2, 3));
console.log(N.SemigroupProduct.concat(2, 3));

console.log(S.Semigroup.concat("a", S.Semigroup.concat("b", "c")));
console.log(S.Semigroup.concat(S.Semigroup.concat("a", "b"), "c"));

console.log(intercalate(" + ")(S.Semigroup).concat("a", "b"));

console.log(reverse(S.Semigroup).concat("a", "b"));

type Person = {
  name: string;
  age: number;
};

const personSemigroup = struct<Person>({
  name: S.Semigroup,
  age: N.SemigroupSum,
});

console.log(
  personSemigroup.concat({ name: "taro", age: 20 }, { name: "tanaka", age: 30 })
);

console.log(tuple(S.Semigroup, S.Semigroup).concat(["a", "b"], ["c", "d"]));
// console.log(tuple(S.Semigroup, S.Semigroup).concat(["a", "b"], ["c"]));

console.log(constant("a").concat("b", "c"));

console.log(max(N.Ord).concat(1, 2));
console.log(min(N.Ord).concat(1, 2));

console.log(first<number>().concat(1, 2));
console.log(last<number>().concat(1, 2));

console.log(semigroupVoid.concat(undefined, undefined));

console.log(concatAll(S.Semigroup)("")(["a", "b", "c"]));
