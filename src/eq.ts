import * as S from "fp-ts/string";
import * as N from "fp-ts/number";
import * as Eq from "fp-ts/Eq";

console.log(S.Eq.equals("a", "a"));
console.log(S.Eq.equals("a", "b"));

const numEq = Eq.contramap((n: number) => n.toString())(S.Eq);
console.log(numEq.equals(1, 1));
console.log(numEq.equals(1, 2));

type Person = {
  name: string;
  age: number;
};

const personEq = Eq.struct<Person>({
  name: S.Eq,
  age: N.Eq,
});

console.log(
  personEq.equals({ name: "taro", age: 20 }, { name: "taro", age: 20 })
);
console.log(
  personEq.equals({ name: "taro", age: 20 }, { name: "taro", age: 10 })
);

const tuple3Eq = Eq.tuple(S.Eq, N.Eq, personEq);
console.log(
  tuple3Eq.equals(
    ["a", 1, { name: "taro", age: 20 }],
    ["a", 1, { name: "taro", age: 20 }]
  )
);
console.log(
  tuple3Eq.equals(
    ["a", 1, { name: "taro", age: 20 }],
    ["a", 1, { name: "taro", age: 10 }]
  )
);

const personAgeEq = Eq.fromEquals<Person>((a, b) => a.age === b.age);
console.log(
  personAgeEq.equals({ name: "taro", age: 20 }, { name: "taro", age: 20 })
);
console.log(
  personAgeEq.equals({ name: "john", age: 20 }, { name: "taro", age: 20 })
);

console.log(
  Eq.Contravariant.contramap(S.Eq, (a: number) => a.toString()).equals(1, 1)
);

console.log(Eq.eqStrict.equals("1", 1));

console.log(
  Eq.getMonoid<string>()
    .concat(
      Eq.fromEquals<string>((a, b) => a[0] === b[0]),
      Eq.fromEquals<string>((a, b) => a.length === b.length)
    )
    .equals("ac", "ab")
);
console.log(Eq.getMonoid<string>().empty.equals("a", "b"));
