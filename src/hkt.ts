1;
("a");

const a: [number, number] = [1, 2];

// const arr: Array<number> = [1, 2, 3];
// const arr: Array = [1, 2, 3];

const m: Map<string, string> = new Map();

m.set("a", "b");
console.log(m.get("a"));

type A = {
  a: <A, B>(a: A) => (b: B) => A | B;
};

export class None {
  readonly tag: "None" = "None";
}

export class Some<A> {
  readonly tag: "Some" = "Some";
  constructor(readonly value: A) {}
}

export type Option<A> = None | Some<A>;

// helpers
export const none: Option<never> = new None();

export const some = <A>(a: A): Option<A> => {
  return new Some(a);
};

// a specialised map for Option
const map = <A, B>(f: (a: A) => B, fa: Option<A>): Option<B> => {
  switch (fa.tag) {
    case "None":
      return fa;
    case "Some":
      return some(f(fa.value));
  }
};

const double = (n: number): number => n * 2;
const len = (s: string): number => s.length;

console.log(map(double, some(1))); // { tag: 'Some', value: 2 }
console.log(map(double, none)); // { tag: 'None' }
// console.log(map(len, some(2))); // <= static error: Type 'number' is not assignable to type 'string'

export interface HKT<F, A> {
  _URI: F;
  _A: A;
}

export interface Functor<F> {
  map: <A, B>(f: (a: A) => B, fa: HKT<F, A>) => HKT<F, B>;
}
