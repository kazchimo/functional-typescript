import * as Monoid from "fp-ts/Monoid";
import * as S from "fp-ts/string";
import * as N from "fp-ts/number";

console.log(S.Monoid.concat("a", "b")); // => ab
console.log(N.MonoidSum.concat(2, 3)); // => 5
console.log(N.MonoidProduct.concat(2, 3)); // => 6
console.log(N.MonoidProduct.empty); // => 1
console.log(N.MonoidSum.empty); // => 0

console.log(Monoid.reverse(S.Monoid).concat("a", "b")); // => ba

type Person = {
  name: string;
  age: number;
};

const personMonoid = Monoid.struct<Person>({
  name: S.Monoid,
  age: N.MonoidSum,
});

console.log(
  personMonoid.concat({ name: "tanaka", age: 20 }, { name: "taro", age: 10 })
); // => { name: 'tanakataro', age: 30 }

const tuple3Monoid = Monoid.tuple(S.Monoid, N.MonoidSum, N.MonoidProduct);

console.log(tuple3Monoid.concat(["a", 2, 3], ["b", 4, 5])); // => [ 'ab', 6, 15 ]

console.log(Monoid.max(N.Bounded).concat(1, 2)); // => 2
console.log(Monoid.min(N.Bounded).concat(1, 2)); // => 1
console.log(Monoid.max(N.Bounded).empty); // => -Infinity
console.log(Monoid.min(N.Bounded).empty); // => Infinity

console.log(Monoid.concatAll(N.MonoidSum)([1, 2, 3])); // => 6
