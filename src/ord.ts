import * as Ord from "fp-ts/Ord";
import * as S from "fp-ts/string";
import * as N from "fp-ts/number";

console.log(N.Ord.compare(1, 2)); // => -1
console.log(N.Ord.compare(1, 1)); // => 0
console.log(S.Ord.compare("a", "b")); // => -1

console.log(Ord.contramap((s: string) => s.length)(N.Ord).compare("a", "b")); // => 0

console.log(Ord.reverse(N.Ord).compare(1, 2)); // => 1

const tuple3Ord = Ord.tuple(S.Ord, N.Ord);

console.log(tuple3Ord.compare(["a", 2], ["b", 1])); // => -1
console.log(tuple3Ord.compare(["a", 2], ["a", 1])); // => 1

const lenStrOrd = Ord.fromCompare<string>((a, b) => {
  if (a.length === b.length) {
    return 0;
  } else if (a.length < b.length) {
    return -1;
  } else {
    return 1;
  }
});

console.log(lenStrOrd.compare("a", "b")); // => 0
console.log(lenStrOrd.compare("ab", "b")); // => 1

console.log(Ord.equalsDefault(lenStrOrd.compare)("a", "b")); // => true
console.log(Ord.equalsDefault(lenStrOrd.compare)("a", "a")); // => true

console.log(
  Ord.Contravariant.contramap(N.Ord, (s: string) => s.length).compare("a", "b")
); // => 0

const numOrdMon = Ord.getMonoid<number>();

console.log(numOrdMon.empty.compare(1, 2)); // => 0
console.log(
  numOrdMon
    .concat(
      N.Ord,
      Ord.fromCompare<number>(() => 1)
    )
    .compare(0, 0)
); // => 0

console.log(Ord.between(N.Ord)(0, 10)(3)); // => true
console.log(Ord.between(N.Ord)(0, 10)(0)); // => true

console.log(Ord.clamp(N.Ord)(0, 10)(3)); // => 3
console.log(Ord.clamp(N.Ord)(0, 10)(11)); // => 10
console.log(Ord.clamp(N.Ord)(0, 10)(-1)); // => 0

console.log(Ord.geq(N.Ord)(2, 1)); // => true
console.log(Ord.geq(N.Ord)(1, 1)); // => true

console.log(Ord.gt(N.Ord)(2, 1)); // => true
console.log(Ord.gt(N.Ord)(1, 1)); // => false

console.log(Ord.leq(N.Ord)(1, 1)); // => true
console.log(Ord.leq(N.Ord)(1, 2)); // => true

console.log(Ord.lt(N.Ord)(1, 1)); // => false
console.log(Ord.lt(N.Ord)(1, 2)); // => true

console.log(Ord.max(N.Ord)(1, 2)); // => 2
console.log(Ord.min(N.Ord)(1, 2)); // => 1

type Person = {
  name: string;
  age: number;
};

const byNameOrd = Ord.contramap((p: Person) => p.name)(S.Ord);
const byAgeOrd = Ord.contramap((p: Person) => p.age)(N.Ord);
const personOrd = Ord.getMonoid<Person>().concat(byNameOrd, byAgeOrd);

console.log(
  personOrd.compare({ name: "taro", age: 20 }, { name: "taro", age: 20 })
); // => 0
console.log(
  personOrd.compare({ name: "taro", age: 10 }, { name: "taro", age: 20 })
); // => -1
console.log(
  personOrd.compare({ name: "jon", age: 20 }, { name: "taro", age: 20 })
); // => -1
