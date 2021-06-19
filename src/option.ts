import * as E from "fp-ts/Either";
import * as N from "fp-ts/number";
import * as O from "fp-ts/Option";

// constructors
O.fromEither(E.right("a")); // => { _tag: 'Some', value: 'a' }
O.fromEither(E.left("a")); // => { _tag: 'None' }

const even = (n: number) => n % 2 === 0;
O.fromPredicate(even)(2); // => { _tag: 'Some', value: 2 }
O.fromPredicate(even)(1); // => { _tag: 'None' }

O.getLeft(E.right("a")); // => { _tag: 'None' }
O.getLeft(E.left("a")); // => { _tag: 'Some', value: 'a' }

O.getRight(E.right("a")); // => { _tag: 'Some', value: 'a' }
O.getRight(E.left("a")); // => { _tag: 'None' }

O.none; // => { _tag: 'None' }

O.some(1); // => { _tag: 'Some', value: 'a' }

[O.none, O.some(1)].reduce((acc, ele) => (O.isSome(acc) ? acc : ele), {
  _tag: "None",
});

// destructors
const toStr = O.fold(
  () => "none",
  (a: string) => "some: " + a
);
toStr(O.none); // => none
toStr(O.some("a")); // => some: a

const toStrOrDouble = O.foldW(
  () => "none",
  (n: number) => n * 2
);
toStrOrDouble(O.none); // => none
toStrOrDouble(O.some(1)); // => 2

O.getOrElse(() => 0)(O.none); // => 0
O.getOrElse(() => 0)(O.some(1)); // => 1

O.getOrElseW(() => 1)(O.none); // => 1
O.getOrElseW(() => 1)(O.some("a")); // => a

O.match; // => alias of fold
O.matchW; // => alias of foldW

// guard
O.isNone(O.none); // => true

const s = O.some("a");
O.isSome(s) && s.value; // => a

// combinators
O.apFirst(O.some(1))(O.some("a")); // => { _tag: 'Some', value: 'a' }
O.apFirst(O.none)(O.some("a")); // => { _tag: 'None' }
O.apFirst(O.some(1))(O.none); // => { _tag: 'None' }

O.apSecond(O.some(1))(O.some("a")); // => { _tag: 'Some', value: 1 }
O.apSecond(O.none)(O.some("a")); // => { _tag: 'None' }
O.apSecond(O.some(1))(O.none); // => { _tag: 'None' }

O.chainFirst((a: number) => (a % 2 === 0 ? O.some(a) : O.none))(O.some(1)); // => { _tag: 'None' }
O.chainFirst((a: number) => (a % 2 === 0 ? O.some(a * 2) : O.none))(O.some(2)); // => { _tag: 'Some', value: 2 }
O.chainFirst((a: number) => (a % 2 === 0 ? O.some(a) : O.none))(O.none); // => { _tag: 'None' }

O.duplicate(O.none); // => { _tag: 'None' }
O.duplicate(O.some(1)); // => { _tag: 'Some', value: { _tag: 'Some', value: 1 } }

O.flap(1)(O.some((a) => a * 2)); // => { _tag: 'Some', value: 2 }
O.flap(1)(O.none); // => { _tag: 'None' }

O.flatten(O.none); // => { _tag: 'None' }
O.flatten(O.some(O.some(1))); // => { _tag: 'Some', value: 1 }

// utils
O.apS("b", O.some(1))(O.some({ a: 2 })); // => { _tag: 'Some', value: { a: 2, b: 1 } }
O.apS("b", O.none)(O.some({ a: 2 })); // => { _tag: 'None' }
O.apS("b", O.some(1))(O.none); // => { _tag: 'None' }
// O.apS<"a", { a: number }, number>("a", O.some(1))(O.some({ a: 2 }));
// error TS2345: Argument of type '"a"' is not assignable to parameter of type 'never'.
// O.apS<"a", { a: number }, number>("a", O.some(1))(O.some({ a: 2 })); // => { _tag: 'Some', value: { a: 2, b: 1 } }

O.bind("a", (a: number) => O.some(a.toString()))(O.some(1)); // => { _tag: 'Some', value: { a: '1' } }
O.bind("a", (a: number) => O.some(a.toString()))(O.none); // => { _tag: 'None' }
O.bind("a", (a: number) => O.none)(O.some(1)); // => { _tag: 'None' }

O.bindTo("a")(O.some(1)); // => { _tag: 'Some', value: { a: 1 } }
O.bindTo("a")(O.none); // => { _tag: 'None' }

O.elem(N.Eq)(1, O.some(1)); // => true
O.elem(N.Eq)(1, O.some(2)); // => false
O.elem(N.Eq)(1, O.none); // => false

O.exists((a: number) => a % 2 === 0)(O.some(0)); // true
O.exists((a: number) => a % 2 === 0)(O.some(1)); // false
O.exists((a: number) => a % 2 === 0)(O.none); // false

type A = { type: "A"; a: number };
type B = { type: "B"; b: number };
type C = A | B;

// const isA = (c: C): c is A => c.type === "B"; // 間違った判定だがコンパイルが通る
// const isA = O.getRefinement<C, A>((c) => (c.type === "B" ? O.some(c) : O.none));
// Type '"B"' is not assignable to type '"A"'.
const isA = O.getRefinement<C, A>((c) => (c.type === "B" ? O.none : O.some(c)));

const a = { type: "A", a: 1 } as C;
isA(a) && a.a; // => 1

O.sequenceArray([O.some(1), O.some(2)]); // => { _tag: 'Some', value: [ 1, 2 ] }
O.sequenceArray([O.some(1), O.none]); // => { _tag: 'None' }

O.traverseArray((a: number) => (a % 2 === 0 ? O.some(a) : O.none))([2, 4, 6]); // => { _tag: 'Some', value: [ 2, 4, 6 ] }
O.traverseArray((a: number) => (a % 2 === 0 ? O.some(a) : O.none))([1, 2, 3]); // => { _tag: 'None' }

O.traverseArrayWithIndex((i, a: number) => (i < 3 ? O.some(a) : O.none))([
  1, 2, 3,
]); // => { _tag: 'Some', value: [ 1, 2, 3 ] }
O.traverseArrayWithIndex((i, a: number) => (i < 3 ? O.some(a) : O.none))([
  1, 2, 3, 4,
]); // => { _tag: 'None' }

type Person = {
  name?: string;
};
O.chainNullableK((p: Person) => p.name)(O.some({ name: "john" })); // => { _tag: 'Some', value: 'john' }

O.fromNullable(undefined); // => { _tag: 'None' }
O.fromNullable(1); // => { _tag: 'Some', value: 1 }

O.fromNullableK((a: number) => (a % 2 === 0 ? a : undefined))(0); // => { _tag: 'Some', value: 0 }
O.fromNullableK((a: number) => (a % 2 === 0 ? a : undefined))(1); // => { _tag: 'None' }

O.toNullable(O.some(1)); // => 1
O.toNullable(O.none); // => null

O.toUndefined(O.some(1)); // => 1
O.toUndefined(O.none); // => undefined

O.tryCatch(() => 1); // => { _tag: 'Some', value: 1 }
O.tryCatch(() => {
  throw new Error();
}); // => { _tag: 'None' }

const mayThrow = (a: number) => {
  if (a % 2 === 0) {
    return a;
  } else {
    throw new Error();
  }
};
O.tryCatchK(mayThrow)(0); // => { _tag: 'Some', value: 0 }
O.tryCatchK(mayThrow)(1); // => { _tag: 'None' }
